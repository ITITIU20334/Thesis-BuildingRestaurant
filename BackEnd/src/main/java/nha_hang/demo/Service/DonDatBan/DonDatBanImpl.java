package nha_hang.demo.Service.DonDatBan;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import nha_hang.demo.DTO.ChiTietDonDatBanDTO;
import nha_hang.demo.DTO.ChonBanDTO;
import nha_hang.demo.DTO.DatBanDTO;
import nha_hang.demo.Enum.DatBanTrangThai;
import nha_hang.demo.Model.*;
import nha_hang.demo.Repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DonDatBanImpl implements DonDatBanService {
    private DonDatBanRepository donDatBanRepository;
    private KhachHangRepository khachHangRepository;
    private BanRepository banRepository;
    private ChiTietDonDatBanRepository chiTietDonDatBanRepository;
    private final MonAnRepository monAnRepository;

    @Override
    public List<DonDatBan> getAll() {
        return donDatBanRepository.findAll();
    }

    @Override
    public List<DonDatBan> getAdminDonDatBan() {
        return donDatBanRepository.findDonDatBanAdmin();
    }

    @Override
    public List<DonDatBan> getLichSuDatBan() {
        return donDatBanRepository.findLichSuDatBan();
    }

    @Override
    public DonDatBan save(DonDatBan donDatBan) {
        return donDatBanRepository.save(donDatBan);
    }

    @Transactional
    public DonDatBan UserDatBan(DatBanDTO datBanDTO) {
        DonDatBan datBan = new DonDatBan();

        // Thiết lập thông tin đơn đặt bàn
        datBan.setNgayDat(datBanDTO.getNgayDat());
        datBan.setThoiGian(datBanDTO.getThoiGian());
        datBan.setGhiChu(datBanDTO.getGhiChu());
        datBan.setSoLuong(datBanDTO.getSoLuong());
        datBan.setIdBan(datBanDTO.getIdBan());
        datBan.setTrangThai(DatBanTrangThai.DangXuLy.getTrangthai());

        // Lấy thông tin khách hàng
        Optional<KhachHang> khachDangKy = khachHangRepository.findByUsername(datBanDTO.getIdKhach());
        if (khachDangKy.isPresent()) {
            datBan.setIdKhach(khachDangKy.get());
            datBan.setHoTen(datBanDTO.getHoTen());
            datBan.setSoDT(datBanDTO.getSoDT());
        } else {
            datBan.setIdKhach(null);
            datBan.setHoTen(datBanDTO.getHoTen());
            datBan.setSoDT(datBanDTO.getSoDT());
        }

        // Lưu đơn đặt bàn
        DonDatBan saveDon = donDatBanRepository.save(datBan);

        // Tạo chi tiết đơn đặt bàn
        List<ChiTietDonDatBan> chiTietDonDatBans = datBanDTO.getChiTietDonDatBans().stream()

                .map(dto -> {
                    ChiTietDonDatBan chiTiet = new ChiTietDonDatBan();

                    Optional<MonAn> monAn = monAnRepository.findById(dto.getIdMon());
                    if (monAn.isPresent()) {
                        chiTiet.setMonAnId(monAn.get());
                    } else {
                        throw new EntityNotFoundException("Food with ID" + dto.getIdMon() + " no exists");
                    }

                    chiTiet.setSoLuong(dto.getSoLuong());
                    chiTiet.setTongTien(dto.getTongTien());
                    chiTiet.setDonDatBanId(datBan);

                    return chiTietDonDatBanRepository.save(chiTiet);
                }).collect(Collectors.toList());

        // Thiết lập danh sách chi tiết cho đơn đặt bàn
        saveDon.setChiTietDonDatBans(chiTietDonDatBans);

        // Lưu đơn đặt bàn lần cuối với các chi tiết đã liên kết
        return donDatBanRepository.save(saveDon);
    }

    @Override
    public DonDatBan HoanThanh(Integer id) {
        DonDatBan don = donDatBanRepository.findById(id).orElseThrow(
                ()->new EntityNotFoundException("Not Found"+ id)
        );
        if(Objects.equals(don.getTrangThai(), DatBanTrangThai.DaDuyet.getTrangthai())){
            don.setTrangThai(DatBanTrangThai.DaHoanThanh.getTrangthai());
        }
        donDatBanRepository.save(don);
        return don;
    }

    @Override
    public DonDatBan DuyetDon(Integer id) {
        DonDatBan don = donDatBanRepository.findById(id).orElseThrow(
                ()->new EntityNotFoundException("Not Found"+ id)
        );
        if(Objects.equals(don.getTrangThai(), DatBanTrangThai.DangXuLy.getTrangthai())){
            don.setTrangThai(DatBanTrangThai.DaDuyet.getTrangthai());
        }
        donDatBanRepository.save(don);
        return don;
    }

    @Override
    public DonDatBan HuyDon(Integer id) {
        DonDatBan don = donDatBanRepository.findById(id).orElseThrow(
                ()->new EntityNotFoundException("Not Found"+ id)
        );
        if(Objects.equals(don.getTrangThai(), DatBanTrangThai.DangXuLy.getTrangthai())||
                Objects.equals(don.getTrangThai(), DatBanTrangThai.DaDuyet.getTrangthai())){
            don.setTrangThai(DatBanTrangThai.DaHuy.getTrangthai());
        }
        donDatBanRepository.save(don);
        return don;
    }

    @Override
    public DonDatBan chonBan(ChonBanDTO chonBanDTO) {
        DonDatBan don = donDatBanRepository.findById(chonBanDTO.getIdDonDatBan()).orElseThrow(
                ()->new EntityNotFoundException("Not Found"+ chonBanDTO.getIdDonDatBan())
        );
        don.setIdBan(chonBanDTO.getChonBan());
        donDatBanRepository.save(don);
        return don;
    }

    @Override
    public List<DonDatBan> getDuyetDonDatBan() {
        return donDatBanRepository.getDonDatBanMoi();
    }

    @Override
    public DonDatBan updateDonDatBan(Integer id, DonDatBan donDatBan) {
        DonDatBan donDatBan1 = donDatBanRepository.findById(id).orElseThrow(
                ()->new EntityNotFoundException("Not Found"+ id)
        );
        if (donDatBan.getNgayDat() != null && !donDatBan.getNgayDat().equals(donDatBan1.getNgayDat())) {
            System.out.println("Date changed");
            donDatBan1.setIdBan(null);
        }
        System.out.println(donDatBan.getThoiGian());
        System.out.println(donDatBan1.getThoiGian());
        if (donDatBan.getThoiGian()!=donDatBan1.getThoiGian()) {
            System.out.println("Time changed");
            donDatBan1.setIdBan(null);
        }
        donDatBan1.setNgayDat(donDatBan.getNgayDat());
        donDatBan1.setThoiGian(donDatBan.getThoiGian());
        donDatBan1.setHoTen(donDatBan.getHoTen());
        donDatBan1.setSoDT(donDatBan.getSoDT());
        donDatBan1.setGhiChu(donDatBan.getGhiChu());
        donDatBan1.setSoLuong(donDatBan.getSoLuong());

        donDatBanRepository.save(donDatBan1);
        return donDatBan1;
    }

    @Override
    public List<DonDatBan> getDonByKhach(String username) {
        return donDatBanRepository.getDonByKhach(username);
    }


}
