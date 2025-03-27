package nha_hang.demo.Model;


import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "food")
public class MonAn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mon", nullable = false)
    private Integer id_mon;

    @Column(name = "tenMon")
    private String tenMon;

    @Column(name = "giaTien")
    private Integer giaTien;

    @ManyToOne
    @JoinColumn(name = "loai_mon_an")
    private DanhMuc loaiMonAn;

    @Column(name = "hinhAnh")
    private String hinhAnh;
    @Column(name = "mo_ta")
    private String moTa;
    @Column(name ="deleted" )
    private Boolean daXoa = false;
    public MonAn(Integer id) { this.id_mon = id; }
}
