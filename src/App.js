import "./App.css";
import Home from "./Main_Components/Home";
import Profiles from "./Main_Components/Profiles";
import Opportunity from "./Main_Components/Opportunity";
import ForgotPassword from "./Main_Components/forgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Main_Components/Layout";
import Login from "./Main_Components/Login";
import NotFound from "./Main_Components/NotFound";
import SignUp from "./Main_Components/signup";
import Admin from "./Main_Components/admin";
import Feed from "./Main_Components/feed";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/opportunity" element={<Opportunity />} />
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/forget-pass" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profiles />} />
            <Route path="/profile/:userId" element={<Profiles />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/feed" element={<Feed />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
