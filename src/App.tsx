import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useMsgAlertStore } from './store/msgAlertStore';
import MsgAlertModal from './components/MsgAlertModal';

function App() {
  const msgAlert = useMsgAlertStore((state) => state.newMsg);
  return (
    <>
      <div className='h-screen'>
        <nav className='w-[200px] h-full border-r border-gray-500 p-2 fixed left-0 top-0'>
          <div className='flex justify-between'>
            <h1>연습 리스트</h1>
            {msgAlert && <span className='bg-yellow-200 rounded-md'>✉️</span>}
          </div>
          <Link to='/Zod' className='cursor-pointer hover:text-blue-500 block'>
            1. zod 연습
          </Link>
          <Link
            to='/WebSocket'
            className='cursor-pointer hover:text-blue-500 block'
          >
            2. WebSocket 연습
          </Link>
          <Link
            to='/Jotai'
            className='cursor-pointer hover:text-blue-500 block'
          >
            3. Jotai 연습
          </Link>
        </nav>
        <div className='p-2 ml-[200px]'>
          <AppRoutes />
        </div>
      </div>
      {msgAlert && <MsgAlertModal />}
    </>
  );
}

export default App;
