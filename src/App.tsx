import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import TransactionDetailsPage from "./pages/TransactionDetailsPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions/:transactionId"
            element={
              <ProtectedRoute>
                <TransactionDetailsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer theme="dark" autoClose={1000} />
    </>
  );
}

export default App;
