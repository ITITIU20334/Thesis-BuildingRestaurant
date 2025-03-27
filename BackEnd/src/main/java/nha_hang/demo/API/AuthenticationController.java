package nha_hang.demo.API;

import nha_hang.demo.DTO.LoginResponse;
import nha_hang.demo.Enum.Role;
import nha_hang.demo.Model.KhachHang;
import nha_hang.demo.Security.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(UserService userService,AuthenticationManager authenticationManager){
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/dangky")
    public ResponseEntity<String> dangKy(@RequestBody KhachHang khachHang){
        if(khachHang.getRole() == null){
            khachHang.setRole(Role.USER);
        }
        if(khachHang.getRole() == Role.ADMIN){
            khachHang.setRole(Role.ADMIN);
        }
        userService.dangKy(khachHang);
        return ResponseEntity.ok("Registration successful!");

    }

    @PostMapping("/login")
    public ResponseEntity<String> dangNhap(@RequestBody KhachHang khachHang){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(khachHang.getUsername(),khachHang.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return ResponseEntity.ok().body("Login successful!");
    }
    @GetMapping("/success")
    public ResponseEntity<?> loginSuccess(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(new LoginResponse(
                userDetails.getUsername(),
                userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList())
        ));
    }

    @GetMapping("/failure")
    public ResponseEntity<?> loginFailure() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
