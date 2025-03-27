package nha_hang.demo.API;

import lombok.RequiredArgsConstructor;
import nha_hang.demo.Service.DanhMuc.DanhMucService;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import nha_hang.demo.Model.DanhMuc;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/danhmuc")
public class DanhMucController {
    private final DanhMucService danhMucService;


    @GetMapping
    public ResponseEntity<List<DanhMuc>> getAll(){
        return ResponseEntity.ok().body(danhMucService.getAll());
    }

    @PostMapping
    public ResponseEntity<DanhMuc> taoDanhMuc(@RequestBody DanhMuc id){
        DanhMuc danhMuc = danhMucService.save(id);
        return ResponseEntity.ok().body(danhMuc);
    }

    @PutMapping("{id}")
    public ResponseEntity<DanhMuc> UpdateDanhMuc(@PathVariable("id") Integer idDanhMuc,
                                                 @RequestBody DanhMuc danhMuc
                                                 ){
        DanhMuc danhMuc1 = danhMucService.updateDanhMuc(idDanhMuc,danhMuc);
        return ResponseEntity.ok(danhMuc1);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDanhMuc(@PathVariable Integer id) {
        try {
            danhMucService.deleteById(id);
            return ResponseEntity.ok("Xóa danh mục với id = " + id);
        }
        catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Không thể xóa do ràng buộc khóa ngoại", HttpStatus.CONFLICT);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Không thể xóa danh mục", HttpStatus.INTERNAL_SERVER_ERROR); }
    }

    @GetMapping("{id}")
    public ResponseEntity<DanhMuc> getDanhMucById(@PathVariable Integer id){
        Optional<DanhMuc> danhMuc = danhMucService.findById(id);
        if(danhMuc.isPresent()){
            return ResponseEntity.ok(danhMuc.get());
        }else {
            throw new RuntimeException("khong tim thay danh muc");
        }
    }
}
