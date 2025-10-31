import { useState } from 'react';
import JotaiScroll from './JotaiScroll';
import JotaiButton from './JotaiButton';
import { resetPostsAtom } from '../store/postAtom';
import { useSetAtom } from 'jotai';

export default function JotaiWrap() {
  const [tabName, setTabName] = useState('pageTab');
  const resetPosts = useSetAtom(resetPostsAtom);

  const handleTabBtn = (tab: string) => {
    resetPosts();
    setTabName(tab);
  };
  return (
    <div>
      <p>비동기 atom</p>
      <div className='flex gap-2 my-2'>
        <button
          type='button'
          onClick={() => handleTabBtn('pageTab')}
          className={`${tabName === 'pageTab' ? 'bg-gray-400' : ''}`}
        >
          페이지네이션
        </button>
        <button
          type='button'
          onClick={() => handleTabBtn('scrollTab')}
          className={`${tabName === 'scrollTab' ? 'bg-gray-400' : ''}`}
        >
          무한 스크롤
        </button>
      </div>
      {tabName === 'pageTab' ? <JotaiButton /> : <JotaiScroll />}
    </div>
  );
}
