package nha_hang.demo.Service.ChiTietHoaDon;

import nha_hang.demo.DTO.ChiTietHoaDonDTO;
import nha_hang.demo.DTO.HoaDonDTO;
import nha_hang.demo.Model.ChiTietHoaDon;

public interface ChiTietHoaDonService {
    ChiTietHoaDon themMon (ChiTietHoaDonDTO chiTietHoaDonDTO);

    void deleteById(Integer integer);
}
