package nha_hang.demo.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @Column(name = "txn_ref")
    private String txnRef;

    @Column(name = "ngay_thanh_toan")
    private LocalDateTime PaymentDate = LocalDateTime.now();

    @Column(name = "phuong_thuc_tt")
    private String PaymentMethod;

    @Column(name = "so_tien")
    private BigDecimal PaymentAmount;

    @Column(name = "trang_thai")
    private String PaymentStatus;
}
