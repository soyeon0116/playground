import { atom } from 'jotai';

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const pageAtom = atom(1);
export const allPostsAtom = atom<Post[]>([]);

export const postAtom = atom<Promise<Post[]>>(async (get) => {
  const page = get(pageAtom);
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('데이터 불러오기 오류');
  }
});

export const appendPostsAtom = atom(null, async (get, set) => {
  const page = get(pageAtom);
  const newPosts = await get(postAtom);
  const current = get(allPostsAtom);
  const isDuplicate = newPosts.every((post) =>
    current.some((existing) => existing.id === post.id)
  );
  if (isDuplicate) return;

  set(allPostsAtom, [...current, ...newPosts]);
});

export const resetPostsAtom = atom(null, (_, set) => {
  set(pageAtom, 1);
  set(allPostsAtom, []);
});
