import React, { useEffect, useRef, useState } from 'react';
import { useMsgAlertStore } from '../store/msgAlertStore';

export default function WebSocketChat() {
  const [msg, setMsg] = useState('');
  const [chatLog, setChatLog] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const addMsg = useMsgAlertStore((state) => state.addMsg);
  const clearMsg = useMsgAlertStore((state) => state.clearMsg);
  const msgAlert = useMsgAlertStore((state) => state.newMsg);

  useEffect(() => {
    socketRef.current = new WebSocket('wss://ws.ifelse.io');

    socketRef.current.onmessage = (event) => {
      if (event.data.startsWith('Request served by')) return;
      addMsg(event.data);
      setChatLog((prev) => [...prev, event.data]);
      // setAlert('📩 메시지 도착!');

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
      setMsg('');
    }
  };

  return (
    <div>
      {msgAlert && (
        <div className='p-2 mt-2 bg-yellow-200 rounded-md'>📩 메시지 도착!</div>
      )}
      <form onSubmit={sendMsg}>
        <input
          type='text'
          name='message'
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type='submit'>전송</button>
      </form>
      <div>
        {chatLog.map((v, i) => (
          <p key={i}>{v}</p>
        ))}
      </div>
    </div>
  );
}
