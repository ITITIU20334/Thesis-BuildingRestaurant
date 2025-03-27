package nha_hang.demo.DTO;

import lombok.Data;

@Data
public class MonDaBanDTO {
    private String tenMon; // Tên món ăn
    private Long soLuong;  // Số lượng bán được


    public MonDaBanDTO(String tenMon, Long soLuong) {
        this.tenMon = tenMon;
        this.soLuong = soLuong;
    }

    // Getters và Setters
    public String getTenMon() {
        return tenMon;
    }

    public void setTenMon(String tenMon) {
        this.tenMon = tenMon;
    }

    public Long getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Long soLuong) {
        this.soLuong = soLuong;
    }
}
