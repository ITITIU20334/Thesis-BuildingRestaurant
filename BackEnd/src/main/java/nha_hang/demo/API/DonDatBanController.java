package nha_hang.demo.API;

import lombok.RequiredArgsConstructor;
import nha_hang.demo.DTO.ChiTietDonDatBanDTO;
import nha_hang.demo.DTO.ChonBanDTO;
import nha_hang.demo.DTO.DatBanDTO;
import nha_hang.demo.Model.Ban;
import nha_hang.demo.Model.DonDatBan;
import nha_hang.demo.Model.KhachHang;
import nha_hang.demo.Repository.DonDatBanRepository;
import nha_hang.demo.Service.DonDatBan.DonDatBanImpl;
import nha_hang.demo.Service.DonDatBan.DonDatBanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import nha_hang.demo.Enum.DatBanTrangThai;

import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/dondatban")
public class DonDatBanController {
    @Autowired
    private DonDatBanService donDatBanService;
    @Autowired
    private DonDatBanRepository donDatBanRepository;


    @GetMapping
    public ResponseEntity<List<DonDatBan>> getALLDons (){
        return ResponseEntity.ok().body(donDatBanService.getAll());
    }

    @GetMapping("/danhsach")
    public ResponseEntity<List<DonDatBan>> getAdminDonDatBan(){
        return ResponseEntity.ok().body(donDatBanService.getAdminDonDatBan());
    }

    @GetMapping("/lichsu")
    public ResponseEntity<List<DonDatBan>>getLichSuDon(){
        return ResponseEntity.ok().body(donDatBanService.getLichSuDatBan());
    }
    @PutMapping("{id}")
    public ResponseEntity<DonDatBan> updateThongTin(@PathVariable("id")Integer idDon,
                                                    @RequestBody DonDatBan donDatBan){
        System.out.println("DU LIEU DA NHAN DUOC "+ idDon+ "Du lieu :" +donDatBan);
        DonDatBan donDatBan1 = donDatBanService.updateDonDatBan(idDon,donDatBan);
        return ResponseEntity.ok().body(donDatBan1);
    }
    @PutMapping("/chonban")
    public ResponseEntity<DonDatBan> chonBan (@RequestBody ChonBanDTO dto){
        DonDatBan don = donDatBanService.chonBan(dto);
        return ResponseEntity.ok().body(don);
    }
    @PostMapping
    public ResponseEntity<DonDatBan> taoDonDatBan(@RequestBody DonDatBan id){
        id.setTrangThai(DatBanTrangThai.DangXuLy.getTrangthai());
        return ResponseEntity.ok().body(donDatBanService.save(id));
    }

    @PutMapping("/duyet/{id}")
    public ResponseEntity<DonDatBan> DuyetDon (@PathVariable("id")Integer id){
        DonDatBan don = donDatBanService.DuyetDon(id);
        return ResponseEntity.ok(don);
    }
    @PutMapping("/hoan-thanh/{id}")
    public ResponseEntity<DonDatBan> HoanThanh (@PathVariable("id")Integer id){
        DonDatBan don = donDatBanService.HoanThanh(id);
        return ResponseEntity.ok(don);
    }
    @PutMapping("/huy/{id}")
    public ResponseEntity<DonDatBan> HuyDon (@PathVariable("id")Integer id){
        DonDatBan don = donDatBanService.HuyDon(id);
        return ResponseEntity.ok(don);
    }
    @PostMapping("/khachhang/datban")
    public ResponseEntity<DonDatBan> khachDatBan(@RequestBody DatBanDTO datBanDTO){
        System.out.println(datBanDTO);
        return ResponseEntity.ok().body(donDatBanService.UserDatBan(datBanDTO));


    }


    @GetMapping("/donmoi")
    public ResponseEntity<List<DonDatBan>> getDonmoi(){
        return ResponseEntity.ok().body(donDatBanService.getDuyetDonDatBan());
    }

    @GetMapping("/don/{username}")
    public ResponseEntity<List<DonDatBan>> getDon(@PathVariable("username")String username){
        return ResponseEntity.ok().body(donDatBanService.getDonByKhach(username));
    }

    @GetMapping("/tongdondatban")
    public ResponseEntity<Integer> getTongDonDatBan(){
        Integer dem = donDatBanRepository.getDonDatBanCount();
        return ResponseEntity.ok().body(dem);
    }

}
