package nha_hang.demo.Service.Order;

import nha_hang.demo.DTO.OrderDTO;
import nha_hang.demo.Model.Order;

public interface OrderService {
    public Order createOrder(OrderDTO orderDTO);
}
