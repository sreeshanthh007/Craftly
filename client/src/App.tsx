import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from '@/pages/ChatPage';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <>
      <Toaster theme="dark" position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
