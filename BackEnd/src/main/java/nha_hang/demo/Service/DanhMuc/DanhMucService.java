package nha_hang.demo.Service.DanhMuc;
import nha_hang.demo.Model.DanhMuc;

import java.util.List;
import java.util.Optional;

public interface DanhMucService {
    List<DanhMuc> getAll();

    DanhMuc save(DanhMuc danhMuc);

    Optional<DanhMuc> findById(Integer integer);

    void deleteById(Integer integer);

    DanhMuc updateDanhMuc(Integer idDanhMuc, DanhMuc danhMuc);
}
