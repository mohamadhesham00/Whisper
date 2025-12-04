import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { ApiResponseUtil } from 'src/common/utils/api-response.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(createUserDto.password, salt);
    await this.checkIfUniqueData(createUserDto); // throws if not unique

    const user = {
      fName: createUserDto.fName,
      lName: createUserDto.lName,
      userName: createUserDto.userName,
      email: createUserDto.email,
      phone: createUserDto.phone,
      password: hashed,
    };

    return await this.userModel.create(user); // Mongoose / MongoDB / Repo call
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async checkIfUniqueData({ email, userName, phone }: any) {
    const existingUser = await this.userModel
      .findOne({
        $or: [{ email }, { userName }, { phone }],
      })
      .exec();
    if (existingUser) {
      if (existingUser.email === email)
        return ApiResponseUtil.throwError(
          'Email already exists',
          'EMAIL_EXISTS',
          HttpStatus.BAD_REQUEST,
        );

      if (existingUser.userName === userName)
        return ApiResponseUtil.throwError(
          'Username already exists',
          'USERNAME_EXISTS',
          HttpStatus.BAD_REQUEST,
        );

      if (existingUser.phone === phone)
        return ApiResponseUtil.throwError(
          'Phone number already exists',
          'PHONE_EXISTS',
          HttpStatus.BAD_REQUEST,
        );
    }
    return true;
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: number): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
