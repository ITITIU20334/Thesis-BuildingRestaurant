package nha_hang.demo.Model;

import jakarta.persistence.*;
import lombok.*;
import nha_hang.demo.Enum.Role;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "customer")
public class KhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user", nullable = false)
    private Integer idKhach;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "ho_ten")
    private String hoTen;

    @Enumerated(EnumType.STRING)
    @Column(name ="role")
    private Role role;

    @Column(name = "sodt")
    private Integer soDT;


}

