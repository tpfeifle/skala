import { Controller, Get, Post, Body, Put, Delete } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Order } from "./order.entity";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async listOrders() {
    return await this.orderService.list();
  }

  @Put()
  async update(@Body() order: Order): Promise<Order> {
    console.log(order);
    return await this.orderService.update(order);
  }

  @Post()
  async createOrder(@Body() order: Order) {
    return await this.orderService.create(order);
  }

  @Delete()
  async delete() {
    await this.orderService.deleteOrders();
  }
}
