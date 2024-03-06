import React from "react";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./component/Navbar";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

const App = () => {

  return (
    <>
    <Navbar />
    <Routes >
      <Route element={<PrivateRoutes />}>
        <Route path="/notes" element={<Notes />} />
      </Route>
     <Route path="/" element={<Home />} />
     <Route path="/register" element={<Register />} />
     <Route path="/login" element={<Login />} />
     </Routes>
    </>
  )
 
};

export default App;
