import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


class LoginDto {
	@IsNotEmpty()
	@IsString()
  @ApiProperty(({ description: 'Email of the user', example: 'test@test.com', type: String}))
	email: string;
	
	@IsNotEmpty()
	@IsString()
  @ApiProperty(({ description: 'Password of the user', example: '12345', type: String }))
	password: string;
}

class SignupDto extends LoginDto {
	@IsNotEmpty()
	@IsString()
  @ApiProperty(({ description: 'Name of the user', example: 'test', type: String }))
	username: string;
}


export {
	LoginDto,
	SignupDto,
}