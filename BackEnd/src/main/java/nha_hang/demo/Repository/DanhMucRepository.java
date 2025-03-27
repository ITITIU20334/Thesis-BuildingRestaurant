package nha_hang.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import nha_hang.demo.Model.DanhMuc;
public interface DanhMucRepository extends JpaRepository<DanhMuc, Integer> {

}
