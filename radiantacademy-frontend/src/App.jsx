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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/guides" element={<GuideList />} />
      <Route path="/guides/create" element={<CreateGuide />} />
      <Route path="/guides/:id" element={<GuideDetail />} />

      <Route path="/agents" element={<AgentList />} />
      <Route path="/agents/:agentName" element={<AgentGuide />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
