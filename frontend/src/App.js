import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./user/register";
import Home from "./readManga/home";
import Login from "./user/login";
import { AuthProvider, useAuth } from './components/authContext';
import AddManga from './manga/addManga';
import ViewChapter from './readManga/viewChapter';
import UpdateManga from './manga/updateManga';
import ViewManga from './manga/viewManga';

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
              <Route exact path='/manga/:mangaId' element={<ViewManga />} />
              <Route exact path='/manga/:mangaId/:chapterId/:index' element={<ViewChapter />} />
              {
                <><Route exact path='/manga/:mangaId/update' element={<UpdateManga />} />
                  <Route exact path='/addManga' element={<AddManga />} />
                </>}
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