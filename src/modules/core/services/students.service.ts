import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, In } from 'typeorm';
import {
  CreateCatalogueDto,
  CreateStudentDto,
  FilterStudentDto,
  PaginationDto,
  ReadStudentDto,
  UpdateStudentDto,
} from '@core/dto';
import { StudentEntity } from '@core/entities';
import { RepositoryEnum } from '@shared/enums';
import { UsersService } from '@auth/services';
import { UserEntity } from '@auth/entities';
import { plainToInstance } from 'class-transformer';
import { ServiceResponseHttpModel } from '@shared/models';

@Injectable()
export class StudentsService {
  constructor(
    @Inject(RepositoryEnum.STUDENT_REPOSITORY)
    private repository: Repository<StudentEntity>, //private usersService: UsersService,
  ) {}

  async create(payload: CreateStudentDto) {
    const newStudent = this.repository.create(payload);

    //newStudent.user = await this.usersService.findOne(payload.user.id);

    const studentCreated = await this.repository.save(newStudent);

    return await this.repository.save(studentCreated);
  }

  async catalogue() {
    const data = await this.repository.findAndCount({
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  // async findAll(params?: FilterStudentDto) {
  //   //Pagination & Filter by search
  //   if (params) {
  //     return await this.paginateAndFilter(params);
  //   }

  //   //All
  //   const data = await this.repository.findAndCount();

  //   return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  // }
  async findAll(params?: FilterStudentDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      relations: { user: true, career: true },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadStudentDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string) {
    const student = await this.repository.findOne({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async update(id: string, payload: UpdateStudentDto) {
    const student = await this.repository.findOneBy({ id });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    this.repository.merge(student, payload);

    return this.repository.save(student);
  }

  async remove(id: string) {
    const student = await this.repository.findOneBy({ id });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return await this.repository.softRemove(student);
  }

  async removeAll(payload: StudentEntity[]) {
    return this.repository.softRemove(payload);
  }

  private async paginateAndFilter(params: FilterStudentDto) {
    let where:
      | FindOptionsWhere<StudentEntity>
      | FindOptionsWhere<StudentEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      relations: { user: true, career: true },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadStudentDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
