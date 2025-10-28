import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <div className='flex gap-3 h-screen'>
        <nav className='w-44 border-r border-gray-500 p-2'>
          <h1>연습 리스트</h1>
          <Link to='/Zod' className='cursor-pointer hover:text-blue-500'>
            1. zod 연습
          </Link>
        </nav>
        <div className='p-2'>
          <AppRoutes />
        </div>
      </div>
    </>
  );
}

export default App;
