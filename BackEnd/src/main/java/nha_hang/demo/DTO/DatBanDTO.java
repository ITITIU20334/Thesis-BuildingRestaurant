package nha_hang.demo.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import nha_hang.demo.Model.Ban;
import nha_hang.demo.Model.ChiTietDonDatBan;
import nha_hang.demo.Model.KhachHang;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class DatBanDTO {
    private LocalDate ngayDat;
    private LocalTime thoiGian;
    private int soLuong;
    private String idKhach;
    private Ban idBan;
    private String trangThai;
    private String hoTen;
    private String soDT;
    private String ghiChu;

    private List<ChiTietDonDatBanDTO> chiTietDonDatBans ;

}
