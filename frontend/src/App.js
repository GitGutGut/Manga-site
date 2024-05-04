import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./register";
import Home from "./home";
import Login from "./login";
import { AuthProvider } from './authContext';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path='/login' element={<Login />} />
            </Routes>
          </div>
          <div className="component">
            <h1> NAJLEPSIA STRANKA</h1>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;