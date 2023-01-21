
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { EInboxType } from "../interfaces/get-messages.enum";

class getMessagesDTO {
  @IsString()
  @IsNotEmpty()
  @IsEnum(EInboxType)
  @ApiProperty({ 
    description: 'Message origin', 
    example: 'INBOX', 
    enum: EInboxType,
    enumName: 'Message origin.',
    type: String, 
    required: true  
  })
  type: string;
}

export {
  getMessagesDTO
}