package nha_hang.demo.Repository;

import nha_hang.demo.Model.ChiTietHoaDon;
import nha_hang.demo.Model.MonAn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChiTietHoaDonRepository extends JpaRepository<ChiTietHoaDon,Integer> {


    @Query("SELECT m FROM ChiTietHoaDon m WHERE m.idHD.idHD = :idHoaDon and m.idMonAn.id_mon= :idMonAn ")
    Optional<ChiTietHoaDon> findMonAnDaCo(@Param("idHoaDon") Integer idHoaDon, @Param("idMonAn") Integer idMonAn);
}
