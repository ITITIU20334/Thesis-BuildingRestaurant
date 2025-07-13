package nha_hang.demo.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import nha_hang.demo.Enum.PaymentMethod;
import nha_hang.demo.Model.Ban;
import nha_hang.demo.Model.ChiTietDonDatBan;
import nha_hang.demo.Model.KhachHang;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class DatBanDTO {
    private String tnfRef;
    private LocalDate ngayDat;
    private LocalTime thoiGian;
    private int soLuong;
    private String idKhach;
    private Ban idBan;
    private String trangThai;
    private String hoTen;
    private String soDT;
    private String ghiChu;
    private String email;
    private String token;
    private BigDecimal tongTien;
    private PaymentMethod paymentMethod;

    private List<ChiTietDonDatBanDTO> chiTietDonDatBans;


}
