import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface dataState {
  a: number;
  b: number;
  cal: string;
}

export default function Jest() {
  const [result, setResult] = useState<number | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<dataState>();

  const onSubmit = (data: dataState) => {
    console.log('데이터:', data);

    switch (data.cal) {
      case 'plus':
        setResult(Number(data.a) + Number(data.b));
        break;
      case 'minus':
        setResult(Number(data.a) - Number(data.b));
    }
    console.log(data.a);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          A
          <input
            type='text'
            {...register('a', {
              required: 'a항목은 필수입니다.',
              pattern: {
                value: /^-?\d+$/,
                message: '숫자만 입력 가능합니다.',
              },
            })}
          />
        </label>
        {errors.a && (
          <p style={{ color: 'red' }} data-testid='error-a'>
            {errors.a.message}
          </p>
        )}

        <label>
          B
          <input
            type='text'
            {...register('b', {
              required: 'b항목은 필수입니다.',
              pattern: {
                value: /^-?\d+$/,
                message: '숫자만 입력 가능합니다.',
              },
            })}
          />
        </label>
        {errors.b && (
          <p style={{ color: 'red' }} data-testid='error-b'>
            {errors.b.message}
          </p>
        )}
        <div className='flex gap-3'>
          <label htmlFor='plus' className='flex items-center gap-2 w-12'>
            <input
              type='radio'
              id='plus'
              value='plus'
              {...register('cal', { required: '연산을 선택해야 합니다.' })}
            />{' '}
            plus
          </label>
          <label htmlFor='minus' className='flex items-center gap-2 w-12'>
            <input
              type='radio'
              id='minus'
              value='minus'
              {...register('cal', { required: '연산을 선택해야 합니다.' })}
            />{' '}
            minus
          </label>
        </div>
        {errors.cal && <p style={{ color: 'red' }}>{errors.cal.message}</p>}
        <button type='submit' data-testid='calBtn'>
          Calc
        </button>
        <p data-testid='result'>Result : {result}</p>
      </form>
    </>
  );
}
