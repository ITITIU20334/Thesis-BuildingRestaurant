package nha_hang.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@Builder
public class PaymentDTO {
    private String reference;
    private BigDecimal price;
    private String description;
    private Instant createdAt = Instant.now();
    private Duration expiresIn;
    private String ipAddress;

    public Instant getExpiredAt() {
        return createdAt.plus(expiresIn);
    }
}