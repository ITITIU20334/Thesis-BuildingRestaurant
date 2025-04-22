package nha_hang.demo.Repository;

import nha_hang.demo.Model.Ban;
import nha_hang.demo.Model.DonDatBan;
import nha_hang.demo.Model.MonAn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


public interface BanRepository extends JpaRepository<Ban, Integer> {
    @Query("select m from Ban m left join DonDatBan n on m.idBan = n.idBan.idBan \n" +
            " AND n.ngayDat = :ngayDat \n" +
            " AND n.thoiGian = :thoiGian \n" +
            " AND n.trangThai not in ('Da Huy','Da Hoan Thanh')\n"+
            " WHERE n.idBan.idBan is null \n")
    List<Ban> getBanTrong(@Param("ngayDat") LocalDate ngayDat,
                          @Param("thoiGian") LocalTime thoiGian);

    @Query("SELECT DISTINCT m.viTri FROM Ban m")
    List<String> getViTriBan();


    @Query("SELECT m FROM Ban m WHERE m.viTri = :viTri and m.trangThai = 'trống'")
    List<Ban> getBanByViTri(String viTri);



    @Query("select m from Ban m left join DonDatBan n on m.idBan = n.idBan.idBan \n" +
                " AND n.ngayDat = :ngayDat \n" +
                " AND n.thoiGian = :thoiGian \n" +
                " AND n.trangThai not in ('Da Huy','Da Hoan Thanh')\n"+
            " WHERE n.idBan.idBan is null \n"+
                "  and m.soNguoi >= :soNguoi\n"+
            " ORDER BY m.viTri"
    )
    List<Ban> getBanTrongByTime(
                                @Param("ngayDat") LocalDate ngayDat,
                                @Param("thoiGian") LocalTime thoiGian,
                                @Param("soNguoi") Integer soNguoi
    );


    @Transactional
    @Modifying
    @Query("UPDATE Ban m SET m.daXoa = true WHERE m.idBan = :id")
    void softDeleteById(@Param("id") Integer id);

    @Query("SELECT m FROM Ban m WHERE  m.daXoa = false")
    List<Ban> findAllActive();

}
