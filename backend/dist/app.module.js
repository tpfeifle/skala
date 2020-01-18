"use strict";
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const scale_module_1 = require("./scale/scale.module");
const scale_measurement_entity_1 = require("./scale/scale-measurement.entity");
const typeorm_1 = require("@nestjs/typeorm");
const order_module_1 = require("./order/order.module");
const order_entity_1 = require("./order/order.entity");
const delivery_notice_module_1 = require("./delivery-notice/delivery-notice.module");
const match_weights_module_1 = require("./match-weights/match-weights.module");
const truck_weight_entity_1 = require("./match-weights/truck-weight.entity");
let AppModule = class AppModule {};
AppModule = __decorate(
  [
    common_1.Module({
      imports: [
        typeorm_1.TypeOrmModule.forRoot({
          type: "mysql",
          host: "127.0.0.1",
          port: 3306,
          username: "root",
          password: process.env["DB_TECHCHALLENGE_PASSWORD"],
          database: "techchallenge",
          entities: [
            order_entity_1.Order,
            scale_measurement_entity_1.ScaleMeasurement,
            truck_weight_entity_1.TruckWeight
          ],
          synchronize: true
        }),
        scale_module_1.ScaleModule,
        order_module_1.OrderModule,
        delivery_notice_module_1.DeliveryNoticeModule,
        match_weights_module_1.MatchWeightsModule
      ],
      controllers: [app_controller_1.AppController],
      providers: [app_service_1.AppService]
    })
  ],
  AppModule
);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
