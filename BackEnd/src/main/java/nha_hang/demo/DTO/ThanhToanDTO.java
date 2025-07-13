package nha_hang.demo.DTO;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ThanhToanDTO {
    private String phuongThucTT;
    private Integer idDonDatBan;
    private Integer paymentMethod;
    private String fullName;
    private String username;
    private BigDecimal tongTien;
}
