import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardTypes, posts, USER } from '../../data/boardDummy';
import { useForm } from 'react-hook-form';
import BoardReply from '../../components/Board/BoardReply';

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(posts.find((v) => v.id === Number(id)));

  const { register, handleSubmit, reset } = useForm<BoardTypes>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
      });
    }
  }, [post, reset]);

  const handleUpdateContent = (data: BoardTypes) => {
    console.log(data);
  };

  if (!post)
    return (
      <div>
        <p>찾을 수 없는 글입니다.</p>
        <button type='button' onClick={() => navigate('/board')}>
          되돌아가기
        </button>
      </div>
    );

  return (
    <div className='flex flex-col gap-3'>
      {post.author === USER && (
        <div className='flex gap-3'>
          <button type='button'>수정</button>
          <button type='button'>삭제</button>
        </div>
      )}
      <form
        onSubmit={handleSubmit(handleUpdateContent)}
        className='flex flex-col gap-3 w-full'
      >
        <input
          type='text'
          {...register('title')}
          className='w-full'
          readOnly={post.author !== USER}
        />
        <textarea
          {...register('content')}
          className='w-full h-[500px]'
          readOnly={post.author !== USER}
        ></textarea>
      </form>
      <BoardReply post={post} setPost={setPost} />
    </div>
  );
}
