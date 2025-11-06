import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Zod from '../pages/Zod';
import WebSocketChat from '../pages/WebSocket';
import Home from '../pages/Home';
import Jotai from '../pages/Jotai';
import HookForm from '../pages/HookForm';
import Jest from '../pages/Jest';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/playground' element={<Home />} />
      <Route path='/Zod' element={<Zod />} />
      <Route path='/WebSocket' element={<WebSocketChat />} />
      <Route path='/Jotai' element={<Jotai />} />
      <Route path='/HookForm' element={<HookForm />} />
      <Route path='/Jest' element={<Jest />} />
    </Routes>
  );
}
