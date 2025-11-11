import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

interface SleeperUserResponse {
  user_id: string;
  username: string;
  display_name: string;
  avatar?: string;
  metadata?: {
    team_name?: string;
  };
}

@Injectable()
export class SleeperService {
  private readonly SLEEPER_API_BASE = "https://api.sleeper.app/v1";


  async getUserByUsername(username: string): Promise<SleeperUserResponse> {
    try {
      const response = await fetch(`${this.SLEEPER_API_BASE}/user/${username}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new HttpException(
            `Sleeper user "${username}" not found`,
            HttpStatus.NOT_FOUND
          );
        }
        throw new HttpException(
          `Sleeper API error: ${response.statusText}`,
          response.status
        );
      }

      const userData = await response.json();

      if (!userData || !userData.user_id) {
        throw new HttpException(
          "Invalid response from Sleeper API",
          HttpStatus.BAD_GATEWAY
        );
      }

      return userData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        `Failed to connect to Sleeper API: ${error instanceof Error ? error.message : "Unknown error"}`,
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
}

