import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getRoot(): { message: string } {
    return { message: "Fantasy Analytics API is running" };
  }
}


