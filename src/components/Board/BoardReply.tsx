import React, { Dispatch, SetStateAction, useState } from 'react';
import { BoardTypes, USER } from '../../data/boardDummy';

interface Props {
  post: BoardTypes;
  setPost: Dispatch<SetStateAction<BoardTypes | undefined>>;
}
export default function BoardReply({ post, setPost }: Props) {
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});
  const handleDelReply = (id: number) => {
    if (!post) return;
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      const updatedComments = post.comments.filter((c) => c.id !== id);
      setPost({
        ...post,
        comments: updatedComments,
      });
    }
  };
  return (
    <div>
      <p>댓글</p>
      {post.comments.length === 0 ? (
        <p>댓글을 작성해보세요.</p>
      ) : (
        post.comments.map((v) => (
          <div className='flex flex-col gap-3'>
            <p>{v.author}</p>
            <input
              type='text'
              value={replyTexts[v.id] ?? v.text}
              onChange={(e) =>
                setReplyTexts((prev) => ({ ...prev, [v.id]: e.target.value }))
              }
              readOnly={v.author !== USER}
              className='w-full'
            />
            {v.author === USER && (
              <div className='flex gap-3 ml-auto'>
                <button type='button'>수정</button>
                <button type='button' onClick={() => handleDelReply(v.id)}>
                  삭제
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
