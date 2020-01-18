import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne
} from "typeorm";
import { Order } from "../order/order.entity";

@Entity()
export class TruckWeight {
  constructor(id: number, total_weight: number, order: Order, timestamp: Date) {
    this.id = id;
    this.total_weight = total_weight;
    this.order = order;
    this.timestamp = timestamp;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "double" })
  total_weight: number;

  @OneToOne(type => Order, { eager: true })
  @JoinColumn()
  order: Order;

  @Column()
  timestamp: Date;
}
