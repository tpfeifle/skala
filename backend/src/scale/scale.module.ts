import { Module } from "@nestjs/common";
import { ScaleController } from "./scale.controller";
import { ScaleService } from "./scale.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScaleMeasurement } from "./scale-measurement.entity";
import { Order } from "src/order/order.entity";
import { TruckWeight } from "../match-weights/truck-weight.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ScaleMeasurement, Order, TruckWeight])],
  controllers: [ScaleController],
  providers: [ScaleService]
})
export class ScaleModule {}
