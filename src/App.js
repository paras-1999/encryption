import {Route,Routes,BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout';
import Login from './Components/Login';
import Signup from './Components/Signup';
const App= () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/sign"exact element={<Signup />} />
        <Route path="/dash" exact  element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
