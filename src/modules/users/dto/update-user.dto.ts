import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

class userStatusDto {
	@IsNotEmpty()
	@IsBoolean()
  @ApiProperty({ description: 'Online status of the user', example: 'false'})
  isOnline: boolean
}

class userUpdateDataDto {
	@IsNotEmpty()
	@IsString()
  @ApiProperty({ description: 'Name of the user', example: 'Manolo' })
  username: string

	@IsNotEmpty()
	@IsString()
  @ApiProperty({ description: 'Email of the user', example: 'example@gmail.es'})
  email: string
}


class userChangePasswordDto {
	@IsNotEmpty()
	@IsString()
  @ApiProperty({ description: 'Old password', example: '12345' })
  oldPassword: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'New password', example: '54321' })
  newPassword: string

}
export {
  userStatusDto,
  userUpdateDataDto,
  userChangePasswordDto
}