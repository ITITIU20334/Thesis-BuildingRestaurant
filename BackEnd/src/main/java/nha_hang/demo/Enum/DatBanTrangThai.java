package nha_hang.demo.Enum;

public enum DatBanTrangThai {
    DangXuLy("Processing"),DaDuyet("Approved"),DaHuy("Cancelled"),DaHoanThanh("Completed");
    private String trangthai;
    DatBanTrangThai(String trangthai) {
        this.trangthai = trangthai;
    }
    public String getTrangthai(){
        return trangthai;
    }
}
