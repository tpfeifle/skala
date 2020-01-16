import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
  constructor(
    id: number,
    total_weight: number,
    cost: number,
    timestamp: Date,
    title: string,
    status: string
  ) {
    this.id = id;
    this.total_weight = total_weight;
    this.cost = cost;
    this.timestamp = timestamp;
    this.title = title;
    this.status = status;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "double" })
  total_weight: number;

  @Column({ type: "double" })
  cost: number;

  @Column()
  title: string;

  @Column()
  timestamp: Date;

  @Column()
  status: string;
}
