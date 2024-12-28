import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import Layout from "./layout/Layout";
import { Toaster } from "react-hot-toast";
import AddEvent from "./pages/AddEvent";
import UpdateEvent from "./pages/UpdateEvent";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/events" element={<Events />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/update/:id" element={<UpdateEvent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
