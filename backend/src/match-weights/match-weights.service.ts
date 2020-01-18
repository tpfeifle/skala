import { Injectable } from "@nestjs/common";
import { Order } from "../order/order.entity";
import { TruckWeight } from "./truck-weight.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MatchWeightsService {
  constructor(
    @InjectRepository(TruckWeight)
    private readonly truckWeightRepository: Repository<TruckWeight>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  /*async create(order: Order): Promise<Order> {
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
    }*/

  async update(truckWeight: TruckWeight) {
    console.log(truckWeight);
    // const res = await this.truckWeightRepository.update({id: truckWeight.id}, truckWeight);
    // console.log(res);
    // await this.truckWeightRepository.findOne(truckWeight.id);
    await this.orderRepository.update(truckWeight.order.id, {
      total_weight: truckWeight.total_weight,
      status: "WEIGHTED"
    });
    await this.truckWeightRepository.delete(truckWeight.id);
    return null;
  }

  async delete(truckWeightId: number) {
    await this.truckWeightRepository.delete(truckWeightId);
  }

  async list(): Promise<TruckWeight[]> {
    return this.truckWeightRepository.find({ order: null });
  }
}
