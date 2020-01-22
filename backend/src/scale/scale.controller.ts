import { Controller, Post, Param, Get, Body, Delete } from "@nestjs/common";
import { ScaleService } from "./scale.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Measurement")
@Controller("scale")
export class ScaleController {
  constructor(private readonly scaleService: ScaleService) {}

  @Get()
  test() {
    return "hello dummy";
  }

  @Get("/list")
  async listEvents() {
    return await this.scaleService.listEvents();
  }

  @Delete()
  async deleteEvents() {
    return await this.scaleService.deleteEvents();
  }

  @Post()
  async receiveMeasurement(@Body() data: any) {
    console.log(data);
    return await this.scaleService.saveMeasurement(
      data["scaleId"],
      data["weight"]
    );
  }

  @Post("/button")
  async updateStatus(@Body() data: any) {
    console.log(data);
    return await this.scaleService.saveScaleStatus(
      data["scaleId"],
      data["status"]
    );
  }
}
