import moment from 'moment';

export function getRundomItemsFromArray(
  array: Array<number>,
  numberOfRundomElements: number,
): Array<number> {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, numberOfRundomElements);
}

export function getRundomArray(arrayLength: number): Array<number> {
  return Array.from(Array(arrayLength).keys()).sort(() => 0.5 - Math.random());
}

export function getFormattedTimeForNews(timeStamp: number) {
  const dt = moment.unix(timeStamp);
  const weekDay = dt.format('dddd');
  const monthDateYear = dt.format('MMMM D YYYY');

  return {
    weekDay,
    monthDateYear,
  };
}
