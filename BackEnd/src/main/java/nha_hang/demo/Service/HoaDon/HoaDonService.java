package nha_hang.demo.Service.HoaDon;

import nha_hang.demo.DTO.DatBanDTO;
import nha_hang.demo.DTO.HoaDonDTO;
import nha_hang.demo.DTO.ThanhToanDTO;
import nha_hang.demo.Model.DonDatBan;
import nha_hang.demo.Model.HoaDon;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;

public interface HoaDonService {
    List<HoaDon> getAll();
    HoaDon save(HoaDon hoaDon);

    List<HoaDon> getChiTietHD(Integer idBan);

    HoaDon hoanThanh (Integer idHD, ThanhToanDTO dto);
    HoaDon TaoHoaDon(HoaDonDTO hoaDonDTO);
    ResponseEntity<byte[]> inHoaDon(HoaDon hoaDon);
    List<Integer> BaoCaoDoanhThuThang();
    List<HoaDon> getHoaDonByKhach(String username);
    List<HoaDon> getChiTietHDByKhach(Integer idHD);
    ResponseEntity<byte[]> inBaoCao(String ngayTao);
}
