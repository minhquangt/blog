import './App.css';
import Navbar from './components/Navbar';
import Pages from './pages';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="content">
                <Pages />
            </div>
        </div>
    );
}

export default App;
