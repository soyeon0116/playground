import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Zod from '../pages/Zod';
import WebSocketChat from '../pages/WebSocket';
import Home from '../pages/Home';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/playground' element={<Home />} />
      <Route path='/Zod' element={<Zod />} />
      <Route path='/WebSocket' element={<WebSocketChat />} />
    </Routes>
  );
}
