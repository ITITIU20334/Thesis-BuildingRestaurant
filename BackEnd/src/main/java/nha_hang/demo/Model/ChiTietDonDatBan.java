package nha_hang.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "reservationdetail")
public class ChiTietDonDatBan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "so_luong")
    private Integer soLuong;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_dondatban")
    private DonDatBan  donDatBanId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_mon")
    private MonAn monAnId;

    @Column(name = "tong_Tien")
    private Integer tongTien;
}

