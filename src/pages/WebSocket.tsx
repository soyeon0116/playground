import React, { useEffect, useRef, useState } from 'react';

export default function WebSocketChat() {
  const [msg, setMsg] = useState('');
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [alert, setAlert] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket('wss://ws.ifelse.io');

    socketRef.current.onmessage = (event) => {
      if (event.data.startsWith('Request served by')) return;
      setChatLog((prev) => [...prev, event.data]);
      setAlert('📩 메시지 도착!');

      setTimeout(() => setAlert(null), 3000);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
      setMsg('');
    }
  };

  return (
    <div>
      {alert && (
        <div className='p-2 mt-2 bg-yellow-200 rounded-md'>{alert}</div>
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
