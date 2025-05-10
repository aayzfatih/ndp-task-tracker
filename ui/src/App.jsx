import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import User from './pages/User';
import Task from './pages/Task';
import Save from './pages/User/Save';
import 'bootstrap/dist/css/bootstrap.min.css';
import SaveTask from './pages/Task/Save';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ padding: '30px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<User />} />
            <Route path="/users/add" element={<Save />} />
            <Route path="/users/detail/:userId" element={<Save />} />
            <Route path="/task" element={<Task />} />
            <Route path="/task/add" element={<SaveTask />} />
            <Route path="/task/detail/:taskId" element={<SaveTask />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
