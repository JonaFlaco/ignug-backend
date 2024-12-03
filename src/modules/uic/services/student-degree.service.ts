import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, LessThan } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateStudentDegreeDto,
  FilterStudentDegreeDto,
  ReadStudentDegreeDto,
  UpdateStudentDegreeDto,
} from '@uic/dto';
import { StudentDegreeEntity } from '@uic/entities';
import { PaginationDto } from '@core/dto';

@Injectable()
export class StudentsDegreeService {
  constructor(
    @Inject(RepositoryEnum.STUDENT_DEGREE_REPOSITORY)
    private repository: Repository<StudentDegreeEntity>,
  ) {}

  //Metodo Create
  async create(payload: CreateStudentDegreeDto): Promise<ServiceResponseHttpModel> {
    const newStudentDegree = this.repository.create(payload);
    const studentDegreeCreated = await this.repository.save(newStudentDegree);

    return { data: plainToInstance(ReadStudentDegreeDto, studentDegreeCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
  
  async findAll(params?: FilterStudentDegreeDto): Promise<ServiceResponseHttpModel> {
    // Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.title) {
      return this.filterByTitle(params.title);
    }

    //All
    const response = await this.repository.findAndCount({
      relations: {
        nameModality: true,
        //modalities: true,
        namePlanning: true,
        //estudiantes: true,
        nameEstudiante: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadStudentDegreeDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const studentDegree = await this.repository.findOne({
      where: { id },
      relations: { //modalities: true,
                   nameModality: true,
                   //plannings: true,
                   namePlanning: true, 
                   //estudiantes: true },
                   nameEstudiante: true },
    });

    if (!studentDegree) {
      throw new NotFoundException('studentDegree not found');
    }

    return { data: plainToInstance(ReadStudentDegreeDto, studentDegree) };
  }

  async update(
    id: string,
    payload: UpdateStudentDegreeDto,
  ): Promise<ServiceResponseHttpModel> {
    const studentDegree = await this.repository.preload({ id, ...payload });

    if (!studentDegree) {
      throw new NotFoundException('StudentDegree not found');
    }

    const studentDegreeUpdated = await this.repository.save(studentDegree);

    return { data: plainToInstance(ReadStudentDegreeDto, studentDegreeUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const studentDegree = await this.repository.findOneBy({ id });

    if (!studentDegree) {
      throw new NotFoundException('StudentDegree not found');
    }

    const studentDegreeDeleted = await this.repository.softRemove(studentDegree);

    return { data: plainToInstance(ReadStudentDegreeDto, studentDegreeDeleted) };
  }

  async removeAll(payload: StudentDegreeEntity[]): Promise<ServiceResponseHttpModel> {
    const studentsDegreeDeleted = await this.repository.softRemove(payload);
    return { data: studentsDegreeDeleted };
  }

  private async paginateAndFilter(
    params: FilterStudentDegreeDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<StudentDegreeEntity> | FindOptionsWhere<StudentDegreeEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      // where.push({ name: ILike(`%${search}%`) });
    }
    const response = await this.repository.findAndCount({
      where,
      relations: {
        nameModality: true,
        //modalities: true,
        //plannings: true,
        namePlanning: true,
        //estudiantes: true,
        nameEstudiante: true,
        
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadStudentDegreeDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterByTitle(title: string): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<StudentDegreeEntity> = {};

    if (title) {
      where.title = LessThan(title);
    }
    
    const response = await this.repository.findAndCount({
      relations: [],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }
}
