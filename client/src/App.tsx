import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from '@/pages/ChatPage';
import { Toaster } from 'sonner';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <>
      <Toaster theme="dark" position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
