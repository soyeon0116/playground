import { Post } from '../store/postAtom';

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  return (
    <>
      <ul className='flex flex-col gap-3'>
        {posts.map((v) => (
          <li key={v.id} className='p-2 border border-gray-400 rounded-md'>
            <p>
              {v.id}. {v.title}
            </p>
            <p>{v.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
