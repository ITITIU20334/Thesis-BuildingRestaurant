package nha_hang.demo.DTO;

import jakarta.persistence.Column;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class OrderDTO {
    private String txnRef;
    private String PaymentMethod;
    private BigDecimal PaymentAmount;
}
