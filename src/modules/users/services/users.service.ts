
import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository,  } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// Models
import { UserEntity } from "../entities/user.model";

// Interfaces
import { IUserSession, IUserToken } from "@modules/auth/interfaces/user-session.interface";
import { IUserModifiedMessage } from "../interfaces/user.interface";

// DTO's
import { CreateUserDto } from "../dto/create-user.dto";
import { userStatusDto, userUpdateDataDto } from "../dto/update-user.dto";


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  )
  { }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find({ select: ["username", "isOnline"] });
  }
  
  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ email })
  } 

  async findOneById(id: number): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ id })
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    
    const userExists = await this.usersRepository.findOneBy({
      email: createUserDto.email
    })

    if(userExists) {
      throw new NotAcceptableException('This email is already registred.');
    }

    const thisDate = new Date();

    const newUser = <UserEntity>{
      username: createUserDto.username,
      password: createUserDto.password,
      email: createUserDto.email,
      created_dt: thisDate,
      updated_dt: thisDate,
    }

    return this.usersRepository.save(newUser);

  }

  async removeUser(userToken: IUserToken): Promise<void> {
    await this.usersRepository.delete({id: userToken.userId});
  }

  async updateUser(userToken: IUserToken, newUserData: userUpdateDataDto) {
    const user = await this.usersRepository.findOneBy({ id: userToken.userId })

    if(newUserData.email !== user.email) {

      const emailExists = await this.findOneByEmail(newUserData.email)

      if(emailExists) {
        throw new NotAcceptableException('This email is already registred.');
      }

    }

    this.usersRepository.merge(user, {
      ...newUserData
    })

    this.usersRepository.save(user)

    return {
      message: 'success'
    }

  }

  async setUserStatus(userToken: IUserToken, status: userStatusDto): Promise<IUserModifiedMessage> {
    const user = await this.usersRepository.findOneBy({ id: userToken.userId })

    this.usersRepository.merge(user, {
      ...status
    })

    this.usersRepository.save(user)

    return {
      message: 'success'
    }

  }

  async changeUserPassword(userToken: IUserToken, password: string) {
    const user = await this.usersRepository.findOneBy({ id: userToken.userId })

    this.usersRepository.merge(user, {
      password
    })

    this.usersRepository.save(user)

    return {
      message: 'success'
    }
  }

  async getActiveUsers(): Promise<any[]> {
    const activeUsers = await this.usersRepository.findBy({ isOnline: true })
    return activeUsers.map(user => {
      const { username, email } = user
      return { username, email }
    })
  }

}