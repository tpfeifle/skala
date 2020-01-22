import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("Skala API")
    .setVersion("1.0")
    .addTag("Order")
    .addTag("Measurement")
    .addTag("Delivery Note")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  app.enableCors();
  await app.listen(3000, "0.0.0.0");
}
bootstrap();
