package nha_hang.demo.Model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "staff")
public class NhanVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nv", nullable = false)
    private Integer id_nv;
    @Column(name = "username", nullable = false)
    private String username;
    @Column(name = "password",nullable = false)
    private String password;
    @Column(name = "chuc_vi")
    private String chucVi;
    @Column(name = "ho_ten")
    private String hoTen;
}

