import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';

export default function App() {
    return <Router>
        {/*<ul>
            <li>
                <Link to="/">Home</Link>
            </li>

        </ul>
        <hr />
        */}

        <Routes>
            <Route exact path="/" key="/" element={<HomePage />} />
            <Route path="*" key="*" element={<></>} />
        </Routes>
    </Router>;
}
