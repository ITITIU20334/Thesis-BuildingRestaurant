package nha_hang.demo.Enum;

public enum TrangThaiHoaDon {
    KhoiTao("Initialization"),HoanThanh("Completed");
    private String trangthai;
    TrangThaiHoaDon(String trangthai) {
        this.trangthai = trangthai;
    }
    public String getTrangthai(){
        return trangthai;
    }
}
