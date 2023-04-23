import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import MessageReplyButton from "./MessageReplyButton";

const USERS_API = '/api/v1/users';

const MessageCard = ({from, subject, message, createdAt}) =>{
  const [name, setName] = useState();
  const [auth,_] = useAuth();

  useEffect(()=>{
    fetch(`${USERS_API}/${from}/name`, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${auth.token}`,
      },
    })
    .then(res => res.json())
    .then(data => setName(data?.data?.name))
    .catch(console.error);
  },[])

  return (
    <div className="card my-2">
    <div className="card-header">
      <span className="text-muted">From: {(name)??"..."}</span>
      <p className="fw-bold">{subject.toUpperCase()}</p>
      </div>
    <div className="card-body"><p>{message}</p> {message&&<MessageReplyButton to={from}/>}</div>
    <div className="card-footer text-muted">{new Date(createdAt).toLocaleString('en-GB')}</div>
  </div>
  )
}

export default MessageCard;