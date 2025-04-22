package nha_hang.demo.Service.Email;

public interface EmailService {
    void sendConfirmationEmail(String to, String token);
}
