import { PaginationDto } from "@core/dto";
import { isStringValidationOptions } from "@shared/validation";
import { IsOptional, IsString } from "class-validator";

export class FilterRequirementFormatDto extends PaginationDto {
    
    @IsOptional()
    @IsString(isStringValidationOptions())
    readonly nameFormat: string;
    
}