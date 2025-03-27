package nha_hang.demo.Security;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import nha_hang.demo.DTO.ChangePasswordDTO;
import nha_hang.demo.Model.Ban;
import nha_hang.demo.Model.KhachHang;
import nha_hang.demo.Repository.KhachHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final KhachHangRepository khachHangRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(KhachHangRepository khachHangRepository, PasswordEncoder passwordEncoder){
        this.khachHangRepository = khachHangRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public void dangKy(KhachHang khachHang){
        Optional<KhachHang> daTonTai =  khachHangRepository.findByUsername(khachHang.getUsername());

        if(daTonTai.isPresent()){
            throw new RuntimeException("Tên người dùng đã tồn tại");
        }

        khachHang.setPassword(passwordEncoder.encode(khachHang.getPassword()));
        khachHang.setHoTen(khachHang.getHoTen());
        khachHang.setSoDT(khachHang.getSoDT());
        khachHangRepository.save(khachHang);

    }
    public KhachHang getKhachHangByUsername(String username) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username không được để trống");
        }
        return khachHangRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy Khách Hàng với username: " + username));
    }
    public KhachHang updateKhachHang(String username,KhachHang khachHang){
        KhachHang oldKhachHang = getKhachHangByUsername(username);
        oldKhachHang.setHoTen(khachHang.getHoTen());
        oldKhachHang.setSoDT(oldKhachHang.getSoDT());
        khachHangRepository.save(oldKhachHang);
        return oldKhachHang;
    }

    public KhachHang changePassword(ChangePasswordDTO dto){
        Optional<KhachHang> khachHang = khachHangRepository.findByUsername(dto.getUsername());
        if(khachHang.isPresent()){
            boolean password = passwordEncoder.matches(dto.getOldPassword(), khachHang.get().getPassword());
            if(password){
                khachHang.get().setPassword(passwordEncoder.encode(dto.getNewPassword()));
            }
            else {
                throw new RuntimeException("Sai mat khau");
            }
            khachHangRepository.save(khachHang.get());
        }else {
            throw new RuntimeException("Khong ton tai nguoi dung nay");
        }
        return khachHang.get();
    }
    @Transactional
    public void xoaRoleUser(Integer id) {
        int affectedRows = khachHangRepository.xoaUser(id);
        if (affectedRows > 0) {
            System.out.println("Xóa role thành công");
        } else {
            System.out.println("Không tìm thấy người dùng");
        }
    }

}
