import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

class userStatusDto {
	@IsNotEmpty()
	@IsBoolean()
  @Type(() => Boolean)
  @ApiProperty({ 
    description: 
    'Online status of the user', 
    example: false, 
    type: Boolean,
    required: true
  })
  active: boolean
}

class userUpdateDataDto {
	@IsNotEmpty()
	@IsString()
  @ApiProperty({
    description: 'Name of the user',
    example: 'Manolo',
    type: String,
    required: true
  })
  username: string

	@IsNotEmpty()
	@IsString()
  @ApiProperty({ 
    description: 'Email of the user', 
    example: 'example@gmail.es', 
    type: String,
    required: true
  })
  email: string
}

class userChangePasswordDto {
	@IsNotEmpty()
	@IsString()
  @ApiProperty({ 
    description: 'Old password', 
    example: '12345', 
    type: String,
    required: true
  })
  oldPassword: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ 
    description: 'New password', 
    example: '54321', 
    type: String,
    required: true 
  })
  newPassword: string

}
export {
  userStatusDto,
  userUpdateDataDto,
  userChangePasswordDto
}