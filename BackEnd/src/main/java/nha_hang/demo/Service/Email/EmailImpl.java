package nha_hang.demo.Service.Email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendConfirmationEmail(String to, String token) {
        String url = "http://localhost:3000/confirm?token=" + token;

        String body = "<h3>Please Confirm Your Reservation:</h3>"
                + "<a href=\"" + url + "\" "
                + "style=\"display:inline-block;padding:10px 20px;background-color:#28a745;color:white;"
                + "text-decoration:none;border-radius:5px;\">Confirm</a>";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject("Confirm Booking");
            helper.setText(body, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email!", e);
        }
    }
}
