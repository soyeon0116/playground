import React, { Suspense } from 'react';
import PostList from './PostList';
import { useAtomValue, useSetAtom } from 'jotai';
import { pageAtom, postAtom } from '../store/postAtom';

export default function JotaiButton() {
  const posts = useAtomValue(postAtom);
  const setPage = useSetAtom(pageAtom);
  return (
    <div>
      <Suspense fallback={<p>⏳ loading...</p>}>
        <PostList posts={posts} />
      </Suspense>
      <div className='mt-2 flex gap-2'>
        <button type='button' onClick={(e) => setPage((prev) => prev - 1)}>
          Prev
        </button>
        <button type='button' onClick={(e) => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
