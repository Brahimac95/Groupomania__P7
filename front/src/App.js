import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Mypost from "./Pages/MyPost";
import UpdatePost from "./Pages/UpdatePost";
import ErrorPage from "./Pages/ErrorPage";
import Profile from "./Pages/Profile";

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/post/:id" element={<UpdatePost/>}/>
        <Route path="/mypost" element={<Mypost/>}/>
        <Route path="/profil" element={<Profile/>}/>
        <Route path="/*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
