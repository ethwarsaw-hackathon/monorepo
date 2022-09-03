import './App.css';
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import { LandingPage } from './views/LandingPage';
import { TwitterConnection } from './views/Connected';
import { Done } from './views/Done';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="twitter" element={<TwitterConnection />} />
        <Route path="sent" element={<Done />} />
      </Routes>
    </BrowserRouter>
  );
}
