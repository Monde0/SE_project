import React from 'react';
import './App.css';
import HomeBackGround from './pictures/background.png'
import Navi from './web-components/Navigationbar'

function App() {
  return (

    <div>

      {/* navigation bar */}

      <Navi />

      {/* body part */}
      <div className = "bg" style={{backgroundImage:  `url(${HomeBackGround})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
      }}>

        <div className = "page" style={{backgroundColor:"white", width:"1250px", marginLeft:"150px",
                                        marginRight:"200px", opacity:0.85}}>

              {/* Head */}

              <div>
                    <h1 style={{marginLeft:"50px", color:"darkblue", marginTop:"75px"}}>Register as customer</h1>
              </div>

              {/* Body */}
              

        </div>
          
      </div>
      
      
    </div>

  );
}

export default App;
