package nha_hang.demo.Service.Email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import nha_hang.demo.DTO.ChiTietDonDatBanDTO;
import nha_hang.demo.DTO.DatBanDTO;
import nha_hang.demo.Model.MonAn;
import nha_hang.demo.Service.MonAn.MonAnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.Locale;
import java.util.Optional;

@Service
public class EmailImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private MonAnService monAnService;
    @Override
    public void sendConfirmationEmail(String to, String token, DatBanDTO dto) {
        String url = "http://localhost:3000/confirm?token=" + token;

        StringBuilder monAnTable = new StringBuilder();

        monAnTable.append("<table style='width:100%; border-collapse:collapse;'>")
                .append("<tr style='background-color:yellow; font-weight:bold; text-align:center;'>")
                .append("<th style='border:1px solid #ddd; padding:8px;'>Number</th>")
                .append("<th style='border:1px solid #ddd; padding:8px;'>Name</th>")
                .append("<th style='border:1px solid #ddd; padding:8px;'>Quantity</th>")
                .append("<th style='border:1px solid #ddd; padding:8px;'>Price</th>")
                .append("<th style='border:1px solid #ddd; padding:8px;'>Total Amount</th>")
                .append("</tr>");

        int index = 1;
        int totalAmount = 0;
        NumberFormat formatter = NumberFormat.getInstance(new Locale("vi", "VN"));


        for (ChiTietDonDatBanDTO item : dto.getChiTietDonDatBans()) {
            Optional<MonAn> monOpt = monAnService.findById(item.getIdMon());
            if (monOpt.isPresent()) {
                MonAn mon = monOpt.get();
                int quantity = item.getSoLuong();
                int price = item.getGiaTien();
                int amount = quantity * price;
                totalAmount += amount;
                monAnTable.append("<tr style='text-align:center;'>")
                        .append("<td style='border:1px solid #ddd; padding:8px;'>").append(index++).append("</td>")
                        .append("<td style='border:1px solid #ddd; padding:8px;'>").append(mon.getTenMon()).append("</td>")
                        .append("<td style='border:1px solid #ddd; padding:8px;'>").append(quantity).append("</td>")
                        .append("<td style='border:1px solid #ddd; padding:8px;'>").append(price).append("</td>")
                        .append("<td style='border:1px solid #ddd; padding:8px;'>").append(amount).append("</td>")
                        .append("</tr>");
            }
        }

        monAnTable.append("</table>");

        String body =
                "<h2>Please Confirm Your Reservation:</h2>" +
                        "<p><strong>Full Name:</strong> " + dto.getHoTen() + "</p>" +
                        "<p><strong>Phone Number:</strong> " + dto.getSoDT() + "</p>" +
                        "<p><strong>Date:</strong> " + dto.getNgayDat() + "</p>" +
                        "<p><strong>Time:</strong> " + dto.getThoiGian() + "</p>" +
                        "<p><strong>Number of Customers:</strong> " + dto.getSoLuong() + "</p>" +
                        "<p><strong>Note:</strong> " + dto.getGhiChu() + "</p>" +

                        "<h3>Food Details</h3>" +
                        monAnTable.toString() +
                        "<p style='font-weight:bold;'>Total Amount: " + formatter.format(totalAmount) + " VND</p>" +

                        "<a href=\"" + url + "\" "
                        + "style=\"display:inline-block;margin-top:20px;padding:10px 20px;background-color:#28a745;color:white;"
                        + "text-decoration:none;border-radius:5px;font-weight:bold;\">Confirm</a>";

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
