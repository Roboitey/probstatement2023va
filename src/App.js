import "./App.css";
import Home from "./Main_Components/Home";
import Profiles from "./Main_Components/Profiles";
import Opportunity from "./Main_Components/Opportunity";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Main_Components/Layout";
import Login from "./Main_Components/Login";
import NotFound from "./Main_Components/NotFound";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route index element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

