import { useState,useEffect } from 'react';
import './App.css';

const getStorage = () =>{
  const list = localStorage.getItem('list');
  if(list){
    return JSON.parse(list)
  }
  else{
    return []
  }
}

function App() {

  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [data, setdata] = useState(getStorage)
  const [message, setmessage] = useState({show:false,msg:'',color:''})

  // signup 
  const signUp =() => {
    if(username !== '' && password !== ''){
      const id = new Date().getTime().toString();
      const item = {
        id: id,
        username: username,
        password: password
      }

      setdata([...data,item])
      setmessage({show:true,msg:'successfully Created your account',color:'green'})
      setusername('')
      setpassword('')
      
    }
  }

  // LogIn
  const logIn =()=> {
    const filtered = data.filter((item) => item.username === username && item.password === password)
    if(username !== '' && password !== ''){
      if(Object.keys(filtered).length !== 0){
        setmessage({show:true,msg:'Logged In to your account',color:'green'})
      }
      else{
        setmessage({show:true,msg:'No data found.',color:'red'})
      }
    }
  }

  useEffect(() => {
    localStorage.setItem('list',JSON.stringify(data))
  }, [data])
  return (
    <div>
      <div className="bg"></div>
      <div className="App">
        <div className="container">
          <h1>User-Authentication</h1>
          {message.show && <p style={{backgroundColor : message.color }} className="alert">{message.msg}</p> }
          <input type="text" onChange={(e) => {setusername(e.target.value)}} placeholder="Username" value={username} />
          <input type="password" onChange={(e) => {setpassword(e.target.value)}} placeholder="Password" value={password}/>
          <button className="login" onClick={logIn}>Log In</button>
          <button className="signup" onClick={signUp}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default App;
