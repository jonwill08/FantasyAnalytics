import { Module } from "@nestjs/common";
import { SleeperController } from "./app.controller";
import { SleeperService } from "./sleeper.service";

@Module({
  controllers: [SleeperController],
  providers: [SleeperService],
})
export class AppModule {}