import "./Chat.css";
import React, {useContext, useState, useEffect} from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; //for styling our syntax on website on chatWindow

//react-markdown //rehype-highlight

function Chat(){
    const {newChat, prevChats, reply} = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    useEffect (()=>{
       if(reply === null){
          setLatestReply( null); //prev chat load
          return;
       }

        //latestReply separate => typing effect create
        if(!prevChats?.length) return;

        const content = reply.split(" "); //individual word is stored
        let idx =0;
        const interval = setInterval(() =>{
           setLatestReply(content.slice(0, idx+1).join(" "));
           idx++;
           if(idx >= content.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);

    }, [prevChats, reply])

    return (
        <>
         {newChat && <h1>Start a New Chat!</h1>}
         <div className="chats">
            {
                prevChats?.slice(0, -1).map((chat, idx)=> //latest reply show nhi hoga
                  <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}> 
                       {
                        chat.role === "user" ? 
                        <p className="userMessage">{chat.content}</p> :  
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                       }
                  </div>
                )
            }

            {/* Ternary operation for writing conditional statement */}
            {
               prevChats.length > 0 && (
                  <>
                   {
                     latestReply === null ? (
                         <div className="gptDiv" key={"non-typing"}>
                           <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                        </div>
                     ) : (
                         <div className="gptDiv" key={"typing"}>
                           <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                        </div>
                     )
                   }
                  </>
               )
            }
   
             


             {/* without using ternary operator */}

             {/* {
                prevChats.length > 0 && latestReply !== null && 
                <div className="gptDiv" key={"typing"}>
                   <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                </div>
             }

             {
                prevChats.length > 0 && latestReply === null && 
                <div className="gptDiv" key={"non-typing"}>
                   <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                </div>
             } */}


            {/* static data
            <div className="userDiv">
               <p className="userMessage"></p>
            </div>
            <div className="gptDiv">
               <p className="gptMessage"></p>
            </div> */}
         </div>
        </>
    )
}

export default Chat;