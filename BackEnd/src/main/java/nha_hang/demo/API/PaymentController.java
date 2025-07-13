package nha_hang.demo.API;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import nha_hang.demo.DTO.DatBanDTO;
import nha_hang.demo.Service.DonDatBan.DonDatBanService;
import nha_hang.demo.Service.Payment.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService vnPayService;
    private final DonDatBanService donDatBanService;
    @PostMapping("/create")
    public ResponseEntity<?> createVnPayPayment(@RequestBody DatBanDTO dto,
                                                HttpServletRequest request) {
        System.out.println("Dto of create payment" + dto);
        return donDatBanService.DatBan(dto, request);
    }


    @GetMapping("/vnpay-return")
    public void vnpayReturn(HttpServletRequest request, HttpServletResponse response) throws IOException {
        vnPayService.handleVnPayCallback(request, response);
    }
}
