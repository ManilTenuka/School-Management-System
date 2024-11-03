import './App.css';
import Router from './router/Router';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './pages/authentication/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <div>
        <RouterProvider router={Router} />
      </div>
    </AuthProvider>
  );
}

export default App;
