import { Module } from "@nestjs/common";
import { DeliveryNoticeController } from "./delivery-notice.controller";
import { DeliveryNoticeService } from "./delivery-notice.service";

@Module({
  controllers: [DeliveryNoticeController],
  providers: [DeliveryNoticeService]
})
export class DeliveryNoticeModule {}
