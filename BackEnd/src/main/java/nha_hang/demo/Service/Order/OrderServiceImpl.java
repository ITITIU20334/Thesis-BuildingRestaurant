package nha_hang.demo.Service.Order;

import nha_hang.demo.DTO.OrderDTO;
import nha_hang.demo.Enum.PaymentStatus;
import nha_hang.demo.Model.Order;
import nha_hang.demo.Repository.OrderRepository;

public class OrderServiceImpl implements OrderService {
    private OrderRepository orderRepository;
    @Override
    public Order createOrder(OrderDTO orderDTO) {
        Order order = new Order();
        order.setTxnRef(orderDTO.getTxnRef());
        order.setPaymentAmount(orderDTO.getPaymentAmount());
        order.setPaymentMethod(orderDTO.getPaymentMethod());
        order.setPaymentMethod(PaymentStatus.PENDING.toString());

        return  orderRepository.save(order);
    }
}
