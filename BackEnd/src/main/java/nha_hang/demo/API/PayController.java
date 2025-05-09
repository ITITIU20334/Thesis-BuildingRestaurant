package nha_hang.demo.API;

import jakarta.servlet.http.HttpServletRequest;
import nha_hang.demo.Model.VnPay;
import nha_hang.demo.Service.Vnpay.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.UnsupportedEncodingException;
import java.util.*;
@Controller
public class PayController {
    @Autowired
    private Payment payment;
    @Autowired
    private VnPay vnpayment;
    @GetMapping("/api/payment/vnpay-return")
    public ResponseEntity<?> handleVnPayReturn(HttpServletRequest request) {
        Map<String, String[]> params = request.getParameterMap();
        Map<String, String> fields = new HashMap<>();
        for (Map.Entry<String, String[]> entry : params.entrySet()) {
            if (!entry.getKey().equals("vnp_SecureHash")) {
                fields.put(entry.getKey(), entry.getValue()[0]);
            }
        }
        // Tạo chuỗi dữ liệu để xác minh lại chữ ký
        List<String> fieldNames = new ArrayList<>(fields.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        for (String field : fieldNames) {
            hashData.append(field).append('=').append(fields.get(field)).append('&');
        }
        hashData.setLength(hashData.length() - 1); // Xoá & cuối cùng

        String receivedHash = request.getParameter("vnp_SecureHash");
        String computedHash = payment.hmacSHA512(vnpayment.getVnpHashSecret(), hashData.toString());

        if (receivedHash.equals(computedHash)) {
            // Thanh toán thành công
            return ResponseEntity.ok("Thanh toán thành công!");
        } else {
            return ResponseEntity.badRequest().body("Sai chữ ký xác nhận!");
        }
    }
    @GetMapping("/api/payment/create")
    public ResponseEntity<String> createPayment(HttpServletRequest request) throws UnsupportedEncodingException {
        long amount = 10000000; // Số tiền thanh toán (VD: 10,000 VNĐ)
        String orderInfo = "Thanh toán đơn hàng DEMO";

        String ipAddr = request.getRemoteAddr();
        String paymentUrl = payment.createPaymentUrl(amount, orderInfo, ipAddr);

        return ResponseEntity.ok(paymentUrl);
    }
}
