package nha_hang.demo.Model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.datetime.DateTimeFormatAnnotationFormatterFactory;


import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "bill")
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_hd", nullable = false)
    private Integer idHD;

    @ManyToOne
    @JoinColumn(name ="id_kh")
    private KhachHang idKH;

    @ManyToOne
    @JoinColumn(name = "id_ban")
    private Ban idBan;

    @Column(name = "ngay_tao")
    private Date ngayTao;

    @Column(name = "tong_tien")
    private Integer tongTien;

    @Column(name = "trang_thai")
    private String trangThai;


    @Column(name = "ten_NV")
    private String tenNhanVien;

    @ManyToOne
    @JoinColumn(name = "id_voucher")
    private  Voucher idVoucher;

    @Column(name = "ho_ten")
    private String hoTen;

    @OneToMany(mappedBy = "idHD", cascade = CascadeType.ALL)
    private List<ChiTietHoaDon> chiTietHoaDons;
}

