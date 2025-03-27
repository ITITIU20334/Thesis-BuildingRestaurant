package nha_hang.demo.Repository;

import nha_hang.demo.Model.ThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThanhToanRepository extends JpaRepository<ThanhToan, Integer> {
}
