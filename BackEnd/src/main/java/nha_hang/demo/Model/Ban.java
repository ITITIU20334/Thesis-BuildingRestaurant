package nha_hang.demo.Model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "table")
public class Ban {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ban", nullable = false)
    private Integer idBan;

    @Column(name = "ten_ban")
    private String tenBan;

    @Column(name = "vi_tri")
    private String viTri;

    @Column(name = "so_nguoi")
    private Integer soNguoi;

    @Column(name = "trang_thai")
    private  String trangThai;
}
