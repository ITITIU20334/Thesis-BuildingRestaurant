package nha_hang.demo.Service.HoaDon;

import com.itextpdf.io.source.ByteArrayOutputStream;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import nha_hang.demo.DTO.HoaDonDTO;
import nha_hang.demo.DTO.ThanhToanDTO;
import nha_hang.demo.Enum.TrangThaiHoaDon;
import nha_hang.demo.Model.*;
import nha_hang.demo.Repository.ChiTietHoaDonRepository;
import nha_hang.demo.Repository.HoaDonRepository;
import nha_hang.demo.Repository.MonAnRepository;
import nha_hang.demo.Repository.ThanhToanRepository;
import nha_hang.demo.Service.Ban.BanService;
import nha_hang.demo.Service.DonDatBan.DonDatBanService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class HoaDonImpl implements HoaDonService {
    private final MonAnRepository monAnRepository;
    private final ChiTietHoaDonRepository chiTietHoaDonRepository;
    private final DonDatBanService donDatBanService;
    private final BanService banService;
    private final ThanhToanRepository thanhToanRepository;
    private HoaDonRepository hoaDonRepository;
    @Override
    public List<HoaDon> getAll() {
        return hoaDonRepository.getAllHoaDonAn();
    }

    @Override
    public HoaDon save(HoaDon hoaDon) {
        return hoaDonRepository.save(hoaDon);
    }

    @Override
    public List<HoaDon> getChiTietHD(Integer idBan) {
        return hoaDonRepository.ChiTietHoaDon(idBan);
    }

    @Override
    public HoaDon hoanThanh(Integer idHD, ThanhToanDTO dto) {
        HoaDon hd = hoaDonRepository.findById(idHD).orElseThrow(
                ()->new EntityNotFoundException("Not Found"+ idHD)
        );
        if(Objects.equals(hd.getTrangThai(), TrangThaiHoaDon.KhoiTao.getTrangthai())){
            ThanhToan tt = new ThanhToan();
            hd.setTrangThai(TrangThaiHoaDon.HoanThanh.getTrangthai());
            tt.setPhuongThucTT(dto.getPhuongThucTT());
            tt.setSoTien(hd.getTongTien());
            tt.setHoaDon(hd);
            thanhToanRepository.save(tt);
        }
        hoaDonRepository.save(hd);
        return hd;

    }

    @Override
    public HoaDon TaoHoaDon(HoaDonDTO hoaDonDTO) {
        HoaDon hd = new HoaDon();
        hd.setNgayTao(hoaDonDTO.getNgayTao());
        hd.setTongTien(hoaDonDTO.getTongTien());
        hd.setIdBan(hoaDonDTO.getIdBan());
        hd.setIdKH(hoaDonDTO.getKhachHang());
        hd.setHoTen(hoaDonDTO.getHoTen());
        hd.setTenNhanVien(hoaDonDTO.getUsername());
        hd.setTrangThai(TrangThaiHoaDon.KhoiTao.getTrangthai());
        HoaDon saveHoaDon = hoaDonRepository.save(hd);
        List<ChiTietHoaDon> chiTietHoaDons = hoaDonDTO.getChiTietHoaDons().stream()
                .map(dto->{
                    ChiTietHoaDon chiTietHoaDon = new ChiTietHoaDon();
                    Optional<MonAn> monAn = monAnRepository.findById(dto.getIdMonAn().getId_mon());
                    if(monAn.isPresent()){
                        chiTietHoaDon.setIdMonAn(monAn.get());
                    }
                    else {
                        throw new EntityNotFoundException("Food with ID" + dto.getIdMonAn() + "not found");
                    }
                    chiTietHoaDon.setSoLuong(dto.getSoLuong());
                    chiTietHoaDon.setThanhTien(dto.getThanhTien());
                    chiTietHoaDon.setIdHD(hd);
                    return chiTietHoaDonRepository.save(chiTietHoaDon);
                        }
                ).collect(Collectors.toList());
        saveHoaDon.setChiTietHoaDons(chiTietHoaDons);
        return hoaDonRepository.save(saveHoaDon);
    }
    @Override
    public ResponseEntity<byte[]> inHoaDon(HoaDon hoaDon) {
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdfDocument = new PdfDocument(writer);
            Document document = new Document(pdfDocument);

            String fontPath = "src/main/resources/fonts/Roboto-Regular.ttf";
            PdfFont font = PdfFontFactory.createFont(fontPath, PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED);
            document.setFont(font);

            // Tiêu đề
            Paragraph title = new Paragraph("Bill")
                    .setFont(font)
                    .setFontSize(24)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(30);
            document.add(title);

            // Thông tin hóa đơn
            document.add(new Paragraph("Bill code: " + hoaDon.getIdHD()).setFont(font).setMarginBottom(5));
            document.add(new Paragraph("Customer: " + (hoaDon.getIdKH() != null ? hoaDon.getIdKH().getHoTen() : "Khách lẻ")).setFont(font).setMarginBottom(5));
            document.add(new Paragraph("Date:" + hoaDon.getNgayTao()).setFont(font).setMarginBottom(5));
            document.add(new Paragraph("Staff:" + hoaDon.getTenNhanVien()).setFont(font).setMarginBottom(5));
            document.add(new Paragraph("Table:" + hoaDon.getIdBan().getTenBan()).setFont(font).setMarginBottom(20));

            // Bảng sản phẩm
            float[] columnWidths = {1, 4, 2, 2};
            Table table = new Table(columnWidths);
            table.setWidth(UnitValue.createPercentValue(100));

            // Header
            table.addHeaderCell(new Cell().add(new Paragraph("No").setFont(font).setBold().setBackgroundColor(ColorConstants.LIGHT_GRAY)));
            table.addHeaderCell(new Cell().add(new Paragraph("Food Name").setFont(font).setBold().setBackgroundColor(ColorConstants.LIGHT_GRAY)));
            table.addHeaderCell(new Cell().add(new Paragraph("Quantity").setFont(font).setBold().setBackgroundColor(ColorConstants.LIGHT_GRAY)));
            table.addHeaderCell(new Cell().add(new Paragraph("Price").setFont(font).setBold().setBackgroundColor(ColorConstants.LIGHT_GRAY)));

            int stt = 1;
            for (ChiTietHoaDon chiTiet : hoaDon.getChiTietHoaDons()) {
                table.addCell(new Cell().add(new Paragraph(String.valueOf(stt++)).setFont(font).setTextAlignment(TextAlignment.CENTER)));
                table.addCell(new Cell().add(new Paragraph(chiTiet.getIdMonAn().getTenMon()).setFont(font)));
                table.addCell(new Cell().add(new Paragraph(String.valueOf(chiTiet.getSoLuong())).setFont(font).setTextAlignment(TextAlignment.RIGHT)));
                table.addCell(new Cell().add(new Paragraph(String.valueOf(chiTiet.getThanhTien()) + " VND").setFont(font).setTextAlignment(TextAlignment.RIGHT)));
            }

            // Tổng cộng
            table.addCell(new Cell(1, 3).add(new Paragraph("Total Amount").setFont(font).setBold())
                    .setTextAlignment(TextAlignment.RIGHT)
                    .setBackgroundColor(ColorConstants.LIGHT_GRAY)
                    .setPadding(5));
            table.addCell(new Cell().add(new Paragraph(String.valueOf(hoaDon.getTongTien()) + " VND")
                    .setFont(font)
                    .setBold()
                    .setTextAlignment(TextAlignment.RIGHT)
                    .setPadding(5)));

            document.add(table);



            document.close();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "hoa_don_" + hoaDon.getIdHD() + ".pdf");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(outputStream.toByteArray());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }


    @Override
    public List<Integer> BaoCaoDoanhThuThang() {
        return ResponseEntity.ok().body(hoaDonRepository.BaoCaoDoanhThuThang()).getBody();
    }

    @Override
    public List<HoaDon> getHoaDonByKhach(String username) {
        return hoaDonRepository.getHoaDonByKhach(username);
    }

    @Override
    public List<HoaDon> getChiTietHDByKhach(Integer idHD) {
        return hoaDonRepository.findHoaDonByIdHD(idHD);
    }


    // Hàm in báo cáo
    @Override
    public ResponseEntity<byte[]> inBaoCao(String ngayTao) {
        try {
            NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));
            LocalDate localDate = LocalDate.parse(ngayTao);
            LocalDateTime localDateTime = localDate.atTime(7, 0);
            Date date = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
            List<HoaDon> hoaDons = hoaDonRepository.getHoaDonByNgayTao(date);
            int totalInvoices = hoaDons.size();
            double totalRevenue = hoaDons.stream().mapToDouble(HoaDon::getTongTien).sum();
            String tongCong = currencyFormat.format(totalRevenue);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdfDocument = new PdfDocument(writer);
            Document document = new Document(pdfDocument);

            // Cài đặt font
            String fontPath = "src/main/resources/fonts/Roboto-Regular.ttf";
            PdfFont font = PdfFontFactory.createFont(fontPath, PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED);
            document.setFont(font);

            // Tiêu đề báo cáo
            Paragraph title = new Paragraph("BÁO CÁO HÓA ĐƠN NGÀY " + ngayTao.toString())
                    .setFont(font)
                    .setFontSize(24)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(30);
            document.add(title);

            // Bảng tổng hợp các hóa đơn
            float[] columnWidths = {1, 3, 2, 2, 2};
            Table table = new Table(columnWidths);
            table.setWidth(UnitValue.createPercentValue(100));

            // Header cho bảng
            table.addHeaderCell(new Cell().add(new Paragraph("STT").setFont(font).setBold().setBackgroundColor(ColorConstants.LIGHT_GRAY)));
            table.addHeaderCell(new Cell().add(new Paragraph("Mã Hóa Đơn").setFont(font).setBold().setBackgroundColor(ColorConstants.LIGHT_GRAY)));
            table.addHeaderCell(new Cell().add(new Paragraph("Khách Hàng").setFont(font).setBold().setBackgroundColor(ColorConstants.LIGHT_GRAY)));
            table.addHeaderCell(new Cell().add(new Paragraph("Tổng Tiền").setFont(font).setBold().setBackgroundColor(ColorConstants.LIGHT_GRAY)));
            table.addHeaderCell(new Cell().add(new Paragraph("Số bàn").setFont(font).setBold().setBackgroundColor(ColorConstants.LIGHT_GRAY)));

            // Thêm từng hóa đơn vào bảng
            int stt = 1;
            for (HoaDon hoaDon : hoaDons) {
                String formattedAmount = currencyFormat.format(hoaDon.getTongTien());
                table.addCell(new Cell().add(new Paragraph(String.valueOf(stt++)).setFont(font).setTextAlignment(TextAlignment.CENTER)));
                table.addCell(new Cell().add(new Paragraph(String.valueOf(hoaDon.getIdHD())).setFont(font)));
                table.addCell(new Cell().add(new Paragraph(hoaDon.getIdKH() != null ? hoaDon.getIdKH().getHoTen() : "Khách lẻ").setFont(font)));
                table.addCell(new Cell().add(new Paragraph(formattedAmount).setFont(font).setTextAlignment(TextAlignment.RIGHT)));
                table.addCell(new Cell().add(new Paragraph(hoaDon.getIdBan().getTenBan()).setFont(font).setTextAlignment(TextAlignment.CENTER)));
            }

            document.add(table);

            document.add(new Paragraph("\n"));
            document.add(new Paragraph("Tổng số hóa đơn trong ngày: " + totalInvoices).setFont(font).setBold());
            document.add(new Paragraph("Tổng doanh thu trong ngày: " + tongCong ).setFont(font).setBold());
            document.close();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "bao_cao_" + ngayTao.toString() + ".pdf");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(outputStream.toByteArray());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }



}
