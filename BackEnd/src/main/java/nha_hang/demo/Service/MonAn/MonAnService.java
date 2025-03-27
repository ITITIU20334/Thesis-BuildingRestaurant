package nha_hang.demo.Service.MonAn;

import nha_hang.demo.DTO.MonAnDTO;
import nha_hang.demo.Model.MonAn;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface MonAnService {
    List<MonAn> getAll();
    List<MonAn> getMonAnNgauNhien();
    Optional<MonAn> findById(Integer integer);

    List<MonAn> findMonAn();

    public void xoaMon(Integer id);

    void deleteById(Integer integer);

    MonAn save(MonAnDTO monAnDTO);

    MonAn UpdateMon(Integer id,MonAnDTO monAnDTO);

    String saveFile(MultipartFile file) throws IOException;

    List <MonAn> findByLoai(Integer integer);

    List<MonAn> timKiemMonAn(String tim);


}
