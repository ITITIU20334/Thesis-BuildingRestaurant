package nha_hang.demo.Service.ChiTietDon;

import nha_hang.demo.Model.ChiTietDonDatBan;

import java.util.List;

public interface ChiTietDonDatBanService {
    List<ChiTietDonDatBan> findByidDonDatBan(Integer idDon);
}
