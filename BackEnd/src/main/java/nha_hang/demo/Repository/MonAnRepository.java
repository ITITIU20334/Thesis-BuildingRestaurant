package nha_hang.demo.Repository;

import nha_hang.demo.DTO.MonDaBanDTO;
import nha_hang.demo.Model.MonAn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MonAnRepository extends JpaRepository<MonAn, Integer> {
        @Query("SELECT m FROM MonAn m WHERE m.loaiMonAn.id_Loai = :loaiMonAnId and m.daXoa=false ")
        List<MonAn> findMonAnByLoai(@Param("loaiMonAnId") Integer loaiMonAnId);

        @Query("SELECT m FROM MonAn m WHERE  m.daXoa = false")
        List<MonAn> findAllActive();

        @Query("select  m from MonAn m where m.tenMon ilike :tim and  m.daXoa = false ")
        List<MonAn> timMonAn(@Param("tim") String tim);
        @Query("select m from MonAn m where  m.daXoa = false order by rand() limit 8")
        List<MonAn> getMonAnNgauNhien();
        @Transactional
        @Modifying
        @Query("UPDATE MonAn m SET m.daXoa = true WHERE m.id_mon = :id")
        void softDeleteById(@Param("id") Integer id);

        @Query("select count(*) from MonAn m where m.daXoa=false ")
        int countMonAn();
        @Query("SELECT new nha_hang.demo.DTO.MonDaBanDTO(m.tenMon, COUNT(n.idMonAn.id_mon)) " +
                "FROM MonAn m " +
                "JOIN ChiTietHoaDon n ON m.id_mon = n.idMonAn.id_mon " +
                "GROUP BY m.tenMon order by COUNT(n.idMonAn.id_mon) desc ")
        List<MonDaBanDTO> countMonAnDaBan();

}
