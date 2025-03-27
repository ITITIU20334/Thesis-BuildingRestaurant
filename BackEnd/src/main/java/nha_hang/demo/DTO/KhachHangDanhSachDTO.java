package nha_hang.demo.DTO;

import lombok.Data;

@Data
public class KhachHangDanhSachDTO {
    private Integer idUser;
    private String hoTen;
    private String soDT;
    private String username;
    private Long tongTien;

    public KhachHangDanhSachDTO(Integer idUser, String hoTen, String soDT, String username, Long tongTien) {
        this.idUser = idUser;
        this.hoTen = hoTen;
        this.soDT = soDT;
        this.username = username;
        this.tongTien = tongTien;
    }

}
