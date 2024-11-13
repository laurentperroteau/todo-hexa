import { Module } from '@nestjs/common';
import { DateHelper } from './helpers/dateHelper';

@Module({
  providers: [DateHelper],
  exports: [DateHelper],
})
export class CommonModule {}
