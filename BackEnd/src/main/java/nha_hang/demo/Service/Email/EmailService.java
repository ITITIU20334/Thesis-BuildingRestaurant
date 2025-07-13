package nha_hang.demo.Service.Email;

import nha_hang.demo.DTO.DatBanDTO;

public interface EmailService {
    void sendConfirmationEmail(String to, String token, DatBanDTO dto);
}
