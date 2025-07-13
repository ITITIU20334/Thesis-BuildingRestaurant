package nha_hang.demo.Service.Payment;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.UUID;

public interface PaymentService {
    public String createPaymentUrl(BigDecimal totalAmount, String username, UUID orderKey, HttpServletRequest request);
    public void handleVnPayCallback(HttpServletRequest request, HttpServletResponse response) throws IOException;
}
