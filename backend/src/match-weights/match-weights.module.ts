import { Module } from "@nestjs/common";
import { MatchWeightsService } from "./match-weights.service";
import { MatchWeightsController } from "./match-weights.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TruckWeight } from "./truck-weight.entity";
import { Order } from "../order/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TruckWeight, Order])],
  providers: [MatchWeightsService],
  controllers: [MatchWeightsController]
})
export class MatchWeightsModule {}
