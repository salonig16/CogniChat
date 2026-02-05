import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from './MyContext.jsx';
import {useState} from 'react';
import {v1 as uuidv1} from "uuid";

function App() {
  const [prompt, setPrompt] = useState(""); //prompt msg from user
  const [reply, setReply] = useState(null); //reply from back end
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
  const [newChat, setNewChat] = useState(true); //tracks if the new chat is created
  const [allThreads, setAllThreads] = useState([]); // store all threads history 

  const providerValues ={
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
  };  //object which has passing values from MyContext statevariable
  return (
    <div className='app'>
      <MyContext.Provider value = {providerValues}>
         <Sidebar></Sidebar>
         <ChatWindow></ChatWindow>
       </MyContext.Provider>
    </div>
  )
}

export default App
