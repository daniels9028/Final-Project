import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home, Login, Page404, Register, MyProfile } from "./pages/index";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import DetailPost from "./pages/Post/DetailPost";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/detail_post"
            element={
              <ProtectedRoute>
                <DetailPost />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
