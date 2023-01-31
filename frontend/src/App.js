import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { SignUp } from './components/SignUp';
function App() {
  return (
    <div className='app'>
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="/" element={<h1> This is prodct pge </h1>}/>
          <Route path="/chart" element={<h1>This is Add to chart page</h1>}/>
          <Route path="/login" element={<h1> This is Login page </h1>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/logout" element={<h1>This is logout</h1>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;