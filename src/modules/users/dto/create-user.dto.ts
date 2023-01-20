import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

class CreateUserDto {

	@IsNotEmpty()
	@IsString()
  @ApiProperty({ description: 'Name of the user', example: 'Manolo' })
  username: string;

	@IsNotEmpty()
	@IsString()
  @ApiProperty({ description: 'Password of the user', example: '12345'})
  password: string

	@IsNotEmpty()
	@IsString()
  @ApiProperty({ description: 'Email of the user', example: 'example@gmail.es'})
  email: string;

}


export {
  CreateUserDto
}