import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import News from './Components/News';
import Signin from './Components/signin/Signin';
import Signup from './Components/signup/Signup';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/news' element={<News />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
