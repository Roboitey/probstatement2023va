import "./App.css";
import NavBar from "./Main_Components/navBar";
import Home from "./Main_Components/Home";
import Profiles from "./Main_Components/Profiles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home/>}/>
          <Route path="/profile" element={<Profiles/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
