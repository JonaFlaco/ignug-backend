import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { RoleEntity, UserEntity } from '@auth/entities';
import { PayloadTokenModel } from '@auth/models';
import { RepositoryEnum } from '@shared/enums';
import {
  LoginDto,
  PasswordChangeDto,
  ReadProfileDto,
  ReadUserInformationDto,
  UpdateProfileDto,
  UpdateUserInformationDto,
} from '@auth/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { UsersService } from '@auth/services';

@Injectable()
export class AuthService {
  constructor(
    @Inject(RepositoryEnum.USER_REPOSITORY)
    private repository: Repository<UserEntity>,
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async changePassword(
    id: string,
    payload: PasswordChangeDto,
  ): Promise<boolean> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatchPassword = await this.checkPassword(payload.oldPassword, user);

    if (!isMatchPassword) {
      throw new BadRequestException('The old password is not match.');
    }

    if (payload.confirmationPassword !== payload.newPassword) {
      throw new BadRequestException('The passwords do not match.');
    }

    user.password = payload.newPassword;

    await this.repository.save(user);

    return true;
  }

  async login(payload: LoginDto): Promise<ServiceResponseHttpModel> {
    const user: UserEntity = (await this.repository.findOne({
      where: {
        username: payload.username,
      },
      relations: {
        roles: true,
        teacher: {career:true}, 
        student: true,
      },
    })) as UserEntity;

    if (user && user.maxAttempts === 0)
      throw new UnauthorizedException(
        'User exceeded the maximum number of attempts allowed.',
      );

    if (user && user.suspendedAt)
      throw new UnauthorizedException('User is suspended.');

    if (!user || !(await this.checkPassword(payload.password, user))) {
      throw new UnauthorizedException('Wrong username and/or password.');
    }

    user.activatedAt = new Date();
    // Include foreign keys
    const { password, student, teacher, roles, ...userRest } = user;

    await this.repository.update(userRest.id, userRest);

    const accessToken = this.generateJwt(user, 'admin');

    return { data: { accessToken, user } };
  }

  async findProfile(id: string): Promise<ReadProfileDto> {
    const user = await this.repository.findOne({
      where: { id },
      relations: {
        bloodType: true,
        ethnicOrigin: true,
        identificationType: true,
        gender: true,
        maritalStatus: true,
        sex: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(ReadProfileDto, user);
  }

  async findUserInformation(id: string): Promise<ReadUserInformationDto> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(ReadUserInformationDto, user);
  }

  async updateUserInformation(
    id: string,
    payload: UpdateUserInformationDto,
  ): Promise<ReadUserInformationDto> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.repository.merge(user, payload);
    const userUpdated = await this.repository.save(user);

    return plainToInstance(ReadUserInformationDto, userUpdated);
  }

  async updateProfile(
    id: string,
    payload: UpdateProfileDto,
  ): Promise<ReadProfileDto> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.repository.merge(user, payload);

    const profileUpdated = await this.repository.save(user);

    return plainToInstance(ReadProfileDto, profileUpdated);
  }

  refreshToken(user: UserEntity): ServiceResponseHttpModel {
    const accessToken = this.generateJwt(user, 'admin');

    return { data: { accessToken, user } };
  }

  private generateJwt(user: UserEntity, role: string): string {
    const payload: PayloadTokenModel = { id: user.id, role };

    return this.jwtService.sign(payload);
  }

  private async findByUsername(username: string): Promise<UserEntity> {
    return (await this.repository.findOne({
      where: {
        username,
      },
    })) as UserEntity;
  }

  private async checkPassword(
    passwordCompare: string,
    user: UserEntity,
  ): Promise<null | UserEntity> {
    const { password, ...userRest } = user;
    const isMatch = Bcrypt.compareSync(passwordCompare, password);

    if (isMatch) {
      userRest.maxAttempts = 3;
      await this.repository.save(userRest);
      return user;
    }

    userRest.maxAttempts =
      userRest.maxAttempts > 0 ? userRest.maxAttempts - 1 : 0;
    await this.repository.save(userRest);

    return null;
  }
}
