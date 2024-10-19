import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Todos from './components/Todos'

 function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/Signin" element={<Signin/>} />
        <Route path="/todos" elemnet={<Todos/>}/>
      </Routes>
    </Router>
  );
}



export default App