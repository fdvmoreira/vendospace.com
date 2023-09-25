import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RestrictedArea from "../../../components/RestrictedArea";
import SpaceManager from "../../../components/space/SpaceManager";
import { useAuth } from "../../../context/authContext";

const SpaceEdit = () => {

  let {sid} = useRouter().query;
  let [space, setSpace] = useState();

  let [auth, _] = useAuth();

  useEffect(()=>{
    let API_SPACE = `/api/v1/spaces/${sid??0}`;

    fetch(API_SPACE, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token??null}`,
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data?.success) setSpace(()=>data?.data);
    })
    .catch(console.error);
  },[]);

  if(!auth?.isAuthenticated) return <RestrictedArea/>

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center">
        <p className="lead">Change ad space </p>
        <hr className=""/>
        <SpaceManager 
          requestMethod={'PATCH'} 
          spaceAPI={`/api/v1/users/${auth?.user?._id??0}/spaces/${space?._id??0}`} 
          space={space}/>
      </div>
    </div>
  )
}

export default SpaceEdit;