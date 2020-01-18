import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { MatchWeightsService } from "./match-weights.service";
import { Order } from "../order/order.entity";
import { TruckWeight } from "./truck-weight.entity";

@Controller("match-weights")
export class MatchWeightsController {
  constructor(private readonly matchWeightsService: MatchWeightsService) {}

  @Get()
  async getList() {
    return await this.matchWeightsService.list();
  }

  @Delete("/:weightId")
  async deleteWeight(@Param() weightId: number) {
    return await this.matchWeightsService.delete(weightId);
  }

  @Put()
  async update(@Body() truckWeight: TruckWeight): Promise<TruckWeight> {
    console.log(truckWeight);
    return await this.matchWeightsService.update(truckWeight);
  }
}
