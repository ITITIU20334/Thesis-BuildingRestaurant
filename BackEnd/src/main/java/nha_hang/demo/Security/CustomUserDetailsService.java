package nha_hang.demo.Security;

import nha_hang.demo.Model.KhachHang;
import nha_hang.demo.Repository.KhachHangRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final KhachHangRepository khachHangRepository;

    public CustomUserDetailsService(KhachHangRepository khachHangRepository){
        this.khachHangRepository = khachHangRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        KhachHang khachHang = khachHangRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("Khong tim thay user"));

        return new org.springframework.security.core.userdetails.User(
                khachHang.getUsername(),
                khachHang.getPassword(),
                Collections.singleton(()->khachHang.getRole().name())
        );
    }
}
