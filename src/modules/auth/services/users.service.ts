import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import {
  CreateUserDto,
  FilterUserDto,
  ReadUserDto,
  UpdateUserDto,
} from '@auth/dto';
import { UserEntity } from '@auth/entities';
import { PaginationDto } from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { MAX_ATTEMPTS } from '@auth/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(RepositoryEnum.USER_REPOSITORY)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(payload: CreateUserDto): Promise<ReadUserDto> {
    const newUser = this.userRepository.create(payload);
    const userCreated = await this.userRepository.save(newUser);

    return plainToInstance(ReadUserDto, userCreated);
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.userRepository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterUserDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by Search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    // if (params.birthdate) {
    //   return this.filterByBirthdate(params.birthdate);
    // }

    //All
    const response = await this.userRepository.findAndCount({
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadUserDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: { password: false },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(
    id: string,
    payload: UpdateUserDto,
  ): Promise<ServiceResponseHttpModel> {
    const user = await this.userRepository.preload({ id, ...payload });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // this.userRepository.merge(user, payload);
    const userUpdated = await this.userRepository.save(user);

    return { data: plainToInstance(ReadUserDto, userUpdated) };
  }

  async reactivate(id: string): Promise<ServiceResponseHttpModel> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.suspendedAt = null;
    user.maxAttempts = MAX_ATTEMPTS;

    const userUpdated = await this.userRepository.save(user);

    return { data: plainToInstance(ReadUserDto, userUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userDeleted = await this.userRepository.softRemove(user);

    return { data: plainToInstance(ReadUserDto, userDeleted) };
  }

  async removeAll(payload: UserEntity[]): Promise<UserEntity> {
    const usersDeleted = await this.userRepository.softRemove(payload);
    return usersDeleted[0];
  }

  private async paginateAndFilter(
    params: FilterUserDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ identification: ILike(`%${search}%`) });
      where.push({ lastname: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
      where.push({ username: ILike(`%${search}%`) });
    }

    const response = await this.userRepository.findAndCount({
      where,
      relations: { student: true },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadUserDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterByBirthdate(
    birthdate: Date,
  ): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<UserEntity> = {};

    if (birthdate) {
      where.birthdate = LessThan(birthdate);
    }

    const response = await this.userRepository.findAndCount({ where });

    return {
      data: plainToInstance(ReadUserDto, response[0]),
      pagination: { limit: 10, totalItems: response[1] },
    };
  }

  async suspend(id: string): Promise<ReadUserDto> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.suspendedAt = new Date();

    const userUpdated = await this.userRepository.save(user);

    return plainToInstance(ReadUserDto, userUpdated);
  }
}
