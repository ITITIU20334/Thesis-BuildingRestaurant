package nha_hang.demo.Service.Payment;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nha_hang.demo.DTO.PaymentDTO;
import nha_hang.demo.Enum.PaymentStatus;
import nha_hang.demo.Model.DonDatBan;
import nha_hang.demo.Repository.DonDatBanRepository;
import nha_hang.demo.Service.DonDatBan.DonDatBanService;
import nha_hang.demo.Service.Ultis.VnpayUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.Duration;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor

public class PaymentServiceImpl implements PaymentService {
    private final VnpayUtil vnpayUtil;

    @Autowired
    private  DonDatBanRepository donDatBanRepository;

    @Override
    public String createPaymentUrl(BigDecimal totalAmount, String username, UUID orderKey, HttpServletRequest request) {
        if (username == null || username.isEmpty()) {
            username = "Guest";
        }

        BigDecimal amount = totalAmount.multiply(BigDecimal.valueOf(100));
        //String reference = "ORDER_" + orderKey + "_" + VnpayUtil.getRandomNumber(6);
        String reference =  orderKey.toString();
        System.out.println("reference code :" +reference);
        PaymentDTO dto = new PaymentDTO()
                .setReference(reference)
                .setPrice(amount)
                .setDescription(username + " paid by VNPay")
                .setExpiresIn(Duration.ofMinutes(15))
                .setIpAddress(VnpayUtil.getIpAddress(request));

        return vnpayUtil.getPaymentURL(dto);
    }

    public void handleVnPayCallback(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String transactionStatus = request.getParameter("vnp_ResponseCode");
        String txnRef = request.getParameter("vnp_TxnRef");

        // Tùy ý thêm xử lý business logic ở đây (cập nhật đơn hàng, log, gửi email...)
        System.out.println("Transaction Status: " + transactionStatus);
        System.out.println("Transaction Ref: " + txnRef);

        String redirectUrl;
        if ("00".equals(transactionStatus)) {
            Optional<DonDatBan> dons = donDatBanRepository.getDonDatBanByTnfRef(txnRef);
            if (dons.isPresent()) {
                DonDatBan don = dons.get();
                don.setPaidStatus(PaymentStatus.PAID.toString());
                donDatBanRepository.save(don);
            }
            redirectUrl = "http://localhost:3000/payment/success";
        } else if ("24".equals(transactionStatus)) {
            redirectUrl = "http://localhost:3000/payment/cancel";
        } else {
            redirectUrl = "http://localhost:3000/payment/failure";
        }

        response.sendRedirect(redirectUrl);
    }
}

