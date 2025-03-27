package nha_hang.demo.API;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import nha_hang.demo.DTO.MonAnDTO;
import nha_hang.demo.DTO.MonDaBanDTO;
import nha_hang.demo.Model.Ban;
import nha_hang.demo.Model.MonAn;
import nha_hang.demo.Repository.MonAnRepository;
import nha_hang.demo.Service.MonAn.MonAnService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/monan")
public class MonAnController {
    private final MonAnService monAnService;
    private final UploadController uploadController;
    private final MonAnRepository monAnRepository;

    @GetMapping
    public ResponseEntity<List<MonAn>> getAll(){
        return ResponseEntity.ok().body(monAnService.findMonAn());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonAn> getMonAnById(@PathVariable Integer id){
        Optional<MonAn> monAn = monAnService.findById(id);
        if(monAn.isPresent()){
            return ResponseEntity.ok().body(monAn.get());
        }else {
            throw new RuntimeException("Khong co mon an nay");
        }
    }
    @GetMapping("/rand_mon")
    public ResponseEntity<List<MonAn>> getRandomMonAn(){
        return ResponseEntity.ok().body(monAnService.getMonAnNgauNhien());
    }

    @GetMapping("/timkiem/{tim}")
    public ResponseEntity<List<MonAn>> timKiemMonAn(@PathVariable String tim) {
        return ResponseEntity.ok().body(monAnService.timKiemMonAn(tim));
    }
    @GetMapping("/loai/{id}")
    public ResponseEntity<?> getMonAnByLoai(@PathVariable Integer id) {
        try {
            List<MonAn> monAns = monAnService.findByLoai(id);
            if (monAns.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(monAns);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Id loại món ăn không hợp lệ: " + e.getMessage());
        }
    }



    @PostMapping
    public ResponseEntity<MonAn> themMonAn(@RequestPart("monAn") String monAnDTO,
                                           @RequestPart("hinhAnh")MultipartFile hinhAnh){
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            MonAnDTO monAnDTOs = objectMapper.readValue(monAnDTO, MonAnDTO.class);
            String imageUrl = uploadController.uploadFile(hinhAnh);
            monAnDTOs.setHinhAnh(imageUrl);
            MonAn savedMonAn = monAnService.save(monAnDTOs);
            return ResponseEntity.ok(savedMonAn);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMonAn(@PathVariable Integer id) {
        monAnService.xoaMon(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<MonAn> updateMonAn(@PathVariable Integer id,
                                             @RequestPart("monAn") String monAnDTO,
                                             @RequestPart("ImageMonAn") String imageMonAn,
                                             @RequestPart(value = "hinhAnh",required = false )  MultipartFile hinhAnh ){

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            MonAnDTO monAnDTOs = objectMapper.readValue(monAnDTO, MonAnDTO.class);

            if (hinhAnh != null && !hinhAnh.isEmpty()) {
                String imageURL = uploadController.uploadFile(hinhAnh);
                monAnDTOs.setHinhAnh(imageURL); // Giả sử MonAnDTO có trường imageURL
            }
            else {
                monAnDTOs.setHinhAnh(imageMonAn);
            }

            MonAn updatedMonAn = monAnService.UpdateMon(id, monAnDTOs);
            return ResponseEntity.ok(updatedMonAn);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/tongmonan")
    public ResponseEntity<Integer> tongMonAn(){
        Integer dem = monAnRepository.countMonAn();
        return ResponseEntity.ok(dem);
    }

    @GetMapping("/monyeuthich")
    public ResponseEntity<List<MonDaBanDTO>> monyeuthichMonAn(){
        List<MonDaBanDTO> dem = monAnRepository.countMonAnDaBan();
        return ResponseEntity.ok(dem);
    }

}

