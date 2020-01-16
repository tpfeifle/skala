import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { DeliveryNoticeService } from "./delivery-notice.service";
import { FileInterceptor, MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";

MulterModule.register({
  dest: "/Users/tim/WebstormProjects/smartcrane/backend/uploads"
});

export const editFileName = (req, file, callback) => {
  callback(null, "newname");
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

  @Get()
  get() {
    return "hello";
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "/Users/tim/WebstormProjects/smartcrane/backend/uploads"
        // filename: editFileName,
      })
    })
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename
    };
    console.log(response);
    return response;
  }

  /*@Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        console.log(file);
    }*/
}
