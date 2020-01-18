import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async create(order: Order): Promise<Order> {
    if (!order.timestamp) {
      order.timestamp = new Date();
    }
    let newOrder = new Order(
      null,
      order.total_weight,
      order.cost,
      order.timestamp,
      order.title,
      order.status
    );
    // await this.orderRepository.query(`TRUNCATE TABLE \`Order\`;`);
    return await this.orderRepository.save(newOrder);
  }

  async update(order: Order): Promise<Order> {
    await this.orderRepository.update({ id: order.id }, order);
    return await this.orderRepository.findOne(order.id);
  }

  async list(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async deleteOrders() {
    return await this.orderRepository.delete({});
  }
}
