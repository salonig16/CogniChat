import "./Sidebar.css";
import { MyContext } from './MyContext.jsx';
import {useContext, useEffect} from 'react';
import {v1 as uuidv1} from "uuid";

function Sidebar(){
  const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

  const getAllThreads = async () =>{ 

    try{
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      //title, threadId
      const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
      console.log(filteredData);
      setAllThreads(filteredData);
    } catch(err){
        console.log(err);
    }
  };

  useEffect(() =>{ //thread ko change ya new chat create krte time threadId change hoti so will call getAllThread func
    getAllThreads();
  }, [currThreadId])

  const createNewChat = () =>{ //creating new chat
    setNewChat(true);
    setPrompt("");
    setReply(null); //backends data is coming in form of object
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  }

  const changeThread = async (newThreadId)=>{
     setCurrThreadId(newThreadId);

     try{
       const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
       const res = await response.json();
       console.log(res);
       setPrevChats(res);
       setNewChat(false);
       setReply(null);
     } catch(err){
       console.log(err);
     }
  }

  const deleteThread = async (threadId) =>{
    try{
      const response =  await fetch(`http://localhost:8080/api/thread/${threadId}`, {method: "DELETE"});
      const res = await response.json();
      console.log(res);

      //updated thread re-render after deleting chat hume page refresh na krna pade
      setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

      if(threadId === currThreadId){
        createNewChat();
      }

    } catch(err){
      console.log(err);
    }
  }

   return(
    <section className="sidebar">
       {/* new chat button */}
       <button onClick={createNewChat}>
         <img src="src/assets/blacklogo.png" alt="GPT logo" className="logo"></img>
         <span><i className="fa-solid fa-pen-to-square"></i></span>
       </button>

       {/* /history */}
        <ul className="history">
          {/* displaying our chat title  */}
          {
            allThreads?.map((thread, idx) =>(
              <li key={idx}
                onClick={ () => changeThread(thread.threadId)}
                className={thread.threadId === currThreadId ? "highlighted" : " "}
              >{thread.title}
               <i className="fa-solid fa-trash"
                   onClick={(e) =>{
                      e.stopPropagation(); //stop event bubbling- child element(button) pr kuch event triggr krna h pr vo parent element(list) pr bhi ho rha h 
                      deleteThread(thread.threadId);
                   }}
               ></i>
              </li>
            ))
          }
        </ul>

       {/* sign */}
       <div className="sign">
         <p>By Saloni Gupta &hearts; </p>
       </div>
    </section>
   )
}

export default Sidebar;