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
import { TruckWeight } from "../match-weights/truck-weight.entity";

@Injectable()
export class ScaleService {
  constructor(
    @InjectRepository(ScaleMeasurement)
    private readonly scaleMeasurementRepository: Repository<ScaleMeasurement>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(TruckWeight)
    private readonly truckRepository: Repository<TruckWeight>
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
      const timestampStatusOn = await this.scaleMeasurementRepository.find({
        timestamp: LessThan(savedScaleMeasurement.timestamp),
        eventType: "ON"
      });
      if (timestampStatusOn) {
        // TODO: this should always be true
        const measurementsOfOrder = await this.scaleMeasurementRepository.find({
          timestamp: Between(
            timestampStatusOn[timestampStatusOn.length - 1].timestamp,
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
    const measuredWeights = [];
    let currentMax = 0;
    for (let i = 0; i < weights.length; i++) {
      if (weights[i] < 0.1) {
        if (currentMax !== 0) {
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
    if (matchingOrders.length === 1) {
      matchingOrders[0].status = "WEIGHTED";
      await this.orderRepository.update(
        matchingOrders[0].id,
        matchingOrders[0]
      );

      /*const newTruckWeight = new TruckWeight(
                null,
                totalDeliveryWeight,
                matchingOrders[0],
                new Date(),
            );
            await this.truckRepository.save(newTruckWeight);*/
    } else {
      const newTruckWeight = new TruckWeight(
        null,
        totalDeliveryWeight,
        null,
        new Date()
      );
      await this.truckRepository.save(newTruckWeight);
    }
    console.log(`Measured-Weights:\r\n`, measuredWeights);
    console.log(`Matching-Orders:\r\n`, matchingOrders);
  }
}
