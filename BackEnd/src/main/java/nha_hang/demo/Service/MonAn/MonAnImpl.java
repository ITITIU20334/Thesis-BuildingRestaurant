package nha_hang.demo.Service.MonAn;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import nha_hang.demo.DTO.MonAnDTO;
import nha_hang.demo.Model.DanhMuc;
import nha_hang.demo.Model.MonAn;
import nha_hang.demo.Repository.DanhMucRepository;
import nha_hang.demo.Repository.MonAnRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.rmi.RemoteException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class MonAnImpl implements MonAnService {
    private static final  String UPLOAD_DIR="src/main/resources/static/img";
    private MonAnRepository monAnRepository;
    private final DanhMucRepository danhMucRepository;

    @Override
    public List<MonAn> getAll() {
        return monAnRepository.findAll();
    }

    @Override
    public List<MonAn> getMonAnNgauNhien() {
        return monAnRepository.getMonAnNgauNhien();
    }

    @Override
    public Optional<MonAn> findById(Integer integer) {
        return monAnRepository.findById(integer);
    }

    @Override
    public List<MonAn> findMonAn() {
        return monAnRepository.findAllActive();
    }

    @Override
    public void xoaMon(Integer id) {
         monAnRepository.softDeleteById(id);
    }

    @Override
    public void deleteById(Integer integer) {
        monAnRepository.deleteById(integer);
    }

    @Override
    public MonAn save(MonAnDTO monAnDTO) {
        MonAn monAn = new MonAn();
        monAn.setTenMon(monAnDTO.getTenMon());
        monAn.setGiaTien(monAnDTO.getGiaTien());
        monAn.setHinhAnh(monAnDTO.getHinhAnh());
        monAn.setLoaiMonAn(danhMucRepository.findById(monAnDTO.getLoaiMonAn()).get());
        monAn.setMoTa(monAnDTO.getMoTa());
        return monAnRepository.save(monAn);
    }

    @Override
    public MonAn UpdateMon(Integer id, MonAnDTO monAnDTO) {
        MonAn monAn=monAnRepository.findById(id).orElseThrow(
                ()-> new EntityNotFoundException("Khong ton tai Mon an nay")
        );
        DanhMuc danhMuc = danhMucRepository.findById(monAnDTO.getLoaiMonAn()
        ).orElseThrow(
                ()->new EntityNotFoundException("Khong ton tai danh muc nay")
        );
        monAn.setTenMon(monAnDTO.getTenMon());
        monAn.setGiaTien(monAnDTO.getGiaTien());
        monAn.setHinhAnh(monAnDTO.getHinhAnh());
        monAn.setLoaiMonAn(danhMuc);
        monAnRepository.save(monAn);
        return monAn;

    }

    @Override
    public String saveFile(MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename();

        Path uploadPath = Path.of(UPLOAD_DIR).toAbsolutePath().normalize();
        if(!Files.exists(uploadPath)){
            try {
                Files.createDirectories(uploadPath);
            }catch (Exception e){
                throw new RemoteException("tao thu muc that bai");

            }
        }

        Path targetLocation = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(),targetLocation, StandardCopyOption.REPLACE_EXISTING);
        return filename;
    }

    @Override
    public List<MonAn> findByLoai(Integer integer) {
        return monAnRepository.findMonAnByLoai(integer);
    }

    @Override
    public List<MonAn> timKiemMonAn(String tim) {
        return monAnRepository.timMonAn("%" + tim + "%");
    }

}
