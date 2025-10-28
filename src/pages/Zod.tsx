'use client';

import { useState } from 'react';
import z from 'zod';

const testZod = z
  .object({
    name: z
      .string()
      .min(4, '이름은 필수로 입력해야합니다.')
      .regex(/^[^0-9]+$/, '이름에는 숫자를 포함할 수 없습니다'),
    age: z.number().min(1, '나이는 필수로 입력해야합니다.'),
    job: z.string().optional(),
  })
  .refine((data) => data.age < 20 || data.job, {
    message: '20세 이상은 직업을 입력하세요',
    path: ['job'],
  });

export default function Zod() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = testZod.safeParse({ name, age: Number(age) });

    if (result.success) {
      setErrors({});
    } else {
      let message: Record<string, string> = {};
      result.error.issues.forEach((v) => {
        const field = String(v.path[0]);
        message[field] = v.message;
      });
      setErrors(message);
    }

    // if (result.success) {
    //   setErrors([]);
    // } else {
    //   let message = result.error.issues.map((issue) => issue.message);
    //   setErrors(message);
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          type='text'
          placeholder='이름'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        <input
          type='number'
          placeholder='나이'
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
        {Number(age) >= 20 && (
          <>
            <input
              type='text'
              placeholder='직업'
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
            {errors.job && <p style={{ color: 'red' }}>{errors.job}</p>}
          </>
        )}
        <button type='submit'>submit</button>
        {/* {errors.map((v, i) => (
          <p key={i} style={{ color: 'red' }}>
            {v}
          </p>
        ))} */}
      </form>
    </div>
  );
}
