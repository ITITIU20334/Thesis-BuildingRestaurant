package nha_hang.demo.Enum;

public enum DatBanTrangThai {
    DangXuLy("Dang xu Ly"),DaDuyet("Da Duyet"),DaHuy("Da Huy"),DaHoanThanh("Da Hoan Thanh");
    private String trangthai;
    DatBanTrangThai(String trangthai) {
        this.trangthai = trangthai;
    }
    public String getTrangthai(){
        return trangthai;
    }
}
