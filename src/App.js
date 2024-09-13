import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/ui/Layout';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import PrivateRoute from './PrivateRoute';
import Dashboard from './pages/Dashboard';
import ArticleSearch from './pages/ArticleSearch';
import ProfilePage from './pages/Profile';

function App() {
  return (
  <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage /> } />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="articles" element={<PrivateRoute component={ArticleSearch} />} />
          <Route path="me" element={<PrivateRoute component={ProfilePage} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
