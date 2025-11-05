import { z } from 'zod';

export const testZod = z
  .object({
    name: z
      .string()
      .min(1, '이름은 필수로 입력해야합니다.')
      .regex(/^[^0-9]+$/, '이름에는 숫자를 포함할 수 없습니다'),
    age: z.string().min(1, '나이는 필수로 입력해야합니다'),
    job: z.string().min(1, '직업을 입력하세요'),
  })
  .refine((data) => Number(data.age) < 20 || data.job, {
    message: '20세 이상은 직업을 입력하세요',
    path: ['job'],
  });
