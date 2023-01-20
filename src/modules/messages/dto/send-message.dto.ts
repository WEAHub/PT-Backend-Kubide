import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

class sendMessageDTO {
  
	@IsNotEmpty()
	@IsString()
  @ApiProperty({ description: 'Email of the receiver user', example: 'test@test.com' })
  toUser: string;

	@IsNotEmpty()
	@IsString()
  @ApiProperty({ description: 'Content of the message', example: 'testing message' })
  message: string;
  
}

export {
  sendMessageDTO
}