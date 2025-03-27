package nha_hang.demo.Service.Ban;

import nha_hang.demo.Model.Ban;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface BanService {
    List<Ban> getAll();

    Ban save(Ban ban);

    Optional<Ban> findById(Integer integer);

    void deleteById(Integer integer);

    Ban updateBan(Integer idBan, Ban ban);

    Ban updateTrangThai(Integer idBan);
    List<Ban> getBanTrong(LocalDate ngayDat, LocalTime thoiGian);
     List<Ban> getBanByViTri(String viTri);
     List<String> getViTriBan();
    List<Ban> getBanTrongByTime( LocalDate ngayDat, LocalTime thoiGian, Integer soNguoi);
}
//String viTri,