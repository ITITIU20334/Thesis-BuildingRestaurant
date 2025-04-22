package nha_hang.demo.API;

import lombok.RequiredArgsConstructor;
import nha_hang.demo.DTO.ChangePasswordDTO;
import nha_hang.demo.Model.Ban;
import nha_hang.demo.Model.KhachHang;
import nha_hang.demo.Repository.KhachHangRepository;
import nha_hang.demo.Security.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    @Autowired
    private final UserService userService;
    @Autowired
    private KhachHangRepository khachHangRepository;

    @GetMapping("/{username}")
    public ResponseEntity<KhachHang> getProfile(@PathVariable String username) {
        return ResponseEntity.ok().body(userService.getKhachHangByUsername(username));
    }
    @PutMapping("/{username}")
    public ResponseEntity<KhachHang> updateProfile(@PathVariable("username") String username,
                                                   @RequestBody KhachHang khachHang) {
        KhachHang khachHang1 = userService.updateKhachHang(username,khachHang);
        return ResponseEntity.ok(khachHang1);
    }
    @PutMapping("/doimatkhau")
    public ResponseEntity<String> doimatkhau(@RequestBody ChangePasswordDTO dto) {
        try{
            System.out.println(dto);
            userService.changePassword(dto);

            return ResponseEntity.ok().body("Change password successfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/getAdmin")
    public ResponseEntity<List<KhachHang>> getAdmin() {
        return ResponseEntity.ok().body(khachHangRepository.findAllAdmin());
    }
    @GetMapping("/getKhachHang")
    public ResponseEntity<List<KhachHang>> getKhachHang() {
        return ResponseEntity.ok().body(khachHangRepository.findAllKhach());
    }

    @PutMapping("/xoaUser/{id}")
    public ResponseEntity<?> xoaRoleUser(@PathVariable Integer id) {
        try {
            userService.xoaRoleUser(id);
            return ResponseEntity.ok("The customer role has been successfully deleted.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

}
