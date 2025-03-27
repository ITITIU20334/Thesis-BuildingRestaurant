package nha_hang.demo.Enum;

public enum TrangThaiHoaDon {
    KhoiTao("Khởi tạo"),HoanThanh("Đã hoàn thành");
    private String trangthai;
    TrangThaiHoaDon(String trangthai) {
        this.trangthai = trangthai;
    }
    public String getTrangthai(){
        return trangthai;
    }
}
