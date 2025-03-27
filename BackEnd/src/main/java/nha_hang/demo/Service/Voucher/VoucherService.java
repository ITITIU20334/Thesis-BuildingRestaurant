package nha_hang.demo.Service.Voucher;

import nha_hang.demo.Model.Voucher;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface VoucherService {
    List<Voucher> getALL();

    Optional<Voucher> getVoucherById(Integer id);

    void deleteById(Integer id);

    Voucher save(Voucher voucher);

    Voucher updateVoucher(Integer id,Voucher voucher);
}
