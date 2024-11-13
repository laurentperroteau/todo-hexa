import { DateHelper } from './dateHelper';

type RecordWithDate = {
  date: string;
  otherProp: string;
};

describe(DateHelper.sortRecordByDateFromNewestToOldest.name, () => {
  test('should order the list by property date', () => {
    const list: RecordWithDate[] = [
      { date: '2023-01-01T00:00:00.000Z', otherProp: 'oldest' },
      { date: '2023-01-02T00:00:00.000Z', otherProp: 'newest' },
    ];
    const res = DateHelper.sortRecordByDateFromNewestToOldest<RecordWithDate>(
      list,
      'date',
    );
    expect(res[0].otherProp).toBe('newest');
  });

  test('work if string date not iso date but prefer iso date', () => {
    const list: RecordWithDate[] = [
      { date: '2023-01-01', otherProp: 'oldest' },
      { date: '2023-01-02', otherProp: 'newest' },
    ];
    const res = DateHelper.sortRecordByDateFromNewestToOldest<RecordWithDate>(
      list,
      'date',
    );
    expect(res[0].otherProp).toBe('newest');
  });

  test('should not change order if one date is not valid', () => {
    const list: RecordWithDate[] = [
      { date: '21 janvier 2023', otherProp: 'oldest' },
      { date: '2023-01-02T00:00:00.000Z', otherProp: 'newest' },
    ];
    const res = DateHelper.sortRecordByDateFromNewestToOldest<RecordWithDate>(
      list,
      'date',
    );
    expect(res[0].otherProp).toBe('oldest');
  });
});
