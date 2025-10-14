import type { Course } from './types';

function hhmmToMinutes(time: string): number {
  const [hStr, mStr] = time.split(':');

  const hours = Number(hStr);
  const minutes = Number(mStr);

  return hours * 60 + minutes;
}

function parseMeeting (str: string) {
  const meetingRegex =
    /^(?<days>(?:Th|Tu|M|W|F)+)\s+(?<start>\d{1,2}:\d{2})-(?<end>\d{1,2}:\d{2})$/;
  const m = str.trim().match(meetingRegex);
  if (!m) throw new Error('Invalid meeting string');

  const { days, start, end } = m.groups as {
    days: string;
    start: string;
    end: string;
  };

  const dayTokens = days.match(/Th|Tu|M|W|F/g);

  return {
    days: dayTokens, // e.g. ['Tu', 'Th']
    start,
    end,
  };
};

export const hasConflict = (a: Course, b: Course) => {
  if (a.term !== b.term)
    return false;
  if (a.meets === '' || b.meets === '')
    return false;

  const aMeets = parseMeeting(a.meets);
  const bMeets = parseMeeting(b.meets);

  if (!aMeets.days?.some((item) => bMeets.days?.includes(item)))
    return false;

  if (hhmmToMinutes(aMeets.end) <= hhmmToMinutes(bMeets.start) || hhmmToMinutes(bMeets.end) <=   hhmmToMinutes(aMeets.start))
    return false;

  return true;
};

