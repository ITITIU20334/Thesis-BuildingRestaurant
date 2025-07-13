package nha_hang.demo.Service.Ultis;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import nha_hang.demo.Config.VNPayConfig;
import nha_hang.demo.DTO.PaymentDTO;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.RoundingMode;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Random;
import java.util.TimeZone;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class VnpayUtil {

    private final VNPayConfig vnPayConfig;

    public static String hmacSHA512(final String key, final String data) {
        try {
            if (key == null || data == null) {
                throw new NullPointerException("Key or Data is null for HMAC SHA512");
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes(StandardCharsets.UTF_8);
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();
        } catch (Exception ex) {
            throw new RuntimeException("Error generating HMAC SHA512 hash", ex);
        }
    }

    public static String getIpAddress(HttpServletRequest request) {
        try {
            String ip = request.getHeader("X-FORWARDED-FOR");
            return (ip != null && !ip.isEmpty()) ? ip : request.getRemoteAddr();
        } catch (Exception e) {
            return "Invalid IP: " + e.getMessage();
        }
    }

    public static String getRandomNumber(int len) {
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(len);
        String chars = "0123456789";
        for (int i = 0; i < len; i++) {
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return sb.toString();
    }

    public String getPaymentURL(PaymentDTO dto) {
        Map<String, String> params = vnPayConfig.getVNPayConfig();

        ZoneId zone = TimeZone.getTimeZone("GMT+7").toZoneId();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

        params.put("vnp_TxnRef", dto.getReference());
        params.put("vnp_OrderInfo", dto.getDescription());
        params.put("vnp_Amount", dto.getPrice().setScale(0, RoundingMode.DOWN).toString());
        params.put("vnp_CreateDate", formatter.format(dto.getCreatedAt().atZone(zone)));
        params.put("vnp_ExpireDate", formatter.format(dto.getExpiredAt().atZone(zone)));
        params.put("vnp_IpAddr", dto.getIpAddress());

        String queryWithoutHash = buildQuery(params, true);
        String secureHash = hmacSHA512(vnPayConfig.getSecretKey(), buildQuery(params, false));

        return vnPayConfig.getVnp_PayUrl() + "?" + queryWithoutHash + "&vnp_SecureHash=" + secureHash;
    }

    private String buildQuery(Map<String, String> params, boolean encodeKey) {
        return params.entrySet().stream()
                .filter(e -> e.getValue() != null && !e.getValue().isEmpty())
                .sorted(Map.Entry.comparingByKey())
                .map(e -> {
                    try {
                        String key = encodeKey ? URLEncoder.encode(e.getKey(), StandardCharsets.US_ASCII) : e.getKey();
                        String value = URLEncoder.encode(e.getValue(), StandardCharsets.US_ASCII);
                        return key + "=" + value;
                    } catch (Exception ex) {
                        throw new RuntimeException("URL encoding error", ex);
                    }
                })
                .collect(Collectors.joining("&"));
    }
}
