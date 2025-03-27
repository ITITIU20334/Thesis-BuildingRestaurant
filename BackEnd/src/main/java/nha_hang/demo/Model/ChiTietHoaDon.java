package nha_hang.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "billdetail")
public class ChiTietHoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "thanh_tien")
    private Integer thanhTien;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_mon")
    private MonAn idMonAn;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_hd")
    private HoaDon idHD;


}

