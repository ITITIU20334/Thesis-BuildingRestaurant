package nha_hang.demo.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor

public class LoginResponse {
    private String username;
    private List<String> roles;

}