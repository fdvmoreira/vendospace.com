import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import SpaceCard from "../space/SpaceCard";

const AuctionItem = ({spaceId}) => {

  let [auth] = useAuth();
  let [space, setSpace] = useState();

  useEffect(()=>{
    if(auth?.isAuthenticated) getSpace();
  },[]);

  const getSpace = () => {
    const SPACE_API = `/api/v1/users/${auth?.user?._id??0}/spaces/${spaceId??0}`;
    fetch(SPACE_API, {
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token}`,
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data?.success) setSpace(data?.data);
    })
    .catch(console.error);
  };
  
  return (
    <SpaceCard data={space}/>
  );
}

export default AuctionItem;