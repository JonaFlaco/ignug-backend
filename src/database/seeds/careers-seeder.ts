import { Injectable } from '@nestjs/common';
import { CareersService } from '@core/services';
import { CreateCareerDto } from '@core/dto';

@Injectable()
export class CareersSeeder {
  constructor(private careerService: CareersService) {}

  async run() {
    await this.createCareers();
  }

  async createCareers() {
    const careers: CreateCareerDto[] = [];

    careers.push(
      {
        institution: null,
        modality: null,
        state: null,
        type: null,
        acronym: 'DSF',
        code: '1',
        codeSniese: '1',
        degree: 'Tecnólogo Superior en Desarrollo de Software',
        logo: '1',
        name: 'DESARROLLO DE SOFTWARE',
        // resolutionNumber: '1DSF',
        shortName: 'SOFTWARE',
      },
      {
        institution: null,
        modality: null,
        state: null,
        type: null,
        acronym: 'INC',
        code: '2',
        codeSniese: '2',
        degree:
          'Tecnólogo Superior en Control de Incendios y Operaciones de Rescate',
        logo: '1',
        name: 'CONTROL DE INCENDIOS',
        // resolutionNumber: '2CIN',
        shortName: 'BOMBEROS',
      },
      {
        institution: null,
        modality: null,
        state: null,
        type: null,
        acronym: 'MKT',
        code: '3',
        codeSniese: '3',
        degree: ' Técnico Superior en Arte Culinario Ecuatoriano',
        logo: '1',
        name: 'ARTE CULINARIO',
        // resolutionNumber: '3ARTC',
        shortName: 'GASTRONOMÍA',
      },
      {
        institution: null,
        modality: null,
        state: null,
        type: null,
        acronym: 'DMO',
        code: '4',
        codeSniese: '4',
        degree: ' Técnico Superior en Arte Culinario Ecuatoriano',
        logo: '1',
        name: 'DISEÑO DE MODAS',
        // resolutionNumber: '4DSMO',
        shortName: 'MODAS',
      },
      {
        institution: null,
        modality: null,
        state: null,
        type: null,
        acronym: 'DMO',
        code: '5',
        codeSniese: '5',
        degree:
          ' Guía Nacional de Turismo con nivel equivalente a tecnología superior',
        logo: '1',
        name: 'GUÍA NACIONAL',
        // resolutionNumber: '5GNC',
        shortName: 'TURISMO',
      },
      {
        institution: null,
        modality: null,
        state: null,
        type: null,
        acronym: 'DMO',
        code: '6',
        codeSniese: '6',
        degree:
          'Tecnólogo Superior en Marketing, puede desempeñarse como analista de mercadeo',
        logo: '1',
        name: 'MARKETING',
        // resolutionNumber: '6MKT',
        shortName: 'MARKETING',
      },
    );
    for (const career of careers) {
      await this.careerService.create(career);
    }
  }
}
