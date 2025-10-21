import { z } from 'zod';

export interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

export const courseSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Course title must be at least two characters' }),
  term: z.enum(['Fall', 'Winter', 'Spring', 'Summer'], {
    message: 'Term must be Fall, Winter, Spring, or Summer',
  }),
  number: z
    .string()
    .regex(/^\d{3}(-\d{1})?$/, {
      message:
        "Course number must be a number with an optional section, e.g., '213-2'",
    }),
  meets: z
    .string()
    .refine(
      (value) =>
        value === '' || /^(M|Tu|W|Th|F)+ \d{2}:\d{2}-\d{2}:\d{2}$/.test(value),
      {
        message:
          "Meeting time must be empty or a legal meeting time with one or more days and a non-empty timespan, e.g., 'MWF 12:00-13:20'",
      }
    ),
});
