
"use client"

import { BaseMessage } from "langchain"
import { useEffect, useState } from "react"

export default function ChatbotWindow(){
    const [messages, setMessage]=useState<{ role: string; content: string }[]>([]);
    const [human_message, setHumanMessage]=useState<string>("")

    // useEffect(()=>{
    //    fetch("/api/agent")
    //    .then(response=>response.json())
    //    .then(data=>setMessage(data.message_history))
    //    .catch(error=>console.error(error))
    // }, [])

    const handle_submit=(e: React.FormEvent)=>{
        if(!human_message.trim()){return;}
        e.preventDefault()
        console.log(JSON.stringify(human_message));
        fetch("/api/agents/general", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({human_message}),
        })
        .then(response=>response.json())
        .then(data=>setMessage(data.updated_memory))
        .catch(error=>console.error(error))
        // console.log(messages);

        setHumanMessage("");
    }

    return <div id="chatbot">
        <div id="chat-window-div">
        <h3>chat</h3>
        <div className="messages">
            {messages.map((message, index)=>(
                <div 
                    key={index}
                    className={message.role === 'HumanMessage' ? 'human-msg' : 'bot-msg'}
            >{message.content}</div>
            ))}
        </div>
        <form onSubmit={handle_submit} className="user-input-form">
            <input type="text" placeholder="Ask the chatbot!" value={human_message} onChange={e=>setHumanMessage(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
        </div>
    </div>
}