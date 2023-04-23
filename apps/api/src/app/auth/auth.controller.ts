import {Controller, Post, Req} from "@nestjs/common";

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  async login(@Req() req) {

  }
}
