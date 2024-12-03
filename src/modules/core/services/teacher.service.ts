import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, In } from 'typeorm';
import {
  CreateCatalogueDto,
  CreateStudentDto,
  FilterStudentDto,
  PaginationDto,
  UpdateStudentDto,
} from '@core/dto';
import { StudentEntity, TeacherEntity } from '@core/entities';
import { RepositoryEnum } from '@shared/enums';
import { UsersService } from '@auth/services';
import { UserEntity } from '@auth/entities';
import { CreateTeacherDto } from '../dto/teachers/create-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @Inject(RepositoryEnum.TEACHER_REPOSITORY)
    private repository: Repository<TeacherEntity>,
    private usersService: UsersService,
  ) {}

  async create(payload: CreateTeacherDto) {
    const newTeacher = this.repository.create(payload);

    // newTeacher.user = await this.usersService.findOne(payload.user.id);

    const teacherCreated = await this.repository.save(newTeacher);

    return await this.repository.save(teacherCreated);
  }

  async catalogue() {
    const data = await this.repository.findAndCount({
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findAll(params?: FilterStudentDto) {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.repository.findAndCount({
      relations: { user: true, career: true },
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string) {
    const student = await this.repository.findOne({
      where: { id },
      relations:{ user: true, career: true },
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

    const data = await this.repository.findAndCount({
      relations: { user: true, career: true },
      where,
      take: limit,
      // skip: PaginationDto.getOffset(limit, page),
    });

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }
}