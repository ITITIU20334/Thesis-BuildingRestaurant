package nha_hang.demo.Repository;

import nha_hang.demo.Model.ChiTietDonDatBan;
import nha_hang.demo.Model.DonDatBan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChiTietDonDatBanRepository extends JpaRepository<ChiTietDonDatBan,Integer> {
    @Query("SELECT m FROM ChiTietDonDatBan m where m.donDatBanId = :id")
    List<ChiTietDonDatBan> findChiTietDon(Integer id);
}
