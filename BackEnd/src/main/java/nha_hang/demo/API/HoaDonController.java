package nha_hang.demo.API;

import lombok.RequiredArgsConstructor;
import nha_hang.demo.DTO.ChiTietHoaDonDTO;
import nha_hang.demo.DTO.HoaDonDTO;
import nha_hang.demo.DTO.ThanhToanDTO;
import nha_hang.demo.Enum.TrangThaiHoaDon;
import nha_hang.demo.Model.*;
import nha_hang.demo.Repository.BanRepository;
import nha_hang.demo.Repository.HoaDonRepository;
import nha_hang.demo.Service.Ban.BanService;
import nha_hang.demo.Service.ChiTietHoaDon.ChiTietHoaDonService;
import nha_hang.demo.Service.HoaDon.HoaDonService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/hoadon")
public class HoaDonController {
    private final HoaDonService hoaDonService;
    private final BanService banService;
    private final ChiTietHoaDonService chiTietHoaDonService;
    private final HoaDonRepository hoaDonRepository;

    @GetMapping
    public ResponseEntity<List<HoaDon>> getAll(){
        return ResponseEntity.ok().body(hoaDonService.getAll());
    }
    @GetMapping("/chitiet/ban/{idBan}")
    public ResponseEntity<List<HoaDon>> getChiTietHD(@PathVariable("idBan") Integer idBan){
        return ResponseEntity.ok().body(hoaDonService.getChiTietHD(idBan));
    }
    @PostMapping
    public ResponseEntity<HoaDon> lapHoaDon(@RequestBody HoaDonDTO dto){
        System.out.println(dto);
        HoaDon hoaDon = new HoaDon();
        hoaDon.setNgayTao(dto.getNgayTao());
        hoaDon.setTrangThai(TrangThaiHoaDon.KhoiTao.getTrangthai());
        hoaDon.setTenNhanVien(dto.getUsername());
        hoaDon.setHoTen(dto.getHoTen());
        hoaDon.setTongTien(0);
        Optional<Ban> ban = banService.findById(dto.getIdBan().getIdBan());
        if(ban.isPresent()){
            hoaDon.setIdBan(ban.get());
        }
        return ResponseEntity.ok(hoaDonService.save(hoaDon));
    }

    @GetMapping("/baocaothang")
    public ResponseEntity<List<Integer>> getBaocaoThang(){
        try{
            return ResponseEntity.ok().body(hoaDonService.BaoCaoDoanhThuThang());
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }



    @PostMapping("/themmon")
    public ResponseEntity<ChiTietHoaDon> themMonAn(@RequestBody ChiTietHoaDonDTO dto){
        return ResponseEntity.ok(chiTietHoaDonService.themMon(dto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChitietHD(@PathVariable Integer id) {
        chiTietHoaDonService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/hoanthanh/{id}")
    public ResponseEntity<HoaDon> HoanThanhHoaDon(@PathVariable("id") Integer id, @RequestBody ThanhToanDTO dto){
        HoaDon hd = hoaDonService.hoanThanh(id, dto);
        return ResponseEntity.ok(hd);
    }

    @PostMapping("/tao-hoa-don")
    public ResponseEntity<HoaDon> taoHoaDon(@RequestBody HoaDonDTO dto){
        System.out.println(dto);
        return ResponseEntity.ok().body(hoaDonService.TaoHoaDon(dto));
    }
    @GetMapping("/in-hoa-don/{id}")
    public ResponseEntity<byte[]> inHoaDon(@PathVariable Integer id) {
        System.out.println(id);
        HoaDon hoaDon = hoaDonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill with ID not found: " + id));

        return hoaDonService.inHoaDon(hoaDon);
    }
    @GetMapping("/khach/{username}")
    public ResponseEntity<List<HoaDon>> getHoaDonKhach(@PathVariable String username){
        return ResponseEntity.ok().body(hoaDonService.getHoaDonByKhach(username));
    }

    @GetMapping("/tonghoadonhomnay")
    public ResponseEntity<Long> getTongHoaDonHomNay() {
        System.out.println(LocalDate.now());
        try {
            LocalDate ngayHienTai = LocalDate.now();

            Long tongHoaDon = hoaDonRepository.countHoaDonByNgayTao(ngayHienTai);
            return ResponseEntity.ok(tongHoaDon);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(-1L);
        }
    }
    @GetMapping("/in-bao-cao")
    public ResponseEntity<byte[]> inBaoCao(@RequestParam String ngayTao) {
        return hoaDonService.inBaoCao(ngayTao);
    }
}
