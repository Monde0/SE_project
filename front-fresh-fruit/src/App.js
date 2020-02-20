import React,{useState} from 'react';
import Navi from './web-components/Navigationbar';
import Home from './Page/HomePage';
import Register from './Page/Register';
import RegisterSeller from './Page/RegisterSeller';
import Profile from './Page/Profile';
import Seller from './Page/Seller';
import Signin from './Page/Signin';
import Store from './Page/Store';
import AddItem from './Page/AddItem';
import EditProfile from './Page/EditProfile';
import EditStore from './Page/EditStore';
import UserContext from './Context/UserContext';


import HomePage from './Page/HomePage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddItemform from './web-components/AddItemform';
function App() {
  const [isloggedin,setIsloggedin] = useState(false)
  const [username,setUsername] = useState("")
  const [token,setToken] = useState("")
  function handleIsloggedin(){
    if (isloggedin){
      setIsloggedin(false)
    }else{
      setIsloggedin(true)
    }
    console.log(isloggedin)
  }
  function handleSetUsername(username){
    setUsername(username);
  }
  function handleSetToken(token){
    setToken(token);
  }
  function clearToken(){
    setToken("");
  }
  return (
    <div>

      {/* navigation bar */}



      {/* body part */}

      <Navi />
      <Router>
        {/* body part */}
        <Switch>
          <UserContext.Provider value={{google:'this is evil company',isloggedin:`${isloggedin}`,setLogin:handleIsloggedin,setToken:handleSetToken,usertoken:`${token}`,clearToken:clearToken,username:`${username}`,setUsername:handleSetUsername}}>
          <Route exact path='/' component={Home} />
          {token!=null ? (<Route path='/profile' component={Profile} />):(<Route path='/profile' component={Signin} />)}
          
          <Route path='/seller' component={Home} />
          <Route path='/register' component={Home} />
          <Route path='/registerSeller' component={RegisterSeller} />
          <Route path='/Signin' component={Signin} />
          <Route path='/store' component={Store} />
          <Route path='/EditProfile' component={EditProfile} />
          <Route path='/EditStore' component={EditStore} />
          <Route path='/addItem' component={AddItemform} />
          </UserContext.Provider>
        </Switch>
      </Router>
    </div>


  );
}

export default App;
