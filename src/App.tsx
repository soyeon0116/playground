import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <div>
        <nav>
          <h1>연습 리스트</h1>
          <Link to='/Zod'>zod 연습</Link>
        </nav>
      </div>
      <AppRoutes />
    </>
  );
}

export default App;
