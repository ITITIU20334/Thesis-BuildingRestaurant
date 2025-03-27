package nha_hang.demo.DTO;

import lombok.Data;
import nha_hang.demo.Model.Ban;
import nha_hang.demo.Model.ChiTietHoaDon;
import nha_hang.demo.Model.KhachHang;

import java.util.Date;
import java.util.List;

@Data
public class HoaDonDTO {
    private Date ngayTao;
    private Ban idBan;
    private KhachHang khachHang;
    private Integer tongTien;
    private String username;
    private String hoTen;
    private Integer idDatBan;
    private List<ChiTietHoaDon> chiTietHoaDons ;
}
