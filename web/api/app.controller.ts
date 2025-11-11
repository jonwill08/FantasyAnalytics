import { Controller, Post, Body } from "@nestjs/common";
import { SleeperService } from "./sleeper.service";

@Controller('v1/sleeper')
export class SleeperController {
  constructor(private readonly sleeperService: SleeperService) {}

  @Post('link')
  async linkSleeperAccount(@Body() body: { userId: string; sleeperUsername: string }) {
    const { userId, sleeperUsername } = body;

    // Fetch user data from Sleeper API
    const sleeperUser = await this.sleeperService.getUserByUsername(sleeperUsername);

    // TODO: Save sleeperUser data to database using Prisma
    // You'll need to create/update the SleeperUserInfo record with:
    // - userId (from Clerk)
    // - sleeperId (from sleeperUser.user_id)
    // - username (from sleeperUser.username)

    return {
      success: true,
      message: "Sleeper account linked successfully",
      sleeperUser: {
        sleeperId: sleeperUser.user_id,
        username: sleeperUser.username,
        displayName: sleeperUser.display_name,
      },
    };
  }
}
