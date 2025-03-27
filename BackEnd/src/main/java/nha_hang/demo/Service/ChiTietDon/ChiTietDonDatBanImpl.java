package nha_hang.demo.Service.ChiTietDon;

import lombok.AllArgsConstructor;
import nha_hang.demo.Model.ChiTietDonDatBan;
import nha_hang.demo.Repository.ChiTietDonDatBanRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
public class ChiTietDonDatBanImpl implements ChiTietDonDatBanService {
    private ChiTietDonDatBanRepository chiTietDonDatBanRepository;
    @Override
    public List<ChiTietDonDatBan> findByidDonDatBan(Integer idDon) {
        return chiTietDonDatBanRepository.findChiTietDon(idDon);
    }
}
