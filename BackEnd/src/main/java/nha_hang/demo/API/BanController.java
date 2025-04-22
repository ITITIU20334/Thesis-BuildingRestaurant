package nha_hang.demo.API;

import lombok.RequiredArgsConstructor;
import nha_hang.demo.Model.Ban;
import nha_hang.demo.Repository.BanRepository;
import nha_hang.demo.Service.Ban.BanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/ban")
public class BanController {
    private final BanService banService;
    private final BanRepository banRepository;

    @GetMapping
    public ResponseEntity<List<Ban>> getAll(){
        return ResponseEntity.ok().body(banService.findBan());
    }
    @GetMapping("/bantrong")
    public ResponseEntity<List<Ban>> getBanTrong(@RequestParam String ngayDat,
                                                 @RequestParam String thoiGian ){
        LocalDate ngay = LocalDate.parse(ngayDat);
        LocalTime gio = LocalTime.parse(thoiGian);
        System.out.println("Date:"+ngay);
        System.out.println("Time:"+gio);
        return ResponseEntity.ok().body(banService.getBanTrong(ngay,  gio));
    }
    @PostMapping
    public ResponseEntity<Ban> createBan(@RequestBody Ban ban){

        if (ban.getTrangThai() == null || ban.getTrangThai().isEmpty()) {
            ban.setTrangThai("Empty");
        }

        System.out.println(ban);
        ban = banService.save(ban);
        return ResponseEntity.ok().body(ban);
    }

    @PutMapping("{id}")
    public ResponseEntity<Ban> UpdateBan(@PathVariable("id")Integer idBan,
                                         @RequestBody Ban ban){
        Ban ban1 = banService.updateBan(idBan, ban);
        return ResponseEntity.ok(ban1);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> DeleteBan(@PathVariable("id") Integer idBan){
        banService.xoaBan(idBan);
        return ResponseEntity.ok("Deleted!");
    }

    @GetMapping("{id}")
    public ResponseEntity<Ban> getBanById(@PathVariable("id") Integer id){
        Optional<Ban> ban = banService.findById(id);
        if(ban.isPresent()){
            return ResponseEntity.ok(ban.get());
        }else {
            throw new RuntimeException("Not Found");
        }
    }
    @PutMapping("/trangthaiban/{id}")
    public ResponseEntity<Ban> UpdateTrangThaiBan(@PathVariable("id") Integer id){
        Ban ban = banService.updateTrangThai(id);
        return ResponseEntity.ok(ban);
    }
    @GetMapping("/vitriban")
    public ResponseEntity<List<String>> getViTriBan() {
        List<String> viTriList = banService.getViTriBan();
        return ResponseEntity.ok().body(viTriList);
    }


    @GetMapping("/vitri/{viTri}")
    public ResponseEntity<List<Ban>> getBanByViTri(@PathVariable String viTri) {
        List<Ban> bans = banService.getBanByViTri(viTri);
        return ResponseEntity.ok(bans);
    }

    @GetMapping("/timbantrong")
    public ResponseEntity<List<Ban>> getBanTrongByTime(
                                                       @RequestParam String ngayDat,
                                                       @RequestParam String thoiGian ,
                                                       @RequestParam Integer soNguoi
    ) {
        LocalDate ngay = LocalDate.parse(ngayDat);
        LocalTime gio = LocalTime.parse(thoiGian);
        System.out.println("Data:"+banService.getBanTrongByTime( ngay, gio, soNguoi));
        return ResponseEntity.ok().body(banService.getBanTrongByTime( ngay, gio, soNguoi));
    }
//@RequestParam String viTri,viTri,

    @GetMapping("/tongban")
    public ResponseEntity<Long> getTongBan() {
        try {
            long dem = banRepository.count();
            return ResponseEntity.ok(dem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(-1L);
        }
    }
}
