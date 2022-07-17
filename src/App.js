import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage';
import Toolbar from './components/Toolbar';
import CreateAccountPage from './pages/CreateAccountPage';
import { LoginPage } from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AllUsersPage from './pages/AllUsersPage';
import UserPage from './pages/UserPage';
import ChatsPage from './pages/ChatsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toolbar />
        <Routes>
          <Route path={'/'} element={<IndexPage />}/>
          <Route path={'/create-account'} element={<CreateAccountPage />}/>
          <Route path={'/login'} element={<LoginPage />}/>
          <Route path={'/profile'} element={<ProfilePage />}/>
          <Route path={'/users'} element={<AllUsersPage />}/>
          <Route path={'/user/:username'} element={<UserPage />}/>
          <Route path={'/chat/:chatId'} element={<ChatsPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
