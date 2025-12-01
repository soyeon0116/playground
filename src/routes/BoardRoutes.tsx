import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardList from '../pages/board/BoardList';
import BoardDetail from '../pages/board/BoardDetail';

export default function BoardRoutes() {
  return (
    <Routes>
      <Route path='/board' element={<BoardList />} />
      <Route path='/board/:id' element={<BoardDetail />} />
    </Routes>
  );
}
