package nha_hang.demo.API;

import lombok.RequiredArgsConstructor;
import nha_hang.demo.DTO.ChonBanDTO;
import nha_hang.demo.DTO.DatBanDTO;
import nha_hang.demo.Enum.PaymentMethod;
import nha_hang.demo.Model.DonDatBan;
import nha_hang.demo.Model.MonAn;
import nha_hang.demo.Repository.DonDatBanRepository;
import nha_hang.demo.Service.DonDatBan.DonDatBanService;
import nha_hang.demo.Service.Email.EmailImpl;
import nha_hang.demo.Service.Email.EmailService;
import nha_hang.demo.Service.MonAn.MonAnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import nha_hang.demo.Enum.DatBanTrangThai;

import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/dondatban")
public class DonDatBanController {
    @Autowired
    private DonDatBanService donDatBanService;
    @Autowired
    private DonDatBanRepository donDatBanRepository;
    @Autowired
    private EmailService emailService;
    private final Map<String, DatBanDTO> pendingBookings = new HashMap<>();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private MonAnService monAnService;

    @GetMapping
    public ResponseEntity<List<DonDatBan>> getALLDons (){
        return ResponseEntity.ok().body(donDatBanService.getAll());
    }

    @GetMapping("/danhsach")
    public ResponseEntity<List<DonDatBan>> getAdminDonDatBan(){
        return ResponseEntity.ok().body(donDatBanService.getAdminDonDatBan());
    }

    @GetMapping("/lichsu")
    public ResponseEntity<List<DonDatBan>>getLichSuDon(){
        return ResponseEntity.ok().body(donDatBanService.getLichSuDatBan());
    }
    @PutMapping("{id}")
    public ResponseEntity<DonDatBan> updateThongTin(@PathVariable("id")Integer idDon,
                                                    @RequestBody DonDatBan donDatBan){
        System.out.println("Data Received "+ idDon+ "Data: " +donDatBan);
        DonDatBan donDatBan1 = donDatBanService.updateDonDatBan(idDon,donDatBan);
        return ResponseEntity.ok().body(donDatBan1);
    }
    @PutMapping("/chonban")
    public ResponseEntity<DonDatBan> chonBan (@RequestBody ChonBanDTO dto){
        DonDatBan don = donDatBanService.chonBan(dto);
        return ResponseEntity.ok().body(don);
    }
    @PostMapping
    public ResponseEntity<DonDatBan> taoDonDatBan(@RequestBody DonDatBan id){
        id.setTrangThai(DatBanTrangThai.DangXuLy.getTrangthai());
        return ResponseEntity.ok().body(donDatBanService.save(id));
    }

    @PutMapping("/duyet/{id}")
    public ResponseEntity<DonDatBan> DuyetDon (@PathVariable("id")Integer id){
        DonDatBan don = donDatBanService.DuyetDon(id);
        return ResponseEntity.ok(don);
    }
    @PutMapping("/hoan-thanh/{id}")
    public ResponseEntity<DonDatBan> HoanThanh (@PathVariable("id")Integer id){
        DonDatBan don = donDatBanService.HoanThanh(id);
        return ResponseEntity.ok(don);
    }
    @PutMapping("/huy/{id}")
    public ResponseEntity<DonDatBan> HuyDon (@PathVariable("id")Integer id){
        DonDatBan don = donDatBanService.HuyDon(id);
        return ResponseEntity.ok(don);
    }
    @PostMapping("/khachhang/datban")
    public ResponseEntity<DonDatBan> khachDatBan(@RequestBody DatBanDTO datBanDTO){
        System.out.println(datBanDTO);

        return ResponseEntity.ok().body(donDatBanService.UserDatBan(datBanDTO));


    }


    @GetMapping("/donmoi")
    public ResponseEntity<List<DonDatBan>> getDonmoi(){
        return ResponseEntity.ok().body(donDatBanService.getDuyetDonDatBan());
    }

    @GetMapping("/don/{username}")
    public ResponseEntity<List<DonDatBan>> getDon(@PathVariable("username")String username){
        return ResponseEntity.ok().body(donDatBanService.getDonByKhach(username));
    }

    @GetMapping("/tongdondatban")
    public ResponseEntity<Integer> getTongDonDatBan(){
        Integer dem = donDatBanRepository.getDonDatBanCount();
        return ResponseEntity.ok().body(dem);
    }
    @PostMapping("/request")
    public ResponseEntity<String> requestBooking(@RequestBody DatBanDTO booking) {
        String token = UUID.randomUUID().toString();
        booking.setToken(token);

        pendingBookings.put(token, booking);
        System.out.println("pending: "+pendingBookings);
        emailService.sendConfirmationEmail(booking.getEmail(), token, booking);

        scheduler.schedule(() -> {
            pendingBookings.remove(token);
            System.out.println("Token expired and removed: " + token);
        }, 15, TimeUnit.MINUTES);
        return ResponseEntity.ok("✅ Reservation confirmation email has been sent.");
    }


    @GetMapping("/confirm")
    public ResponseEntity<?> confirmBooking(@RequestParam String token) {
        System.out.println("pending :"+pendingBookings);
        DatBanDTO booking = pendingBookings.get(token);
        System.out.println("booking :"+booking);
        if (booking == null) {
            return ResponseEntity.badRequest().body("❌Invalid or expired token.");
        }
        //ResponseEntity<?> dons = donDatBanService.getDonDatBanByToken(token);

        booking.setTrangThai(DatBanTrangThai.DangXuLy.getTrangthai());
        donDatBanService.UserDatBan(booking);


        pendingBookings.remove(token); // Xóa tạm sau khi đã xác nhận

        return ResponseEntity.ok("Your reservation has been confirmed!");

    }

    @GetMapping("/getDonByToken")
    public ResponseEntity<?> getDonByToken(@RequestParam String token){
        System.out.println("pending :"+token);
        return donDatBanService.getDonDatBanByToken(token);
    }
}
