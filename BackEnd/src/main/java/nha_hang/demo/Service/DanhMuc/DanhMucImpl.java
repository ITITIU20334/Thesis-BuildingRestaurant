package nha_hang.demo.Service.DanhMuc;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import nha_hang.demo.Model.DanhMuc;
import nha_hang.demo.Repository.DanhMucRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class DanhMucImpl implements DanhMucService{
    private DanhMucRepository danhMucRepository;

    @Override
    public List<DanhMuc> getAll() {
        return danhMucRepository.findAll();
    }

    @Override
    public DanhMuc save(DanhMuc danhMuc) {
        return danhMucRepository.save(danhMuc);
    }

    @Override
    public Optional<DanhMuc> findById(Integer integer) {
        return danhMucRepository.findById(integer);
    }

    @Override
    public void deleteById(Integer integer) {

        danhMucRepository.deleteById(integer);
    }

    @Override
    public DanhMuc updateDanhMuc(Integer idDanhMuc, DanhMuc danhMuc) {
        DanhMuc danhMuc1 = danhMucRepository.findById(idDanhMuc).orElseThrow(
                ()->new EntityNotFoundException("Category with id does not exist" + idDanhMuc)
        );
        danhMuc1.setTenLoai(danhMuc.getTenLoai());
        danhMucRepository.save(danhMuc1);
        return danhMuc1;
    }
}
