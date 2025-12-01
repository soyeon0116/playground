import React, { useEffect, useRef, useState } from 'react';
import { useMsgAlertStore } from '../store/msgAlertStore';

export default function WebSocketChat() {
  const [msg, setMsg] = useState('');
  const [chatLog, setChatLog] = useState<
    { text: string; from: 'me' | 'other' }[]
  >([]);
  const socketRef = useRef<WebSocket | null>(null);
  const addMsg = useMsgAlertStore((state) => state.addMsg);
  const clearMsg = useMsgAlertStore((state) => state.clearMsg);
  const msgAlert = useMsgAlertStore((state) => state.newMsg);

  useEffect(() => {
    socketRef.current = new WebSocket('wss://ws.ifelse.io');

    socketRef.current.onmessage = (event) => {
      if (event.data.startsWith('Request served by')) return;
      addMsg(event.data);
      setChatLog((prev) => [...prev, { text: event.data, from: 'other' }]);

      setTimeout(() => clearMsg(), 3000);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [addMsg, clearMsg]);

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
      setChatLog((prev) => [...prev, { text: msg, from: 'me' }]);
      setMsg('');
    }
  };

  return (
    <div className='relative'>
      {msgAlert && (
        <div className='p-2 mt-2 bg-yellow-200 rounded-md fixed top-0 right-2 w-[69%]'>
          📩 메시지 도착!
        </div>
      )}
      <div className='flex flex-col gap-3'>
        <div
          className='w-full h-[92vh] overflow-y-auto flex flex-col gap-2'
          id='msgBox'
        >
          {chatLog.length === 0 ? (
            <p className='text-gray-400'>메시지를 입력해보세요.</p>
          ) : (
            chatLog.map((v, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-lg max-w-[70%] break-words ${
                  v.from === 'me'
                    ? 'bg-blue-500 text-white ml-auto'
                    : 'bg-gray-200 text-black mr-auto'
                }`}
              >
                {v.text}
              </div>
            ))
          )}
        </div>
        <form onSubmit={sendMsg} className='flex gap-3'>
          <input
            className='w-[80%]'
            type='text'
            name='message'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button className='w-[20%]' type='submit'>
            전송
          </button>
        </form>
      </div>
    </div>
  );
}
