import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class UploadDocumentDto {
  @IsFile()
  @MaxFileSize(5e6)
  @HasMimeType(['application/pdf'])
  file: MemoryStoredFile;
}
