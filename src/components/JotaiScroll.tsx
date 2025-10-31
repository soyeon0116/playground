import React, { Suspense, useEffect, useRef } from 'react';
import PostList from './PostList';
import { useAtomValue, useSetAtom } from 'jotai';
import { allPostsAtom, appendPostsAtom, pageAtom } from '../store/postAtom';

export default function JotaiScroll() {
  const posts = useAtomValue(allPostsAtom);
  const page = useAtomValue(pageAtom);
  const setPage = useSetAtom(pageAtom);
  const appendPosts = useSetAtom(appendPostsAtom);
  const scrollRef = useRef(null);

  useEffect(() => {
    const target = scrollRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [setPage]);

  useEffect(() => {
    appendPosts();
  }, [appendPosts, page]);

  return (
    <div>
      <Suspense fallback={<p>⏳ loading...</p>}>
        <PostList posts={posts} />
      </Suspense>
      <div ref={scrollRef} className='h-10' />
    </div>
  );
}
