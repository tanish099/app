
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar';
import Home from './component/Home';
import Paste from './component/Paste';
import Viewpaste from './component/Viewpaste';

function App() {
const router=createBrowserRouter(
  [
    {
       path:"/",
       element:
        <div>
     <Navbar />
      <Home />
        </div>
    },

    {
      path:"/pastes",
      element:
       <div>
          <Navbar />
          <Paste />
       </div>
   },

   {
    path:"/pastes/:id",
    element:
     <div>
    <Navbar />
    <Viewpaste />
     </div>
 },

  ]
);

  return (
    <div>
      <RouterProvider router={router} />

    
    </div>
  )
}

export default App
