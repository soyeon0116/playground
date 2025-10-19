import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Zod from '../pages/Zod';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/Zod' element={<Zod />} />
    </Routes>
  );
}
