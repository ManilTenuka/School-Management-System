import './App.css';
import Router from './router/Router';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div>
  
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
