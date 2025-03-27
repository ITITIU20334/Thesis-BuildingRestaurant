package nha_hang.demo.Repository;

import nha_hang.demo.DTO.KhachHangDanhSachDTO;
import nha_hang.demo.Model.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {
    Optional<KhachHang> findByUsername(String username);

    Optional<KhachHang> findBySoDT(Integer soDT);

    @Query("select m from KhachHang m where m.role='ADMIN' ")
    List<KhachHang> findAllAdmin();

    @Modifying
    @Query("update KhachHang m set m.role = null where m.idKhach = :id")
    int xoaUser(@Param("id") Integer id);

    @Query("select m from KhachHang m where m.role='USER' ")
    List<KhachHang> findAllKhach();


}
