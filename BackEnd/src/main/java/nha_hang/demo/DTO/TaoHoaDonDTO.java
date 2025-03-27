package nha_hang.demo.DTO;

import lombok.Data;
import nha_hang.demo.Model.Ban;
import nha_hang.demo.Model.ChiTietHoaDon;
import nha_hang.demo.Model.KhachHang;

import java.util.Date;
import java.util.List;

@Data

public class TaoHoaDonDTO {
    private Date ngayTao;
    private Integer tongTien;
    private Ban idBan;
    private KhachHang idKhachHang;
    private String hoTen;
    private String tenNV;
    List<ChiTietHoaDonDTO> chitiethdDTO;
}
