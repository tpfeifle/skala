import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ScaleMeasurement {
  constructor(
    id: number,
    scaleId: number,
    eventType: string,
    weight: number,
    timestamp: Date
  ) {
    this.id = id;
    this.scaleId = scaleId;
    this.eventType = eventType;
    this.weight = weight;
    this.timestamp = timestamp;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scaleId: number;

  @Column()
  eventType: string;

  @Column({ type: "double" })
  weight: number;

  @Column()
  timestamp: Date;
}
