import { useAtom } from 'jotai';
import { countAtom } from '../store/countAtom';
import JotaiWrap from '../components/JotaiWrap';

export default function Jotai() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <>
      <div>
        <p>count : {count}</p>
        <button onClick={() => setCount((prev) => prev + 1)}>증가</button>
        <button onClick={() => setCount((prev) => prev - 1)}>감소</button>
      </div>
      <div>
        <JotaiWrap />
      </div>
    </>
  );
}
