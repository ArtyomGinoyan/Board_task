import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/autorization/Login";
import Register from "./pages/autorization/Register";
import AuthLayout from "./layouts/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";
import { Board } from "./pages/board/Board";
import NotFound from "./pages/notfound/NotFound";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Board />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
