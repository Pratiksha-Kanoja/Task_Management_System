// import './App.css';
import Addtask from './Mainpages/Addtask';
import { Route,Routes } from 'react-router-dom';
import Homepage from './Mainpages/Homepage';
import Viewtask from './Mainpages/Viewtask';
import Edittask from './Mainpages/EditTask';
import Login from './Mainpages/Login';
import Register from './Mainpages/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route exact path='/addtask' element={<Addtask/>} />
        <Route exact path='/viewtask' element={<Viewtask/>}/>
        <Route exact path='/edittask/:id' element={<Edittask/>}/>
        <Route exact path='/userlogin' element={<Login/>}/>
        <Route exact path='/userregister' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
