import { Route, Routes } from "react-router-dom";
import Board from "./pages/board/Board";
import NotFound from "./pages/notfound/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";
import Login from "./pages/autorization/Login";
import Register from "./pages/autorization/Register";

import appStyles from "./app.module.css";

const App = () => {
  return (
    <div className={appStyles.App}>
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
