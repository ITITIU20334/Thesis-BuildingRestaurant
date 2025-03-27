package nha_hang.demo.Service.DonDatBan;

import nha_hang.demo.DTO.ChiTietDonDatBanDTO;
import nha_hang.demo.DTO.ChonBanDTO;
import nha_hang.demo.DTO.DatBanDTO;
import nha_hang.demo.Model.Ban;
import nha_hang.demo.Model.ChiTietDonDatBan;
import nha_hang.demo.Model.DonDatBan;

import java.util.List;

public interface DonDatBanService {
    List<DonDatBan> getAll();
    List<DonDatBan>getAdminDonDatBan();

    List<DonDatBan>getLichSuDatBan();
    DonDatBan save(DonDatBan donDatBan);
    DonDatBan UserDatBan(DatBanDTO datBanDTO);
    DonDatBan HoanThanh(Integer id);
    DonDatBan DuyetDon(Integer id);
    DonDatBan HuyDon(Integer id);
    DonDatBan chonBan(ChonBanDTO chonBanDTO);
    List<DonDatBan>getDuyetDonDatBan();
    DonDatBan updateDonDatBan(Integer id, DonDatBan donDatBan);
    List<DonDatBan> getDonByKhach(String username);
}
