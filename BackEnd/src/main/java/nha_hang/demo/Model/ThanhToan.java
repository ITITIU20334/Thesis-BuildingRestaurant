package nha_hang.demo.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "payment")
public class ThanhToan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "ngay_thanh_toan")
    private Date ngayThanhToan = Date.from(Instant.now());

    @Column(name = "so_tien")
    private  int soTien;

    @Column(name = "phuong_thuc_TT")
    private String phuongThucTT;

    @ManyToOne
    @JoinColumn(name = "id_hd")
    private HoaDon hoaDon;
}


