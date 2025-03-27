package nha_hang.demo.Model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "voucher")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer idVoucher;

    @Column(name = "ten_ma")
    private String tenVoucher;

    @Column(name = "so_tien")
    private int soTien;

    @Column(name = "trang_thai")
    private String trangThai;
}

