import z from 'zod';
import { testZod } from '../schemas/formSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormDataState = z.infer<typeof testZod>;

export default function HookForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataState>({
    resolver: zodResolver(testZod),
    defaultValues: {
      name: '',
      age: '',
      job: '',
    },
  });

  const age = watch('age');

  const onSubmit = (data: FormDataState) => {
    console.log('데이터:', data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
        <input type='text' placeholder='이름' {...register('name')} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        <input type='text' placeholder='나이' {...register('age')} />
        {errors.age && <p style={{ color: 'red' }}>{errors.age.message}</p>}
        {Number(age) >= 20 && (
          <>
            <input type='text' placeholder='직업' {...register('job')} />
            {errors.job && <p style={{ color: 'red' }}>{errors.job.message}</p>}
          </>
        )}
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}
