import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Param,
  Res
} from "@nestjs/common";
import { DeliveryNoticeService } from "./delivery-notice.service";
import { FileInterceptor, MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as fs from "fs";

export const editFileName = (req, file, callback) => {
  callback(null, "newname.jpeg");
  /*const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);*/
};

@Controller("delivery-notice")
export class DeliveryNoticeController {
  constructor(private readonly deliveryNoticeService: DeliveryNoticeService) {}

  /*@Post()
    async create(@Param('sheetId') sheetId: number, @Body() chart: Chart): Promise<Chart> {
        return await this.chartService.create(sheetId, chart);
    }*/

  @Get("/:orderId")
  get(@Param() params: any, @Res() res) {
    return res.sendFile(
      `/Users/tim/WebstormProjects/smartcrane/backend/uploads/${params["orderId"]}.jpeg`
    );
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async uploadedFile(@UploadedFile() file, @Body() data: any) {
    console.log(file);
    const directory = "./uploads";
    const writeStream = fs.createWriteStream(
      `${directory}/${data["orderId"]}.jpeg`
    );
    writeStream.write(file.buffer);
    writeStream.end();
    return 0;
  }

  /*@Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        console.log(file);
    }*/
}
