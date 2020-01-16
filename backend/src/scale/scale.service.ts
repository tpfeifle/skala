import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ScaleMeasurement } from "./scale-measurement.entity";
import {
  Repository,
  Between,
  LessThan,
  MoreThan,
  getConnection
} from "typeorm";
import { Order } from "src/order/order.entity";

@Injectable()
export class ScaleService {
  constructor(
    @InjectRepository(ScaleMeasurement)
    private readonly scaleMeasurementRepository: Repository<ScaleMeasurement>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async saveMeasurement(
    scaleId: number,
    weight: number
  ): Promise<ScaleMeasurement> {
    let newScaleMeasurment = new ScaleMeasurement(
      null,
      scaleId,
      "MEASUREMENT",
      weight,
      new Date()
    );
    return await this.scaleMeasurementRepository.save(newScaleMeasurment);
  }

  async listEvents(): Promise<ScaleMeasurement[]> {
    return await this.scaleMeasurementRepository.find();
  }

  async deleteEvents() {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(ScaleMeasurement)
      .execute();
    return;
  }

  async saveScaleStatus(
    scaleId: number,
    status: string
  ): Promise<ScaleMeasurement> {
    let newScaleMeasurment = new ScaleMeasurement(
      null,
      scaleId,
      status,
      0,
      new Date()
    );
    const savedScaleMeasurement = await this.scaleMeasurementRepository.save(
      newScaleMeasurment
    );

    if (status == "OFF") {
      // Order measurement finished --> calculate order weight
      const timestampStatusOn = await this.scaleMeasurementRepository.findOne({
        timestamp: LessThan(savedScaleMeasurement.timestamp),
        eventType: "ON"
      });
      if (timestampStatusOn) {
        // TODO: this should always be true
        const measurementsOfOrder = await this.scaleMeasurementRepository.find({
          timestamp: Between(
            timestampStatusOn.timestamp,
            savedScaleMeasurement.timestamp
          )
        });

        this.measurementsToOrder(
          measurementsOfOrder.map(measurement => measurement.weight)
        );
        console.log(measurementsOfOrder);
      }
    }

    return savedScaleMeasurement;
  }

  async measurementsToOrder(weights: number[]) {
    let measuredWeights = [];
    let currentMax = 0;
    for (let i = 0; i < weights.length; i++) {
      if (weights[i] == 0) {
        if (currentMax != 0) {
          measuredWeights.push(currentMax);
        }
        currentMax = 0;
      }
      if (weights[i] > currentMax) {
        currentMax = weights[i];
      }
    }

    const totalDeliveryWeight = measuredWeights.reduce(
      (acc, weight) => weight + acc,
      0
    );
    const matchingOrders = await this.orderRepository.find({
      total_weight: Between(totalDeliveryWeight - 5, totalDeliveryWeight + 5)
    });
    console.log(`Measured-Weights:\r\n`, measuredWeights);
    console.log(`Matching-Orders:\r\n`, matchingOrders);
  }
}
