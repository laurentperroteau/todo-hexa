import { Injectable } from '@nestjs/common';

@Injectable()
export class DateHelper {
  static sortRecordByDateFromNewestToOldest<T extends Record<string, any>>(
    list: T[],
    property: keyof T,
  ): T[] {
    return list.sort((a, b) => {
      const aDate = new Date(a[property]);
      const bDate = new Date(b[property]);

      return bDate.getTime() - aDate.getTime();
    });
  }
}
