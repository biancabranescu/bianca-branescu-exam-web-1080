import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import './App.css';
import NewList from "./components/NewList";
import Video from "./components/Video";
import NewVideo from "./components/newVideo";
import EditList from "./components/EditList";
import EditVideo from "./components/EditVideo";


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/newList" element={<NewList />} />
      <Route path="/editList/:id" element={<EditList />} />
      <Route path="/editVideo/:id/:idVideo" element={<EditVideo />} />
      <Route path="/lista/:id/video/:idVideo" element={<Video/>}/>
      <Route path="/newVideo/:id" element={<NewVideo/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
