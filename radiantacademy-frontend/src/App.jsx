import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import GuideList from './pages/GuideList';
import GuideDetail from './pages/GuideDetail';
import CreateGuide from './pages/CreateGuide';

import AgentList from './pages/AgentList';
import AgentGuide from './pages/AgentGuide';

import NotFound from './pages/NotFound';
import MainLayout from './components/MainLayout';

import BrimstonePage from "./pages/BrimstonePage";

function App() {
  return (
    <Routes>
      {/* Halaman tanpa Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Halaman dengan Navbar */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/guides"
        element={
          <MainLayout>
            <GuideList />
          </MainLayout>
        }
      />
      <Route
        path="/guides/create"
        element={
          <MainLayout>
            <CreateGuide />
          </MainLayout>
        }
      />
      <Route
        path="/guides/:id"
        element={
          <MainLayout>
            <GuideDetail />
          </MainLayout>
        }
      />
      <Route
        path="/guides/edit/:id"
        element={
          <MainLayout>
            <CreateGuide />
          </MainLayout>
        }
      />
      <Route
        path="/agents"
        element={
          <MainLayout>
            <AgentList />
          </MainLayout>
        }
      />
      <Route
        path="/agents/:agentName"
        element={
          <MainLayout>
            <AgentGuide />
          </MainLayout>
        }
      />

      {/* Not Found */}
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        }
      />
       <Route path="/agents/brimstone" element={<BrimstonePage />} />
    </Routes>
  );
}

export default App;
