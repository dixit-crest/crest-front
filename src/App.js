import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedLayout from "./layout/ProtectedLayout";
import PublicLayout from "./layout/PublicLayout";
import { publicRoutes, protecedRoutes } from "./routes";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {
            publicRoutes.map(route => <Route path={route.path}
              element={
                <PublicLayout>
                  {route.component}
                </PublicLayout>
              }
            />)
          }

          {
            protecedRoutes.map(route => <Route path={route.path}
              element={
                <ProtectedLayout>
                  {route.component}
                </ProtectedLayout>
              }
            />)
          }
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
