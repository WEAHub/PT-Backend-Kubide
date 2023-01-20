import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

class sendMessageDTO {
  
	@IsNotEmpty()
	@IsString()
  @ApiProperty({ description: 'Email of the receiver user', example: 'test@test.com', type: String })
  toUser: string;

	@IsNotEmpty()
	@IsString()
  @ApiProperty({ description: 'Content of the message', example: 'testing message', type: String })
  message: string;
  
}

export {
  sendMessageDTO
}