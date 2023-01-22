import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from '@modules/users/services/users.service';
import { UserEntity } from '@modules/users/entities/user.model';
import { IUserSession, IUserToken } from '../interfaces/user-session.interface';
import { SignupDto } from '../dto/auth.dto';


@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}
 
  
  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotAcceptableException('User does not exist!');
    }

    const passwordValid = await compare(password, user.password)
    
    if (!passwordValid) {
      throw new NotAcceptableException('Password incorrect!');
    }

    return user;
  }

  async login(user: UserEntity): Promise<IUserSession> {

    // Cuando el usuario logea ponemos el status online = true?
    this.usersService.setUserStatus(user.id, true)

    return {
      username: user.username,
      email: user.email,
      token: this.generateToken(user)
    };
  }


  async register(user: SignupDto): Promise<IUserSession> {
    const hashedPassword = await this.hashPassword(user.password)

    const newUser = await this.usersService.createUser({
      username: user.username,
      password: hashedPassword,
      email: user.email,
    });

    return {
      username: newUser.username,
      email: newUser.email,
      token: this.generateToken(newUser)
    };
  } 
    
  generateToken(user: UserEntity): string {
    return this.jwtService.sign({
      username: user.username,
      userId: user.id,
      email: user.email,
    })
  }

  async hashPassword(password: string): Promise<string> {
    const rounds = parseInt(this.configService.get('PASSWORD_ROUNDS'));
    const hashedPassword = await hash(password, rounds)
    return hashedPassword
  }
}
