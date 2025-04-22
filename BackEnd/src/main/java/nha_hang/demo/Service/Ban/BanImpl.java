package nha_hang.demo.Service.Ban;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import nha_hang.demo.Model.Ban;
import nha_hang.demo.Repository.BanRepository;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@AllArgsConstructor
@Service
public class BanImpl implements BanService {

    private BanRepository banRepository;
    @Override
    public List<Ban> getAll() {
        return banRepository.findAll();
    }

    @Override
    public List<Ban> findBan() {
        return banRepository.findAllActive();
    }

    @Override
    public Ban save(Ban ban) {
        return banRepository.save(ban);
    }

    @Override
    public Optional<Ban> findById(Integer integer) {
        return banRepository.findById(integer);
    }

    @Override
    public void deleteById(Integer integer) {
        banRepository.deleteById(integer);

    }

    @Override
    public Ban updateBan(Integer idBan, Ban ban) {
        Ban ban1 = banRepository.findById(idBan).orElseThrow(
                ()->new EntityNotFoundException("Version with Id does not exist"+ idBan)
        );
        ban1.setTenBan(ban.getTenBan());
        ban1.setViTri(ban.getViTri());
        ban1.setSoNguoi(ban.getSoNguoi());
        banRepository.save(ban1);
        return ban1;
    }

    @Override
    public Ban updateTrangThai(Integer idBan) {
        Ban ban = banRepository.findById(idBan).orElseThrow(
                ()->new EntityNotFoundException("Version with Id does not exist"+ idBan)
        );
        if(Objects.equals(ban.getTrangThai(), "Empty")){
            ban.setTrangThai("Serving");
        }else {
            ban.setTrangThai("Empty");
        }
        banRepository.save(ban);
        return ban;
    }

    @Override
    public List<Ban> getBanTrong(LocalDate ngayDat, LocalTime thoiGian) {
        System.out.println("Date:"+ngayDat);
        System.out.println("Time:"+thoiGian);
        return banRepository.getBanTrong(ngayDat, thoiGian);
    }
    @Override
    public List<String> getViTriBan() {
        return banRepository.getViTriBan();
    }

    @Override
    public List<Ban> getBanTrongByTime(LocalDate ngayDat, LocalTime thoiGian, Integer soNguoi) {

        return banRepository.getBanTrongByTime( ngayDat, thoiGian, soNguoi);
    }

    @Override
    public void xoaBan(Integer id) {
        banRepository.softDeleteById(id);
    }


    //viTri,String viTri,
    @Override
    public List<Ban> getBanByViTri(String viTri) {
        return banRepository.getBanByViTri(viTri);
    }

}
