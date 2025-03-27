package nha_hang.demo.Repository;

import nha_hang.demo.Model.DonDatBan;
import nha_hang.demo.Model.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface HoaDonRepository extends JpaRepository<HoaDon,Integer> {
    @Query("select m from HoaDon m WHERE m.idBan.idBan = :idBan and m.trangThai = \"Khởi tạo\"")
    List<HoaDon> ChiTietHoaDon(@Param("idBan") Integer idBan);

    @Query("select m FROM HoaDon m order by m.ngayTao desc ")
    List<HoaDon> getAllHoaDonAn();

    @Query(value = "WITH Thang AS (" +
            "    SELECT 1 AS thang UNION ALL  " +
            "    SELECT 2 UNION ALL " +
            "    SELECT 3 UNION ALL " +
            "    SELECT 4 UNION ALL " +
            "    SELECT 5 UNION ALL " +
            "    SELECT 6 UNION ALL " +
            "    SELECT 7 UNION ALL " +
            "    SELECT 8 UNION ALL " +
            "    SELECT 9 UNION ALL " +
            "    SELECT 10 UNION ALL " +
            "    SELECT 11 UNION ALL " +
            "    SELECT 12 " +
            ") " +
            "SELECT " +
            "    COALESCE(SUM(hd.tong_tien), 0) AS tong_tien " +
            "FROM " +
            "    Thang " +
            "LEFT JOIN " +
            "    hoa_don hd ON Thang.thang = MONTH(hd.ngay_tao) " +
            "GROUP BY " +
            "    Thang.thang " +
            "ORDER BY " +
            "    Thang.thang",
            nativeQuery = true)
    List<Integer> BaoCaoDoanhThuThang();


    @Query("SELECT m FROM HoaDon m WHERE m.idKH.username=:username order by m.idHD desc ")
    List<HoaDon> getHoaDonByKhach( @Param("username") String username);

    List<HoaDon> findHoaDonByIdHD(Integer idHD);

    @Query("select count (*) from HoaDon m where m.ngayTao = :ngaytao")
    Integer countHoaDon(@Param("ngaytao") LocalDate ngaytao);

    Long countHoaDonByNgayTao(LocalDate ngayTao);


    @Query("SELECT m FROM HoaDon m WHERE m.ngayTao = :ngayTao")
    List<HoaDon> getHoaDonByNgayTao(@Param("ngayTao") Date ngayTao);

}
