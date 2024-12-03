import { DataSource } from 'typeorm';
import {
  EventEntity,
  AssignamentEntity,
  PlanningEntity,
  ProjectPlanEntity,
  RequirementEntity,
  ModalityEntity,
  // StudentEntity,
  CatalogueEntity,
  ProjectEntity,
  StudentInformationEntity,
  TutorAssignmentEntity,
  MeshStudentRequirementEntity,
  EnrollmentEntity,
  EstudianteEntity,
  TribunalEntity,
  ComplexivoEntity,
  TeacherEntity,
  StudentDegreeEntity,
  RequirementRequestEntity,
  ResponsibleTutorEntity,
  RequirementFormatEntity,
  ProfessionEntity,
  CatalogueTypeEntity,
  DocumentEntity,
  //YearEntity,
  SignatureEntity,
  InscriptionEntity,
  CoordinatorEntity,
  FormatEntity,
  UploadRequirementRequestEntity,
  DownloadFormatEntity,
  ReviewRequirementEntity,
  UploadScoreEntity,
  PreparationCourseEntity,
  UploadProjectEntity,
  TheoricalNoteEntity,
  RubricEntity,
  EvaluationDateEntity,
  ComplexTimelineEntity,
  NoteEntity,
  PracticalCaseEntity,
  ItemEntity,
  ComplexScheduleEntity,
  ProjectBenchEntity,
  RatingWeightEntity,
  MemorandumEntity,
  MemorandumTutorEntity,
  TotalNoteEntity,
  ScheduleActivityEntity,
  NoteSettingEntity,
  TotalCaseEntity,
} from '@uic/entities';

import { DataSourceEnum, RepositoryEnum } from '@shared/enums';
import { ResponseProjectPlanEntity } from '../entities/response-project-plan.entity';
import { FormatProyectPlanEntity } from '../entities/format-proyect-plan.entity';
import { ApprovalRequestEntity } from '../entities/approval-request.entity';
import { CaseViewEntity } from '../entities/case-view.entity';
import { CourtProjectEntity } from '@uic/entities';
import { AttendanceRecordEntity } from '../entities/attendance-record.entity';
import { EvaluationEntity } from '../entities/evaluation.entity';
import { RubricNoteEntity } from '../entities/rubric-note.entity';
import { NoteDefenseEntity } from '../entities/note-defense.entity';
import { DefenseApprovedEntity } from '../entities/defense-approved.entity';
import { IndividualDefenseEntity } from '../entities/individual-defense.entity';

export const uicProviders = [
  {
    provide: RepositoryEnum.APPROVAL_REQUEST_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ApprovalRequestEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.EVENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EventEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.ASSIGNAMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AssignamentEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.FORMAT_PROYECT_PLAN_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FormatProyectPlanEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PLANNING_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PlanningEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PROJECT_PLAN_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProjectPlanEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.RESPONSE_PROJECT_PLAN_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ResponseProjectPlanEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.REQUIREMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RequirementEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.MODALITY_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ModalityEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  // {
  //   provide: RepositoryEnum.STUDENT_REPOSITORY,
  //   useFactory: (dataSource: DataSource) =>
  //     dataSource.getRepository(StudentEntity),
  //   inject: [DataSourceEnum.PG_DATA_SOURCE],
  // },
  {
    provide: RepositoryEnum.CATALOGUE_UIC_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogueEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TUTOR_ASSIGNMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TutorAssignmentEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PROJECT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProjectEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.ENROLLMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EnrollmentEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.STUDENT_INFORMATION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StudentInformationEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.REQUIREMENT_REQUEST_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RequirementRequestEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.REQUIREMENT_FORMAT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RequirementFormatEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.MESH_STUDENT_REQUIREMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MeshStudentRequirementEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.ESTUDIANTE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EstudianteEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TRIBUNAL_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TribunalEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.COMPLEXIVO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ComplexivoEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TEACHER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TeacherEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.STUDENT_DEGREE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StudentDegreeEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  {
    provide: RepositoryEnum.RESPONSIBLE_TUTOR_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ResponsibleTutorEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PROFESSION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProfessionEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CATALOGUE_TYPE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogueTypeEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.DOCUMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DocumentEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  /*{
    provide: RepositoryEnum.YEAR_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(YearEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },*/
  {
    provide: RepositoryEnum.SIGNATURE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SignatureEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.INSCRIPTION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InscriptionEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.COORDINATOR_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CoordinatorEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.FORMAT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FormatEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.DOWNLOAD_FORMAT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DownloadFormatEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.UPLOAD_REQUIREMENT_REQUEST_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UploadRequirementRequestEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  {
    provide: RepositoryEnum.REVIEW_REQUIREMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ReviewRequirementEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  {
    provide: RepositoryEnum.CASE_VIEW_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CaseViewEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  {
    provide: RepositoryEnum.PREPARATION_COURSE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PreparationCourseEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  {
    provide: RepositoryEnum.UPLOAD_SCORE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UploadScoreEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.UPLOAD_PROJECT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UploadProjectEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.THEORICAL_NOTE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TheoricalNoteEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.COURT_PROJECT,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CourtProjectEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.ATTENDANCE_RECORD_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AttendanceRecordEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.EVALUATION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EvaluationEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.RUBRIC_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RubricEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.EVALUATION_DATE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EvaluationDateEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.COMPLEX_TIMELINE,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ComplexTimelineEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.COMPLEX_SCHEDULE,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ComplexScheduleEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.NOTE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(NoteEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PRACTICAL_CASE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PracticalCaseEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.ITEM_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ItemEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PROJECT_BENCH_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProjectBenchEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.RATING_WEIGHT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RatingWeightEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.MEMORANDUM_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MemorandumEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.MEMORANDUM_TUTOR_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MemorandumTutorEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.SCHEDULE_ACTIVITY_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ScheduleActivityEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TOTAL_NOTE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TotalNoteEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.RUBRIC_NOTE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RubricNoteEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.NOTE_SETTING_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(NoteSettingEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.NOTE_DEFENSE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(NoteDefenseEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.DEFENSE_APPROVED_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DefenseApprovedEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TOTAL_CASE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TotalCaseEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.INDIVIDUAL_DEFENSE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(IndividualDefenseEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
];
