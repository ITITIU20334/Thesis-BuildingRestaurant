package nha_hang.demo.Model;


import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "category")
public class DanhMuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_loai", nullable = false)
    private Integer id_Loai;

    @Column(name = "tenLoai")
    private String tenLoai;
}

