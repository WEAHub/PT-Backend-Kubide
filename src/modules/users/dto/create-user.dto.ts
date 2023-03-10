import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

class CreateUserDto {

	@IsNotEmpty()
	@IsString()
  @ApiProperty({ 
    description: 'Name of the user', 
    example: 'Manolo', 
    type: String,
    required: true
   })
  username: string;

	@IsNotEmpty()
	@IsString()
  @ApiProperty({ 
    description: 'Password of the user', 
    example: '12345', 
    type: String,
    required: true
  })
  password: string

	@IsNotEmpty()
	@IsString()
  @ApiProperty({ 
    description: 'Email of the user', 
    example: 'example@gmail.es', 
    type: String,
    required: true
  })
  email: string;

}


export {
  CreateUserDto
}