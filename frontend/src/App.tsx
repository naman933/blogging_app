import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { useCookies } from "react-cookie";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  return (
    <div className='h-screen w-screen '>
      <BrowserRouter>
      {cookie.token ? (
        <Routes>
        <Route path="*" element={<Blog />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
      ) : (
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      )
      }
      </BrowserRouter>
    </div>
  )
}

export default App
