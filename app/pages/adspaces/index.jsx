import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import RestrictedArea from "../../components/RestrictedArea";
import SpaceCard from "../../components/space/SpaceCard";
import { useAuth } from "../../context/authContext";
import notify from "../../utils/notify";

const SpaceList = ()=> {

  let router = useRouter();
  let [auth,_] = useAuth();
  let [adspaces, setAdspaces] = useState();

  useEffect(()=>{
    fetch(`/api/v1/users/${auth?.user?._id??0}/spaces`,{
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token}`, 
      },
    })
    .then(response => response.json())
    .then(data => {
      if(data?.success) setAdspaces(data?.data);
    })
    .catch(console.error);

  },[]);

  const editSpace = (space) =>{
    let searchParams = new URLSearchParams(space);
    router.push(`/adspaces/${searchParams.get('_id')}/edit`);
  }

  const deleteSpace = (id)=>{
    const SPACE_DELETE_API = `/api/v1/users/${auth?.user?._id??0}/spaces/${id??0}`;

    fetch(SPACE_DELETE_API,{
      method: 'DELETE',
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token}`,
      }
    })
    .then(response => response.json())
    .then(data => {
      notify(data?.message, data?.success);
      setAdspaces(adspaces.filter(space => (space?._id != id)));

      if(data?.success){
        setAdspaces(adspaces.filter(space => space?._id != id));
      }
    })
    .catch(console.error);
  }

  if(!auth?.isAuthenticated) return <RestrictedArea/>
  
  if(!adspaces?.length) return (
  <div className="lead d-flex flex-column align-items-center gap-2">
    <p>You haven't created any ad space yet.</p>
    <p>
      <Link href="/adspaces/new" className="btn btn-primary bi bi-plus-lg">&nbsp;create new ad space</Link>
    </p>
    <ToastContainer/>
  </div>
  )

  return (
    <div className='container'>
      <ul className="list-unstyled d-flex gap-2 justify-content-center">
        {
          adspaces?.map(space =>{
            return (
              <li key={space?._id}>
                {
                  auth?.isAuthenticated&&(
                  <div className="d-flex bg-light justify-content-end gap-2 mb-1">
                    <button className="bi bi-pen btn btn-sm btn" onClick={()=>editSpace(space)}>&nbsp;edit</button>
                    <button className="btn btn-sm btn-danger" 
                    onClick={()=>deleteSpace(space?._id)}><i className="bi bi-x-lg"></i>&nbsp;delete</button>
                  </div>)
                }
                <SpaceCard data={space}/>
              </li>
            )
          })
        }
      </ul>
      <ToastContainer/>
    </div>
  );
}

export default SpaceList;