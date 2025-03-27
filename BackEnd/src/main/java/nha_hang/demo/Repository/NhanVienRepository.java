package nha_hang.demo.Repository;

import nha_hang.demo.Model.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {
    NhanVien findByUsername(String username);
}
