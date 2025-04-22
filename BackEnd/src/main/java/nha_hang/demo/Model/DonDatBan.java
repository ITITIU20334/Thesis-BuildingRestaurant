package nha_hang.demo.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "table_reservation")
public class DonDatBan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "ngay_dat")
    private LocalDate ngayDat;
    @Column(name = "thoi_gian")
    private LocalTime thoiGian;
    @Column(name = "so_luong")
    private int soLuong;
    @ManyToOne
    @JoinColumn(name = "id_user")
    private KhachHang idKhach;
    @ManyToOne
    @JoinColumn(name = "id_ban")
    private Ban idBan;
    @Column(name = "trang_thai")
    private String trangThai;

    @Column(name = "ho_ten")
    private String hoTen;
    @Column(name = "so_dt")
    private String soDT;
    @Column(name = "ghi_chu")
    private String ghiChu;
    @OneToMany(mappedBy = "donDatBanId", cascade = CascadeType.ALL)
    private List<ChiTietDonDatBan> chiTietDonDatBans;

    @Column (name = "email")
    private String email;


}

