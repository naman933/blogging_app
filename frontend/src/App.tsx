import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { HomePage } from './pages/HomePage'
import { MyBlogs } from './pages/MyBlogs'
import { Gallery } from './pages/Gallery'
import { useCookies } from "react-cookie";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  return (
    <div className='h-screen w-screen '>
      <BrowserRouter>
      {cookie.token ? (
        <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/gallery" element={<Gallery />} />
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
