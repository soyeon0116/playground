import React from 'react';
import { useMsgAlertStore } from '../store/msgAlertStore';

export default function MsgAlertModal() {
  const messages = useMsgAlertStore((state) => state.msgs);
  const clearMsg = useMsgAlertStore((state) => state.clearMsg);

  return (
    <div className='w-64 fixed bottom-4 right-4 bg-white shadow-lg border p-4 rounded-md'>
      <h3 className='font-bold mb-2'>📩 새 알림</h3>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx} className='text-sm mb-1 truncate'>
            {msg}
          </li>
        ))}
      </ul>
      <button className='mt-2 text-xs text-blue-500 w-full' onClick={clearMsg}>
        닫기
      </button>
    </div>
  );
}
