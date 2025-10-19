'use client';

import { useState } from 'react';
import z from 'zod';

const testZod = z.object({
  name: z
    .string()
    .min(1, '이름은 필수로 입력해야합니다.')
    .regex(/^[^0-9]+$/, '이름에는 숫자를 포함할 수 없습니다'),
  age: z.number().min(1, '나이는 필수로 입력해야합니다.'),
});

export default function Zod() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = testZod.safeParse({ name, age: Number(age) });

    if (result.success) {
      setError(null);
    } else {
      console.log(result.error.issues[0]);
      setError(result.error.issues[0].message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='number'
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type='submit'>submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
