import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ScaleModule } from "./scale/scale.module";
import { ScaleMeasurement } from "./scale/scale-measurement.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderModule } from "./order/order.module";
import { Order } from "./order/order.entity";
import { DeliveryNoticeModule } from "./delivery-notice/delivery-notice.module";
export interface ProcessEnv {
  [key: string]: string | undefined;
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "35.246.255.229",
      port: 3306,
      username: "root",
      password: process.env["DB_TECHCHALLENGE_PASSWORD"],
      database: "techchallenge",
      entities: [Order, ScaleMeasurement],
      synchronize: true
    }),
    ScaleModule,
    OrderModule,
    DeliveryNoticeModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
