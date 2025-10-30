import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Zod from '../pages/Zod';
import WebSocketChat from '../pages/WebSocket';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/Zod' element={<Zod />} />

      <Route path='/WebSocket' element={<WebSocketChat />} />
    </Routes>
  );
}
