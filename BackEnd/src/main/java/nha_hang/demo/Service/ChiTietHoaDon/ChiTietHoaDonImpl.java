package nha_hang.demo.Service.ChiTietHoaDon;

import lombok.AllArgsConstructor;
import nha_hang.demo.DTO.ChiTietHoaDonDTO;
import nha_hang.demo.Model.ChiTietHoaDon;
import nha_hang.demo.Model.HoaDon;
import nha_hang.demo.Model.MonAn;
import nha_hang.demo.Repository.ChiTietHoaDonRepository;
import nha_hang.demo.Repository.HoaDonRepository;
import nha_hang.demo.Repository.MonAnRepository;
import nha_hang.demo.Service.MonAn.MonAnService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class ChiTietHoaDonImpl implements ChiTietHoaDonService {
    private ChiTietHoaDonRepository chiTietHoaDonRepository;
    private MonAnService monAnService;
    private final HoaDonRepository hoaDonRepository;
    private final MonAnRepository monAnRepository;

    @Override
    public ChiTietHoaDon themMon(ChiTietHoaDonDTO chiTietHoaDonDTO) {

        System.out.println(chiTietHoaDonDTO);

        HoaDon hd1 = hoaDonRepository.findById(chiTietHoaDonDTO.getId_hoaDon()).get();

        Optional<ChiTietHoaDon> monDaCo = chiTietHoaDonRepository.findMonAnDaCo(chiTietHoaDonDTO.getId_hoaDon(), chiTietHoaDonDTO.getId_monAn());

        if(monDaCo.isPresent()) {

            ChiTietHoaDon chiTietHoaDon = monDaCo.get();
            int newQuantity = chiTietHoaDon.getSoLuong() + 1;

            chiTietHoaDon.setSoLuong(newQuantity);
            chiTietHoaDon.setThanhTien(chiTietHoaDon.getIdMonAn().getGiaTien() * newQuantity);

            chiTietHoaDonRepository.save(chiTietHoaDon);

            hd1.setTongTien(hd1.getChiTietHoaDons().stream()
                    .mapToInt(ChiTietHoaDon::getThanhTien)
                    .sum());

            hoaDonRepository.save(hd1);

            System.out.println("Món ăn đã tồn tại trong hóa đơn, đã cập nhật số lượng.");
        } else {
            Optional<HoaDon> hd = hoaDonRepository.findById(chiTietHoaDonDTO.getId_hoaDon());
            Optional<MonAn> monAn = monAnRepository.findById(chiTietHoaDonDTO.getId_monAn());
            ChiTietHoaDon chiTietHoaDon = new ChiTietHoaDon();

            if (hd.isPresent()) {
                chiTietHoaDon.setIdHD(hd.get());
            } else {
                System.out.println("Có gì sai sai ở hóa đơn");
            }

            if (monAn.isPresent()) {
                chiTietHoaDon.setIdMonAn(monAn.get());
            } else {
                System.out.println("Có gì sai sai ở món ăn");
            }

            chiTietHoaDon.setSoLuong(1);
            chiTietHoaDon.setThanhTien(chiTietHoaDon.getIdMonAn().getGiaTien());
            chiTietHoaDonRepository.save(chiTietHoaDon);

            // Cập nhật lại tổng tiền của hóa đơn
            hd1.setTongTien(hd1.getChiTietHoaDons().stream()
                    .mapToInt(ChiTietHoaDon::getThanhTien)
                    .sum());

            hoaDonRepository.save(hd1);

            System.out.println("Món ăn chưa có trong hóa đơn, đã thêm vào chi tiết hóa đơn.");
        }

        return null;
    }


    @Override
    public void deleteById(Integer integer) {
        Optional<ChiTietHoaDon> chiTietHoaDonOptional = chiTietHoaDonRepository.findById(integer);
        if (chiTietHoaDonOptional.isPresent()) {
            ChiTietHoaDon chiTietHoaDon = chiTietHoaDonOptional.get();
            HoaDon hoaDon = chiTietHoaDon.getIdHD();
            Integer thanhTienCuaMon = chiTietHoaDon.getThanhTien();
            chiTietHoaDonRepository.deleteById(integer);
            hoaDon.setTongTien(hoaDon.getChiTietHoaDons().stream()
                    .mapToInt(ChiTietHoaDon::getThanhTien)
                    .sum());
            hoaDonRepository.save(hoaDon);

            System.out.println("Món ăn đã bị xóa khỏi hóa đơn, tổng tiền của hóa đơn đã được cập nhật.");
        } else {
            System.out.println("Chi tiết hóa đơn không tồn tại.");
        }
    }


}
