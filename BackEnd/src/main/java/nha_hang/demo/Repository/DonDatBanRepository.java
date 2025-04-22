package nha_hang.demo.Repository;

import nha_hang.demo.Model.DonDatBan;
import nha_hang.demo.Enum.DatBanTrangThai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface DonDatBanRepository extends JpaRepository<DonDatBan, Integer> {
    @Query("SELECT m FROM DonDatBan m WHERE m.trangThai != 'Cancelled' and m.trangThai !='Completed' ")
    List<DonDatBan> findDonDatBanAdmin();

    @Query("SELECT m FROM DonDatBan m WHERE m.trangThai = 'Cancelled' or m.trangThai ='Completed' ")
    List<DonDatBan> findLichSuDatBan();
    @Query("SELECT m FROM DonDatBan m WHERE m.trangThai = 'Processing'  ")
    List<DonDatBan> getDonDatBanMoi();

    @Query("SELECT m FROM DonDatBan m WHERE m.idKhach.username=:username order by m.id desc ")
    List<DonDatBan> getDonByKhach( @Param("username") String username);

    @Query("select count(*) from DonDatBan m where m.trangThai = 'Processing' ")
    int getDonDatBanCount();


}
