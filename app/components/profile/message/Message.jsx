import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import MessageCard from "./MessageCard";

const USER_MESSAGES_API = '/api/v1/users';

const Message = () =>{
  const [auth, _] = useAuth();
  const [messages, setMessages] = useState([]);
  const ms = [
  {
    from: "alice@example.com",
    to: "bob@example.com",
    subject: "Meeting Reminder",
    message: "Hey Bob, just a reminder that we have a meeting at 2pm today. See you there!",
    createdAt: new Date("2023-04-13T09:30:00Z")
  },
  {
    from: "bob@example.com",
    to: "alice@example.com",
    subject: "RE: Meeting Reminder",
    message: "Thanks Alice, I'll be there on time.",
    createdAt: new Date("2023-04-13T10:15:00Z")
  },
  {
    from: "charlie@example.com",
    to: "alice@example.com",
    subject: "New Project Proposal",
    message: "Hi Alice, I have a proposal for a new project that I think you'll be interested in. Let's discuss it at the meeting today.",
    createdAt: new Date("2023-04-13T11:00:00Z")
  },
  {
    from: "alice@example.com",
    to: "charlie@example.com",
    subject: "RE: New Project Proposal",
    message: "Sounds interesting, Charlie. Looking forward to discussing it.",
    createdAt: new Date("2023-04-13T11:30:00Z")
  },
  {
    from: "dave@example.com",
    to: "alice@example.com",
    subject: "Vacation Request",
    message: "Hi Alice, I'd like to request some time off next month. Can we schedule a meeting to discuss it?",
    createdAt: new Date("2023-04-14T08:45:00Z")
  }
  ];

  useEffect(()=>{
    fetch(`${USER_MESSAGES_API}/${auth?.user?._id??0}/messages`,{
      method: "GET",
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token}`,
      }
    })
    .then(response => response.json())
    .then(data => setMessages(data.data))
    .catch(console.error);
  },[]);

  if(!messages?.length) return <p className="text-muted">No new messages</p>
  return (
    <ul className="list-unstyled">
      {
        messages?.length&&messages.map((message, index)=>{
        return (
        <li key={index} >
          <MessageCard {...message} message={message?.text}/>
        </li>
        );
      })
      }
    </ul>
  )
}


export default Message;