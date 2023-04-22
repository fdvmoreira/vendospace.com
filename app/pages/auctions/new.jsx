import Link from "next/link";
import { useEffect, useState } from "react";
import RestrictedArea from "../../components/RestrictedArea";
import AuctionForm from "../../components/auction/AuctionForm";
import SpaceCard from "../../components/space/SpaceCard";
import { useAuth } from "../../context/authContext";

const AuctionCreate = ({ data })=> {
  
  const [auth, _] = useAuth();
  let [spaces, setSpaces] = useState();
  let [selectedSpace, setSelectedSpace] = useState();

  useEffect(()=> {
    if (auth?.isAuthenticated) loadSpaces();
  }, []);

  const loadSpaces = ()=> {
    const SPACE_API = `/api/v1/users/${auth?.user?._id??0}/spaces`;
    fetch(SPACE_API, {
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token??null}`,
      }
    })
    .then(res=>res.json())
    .then(data=>{
      if(data?.success) setSpaces(data?.data);
    })
    .catch(console.error);
  };

  if(!auth?.isAuthenticated) return <RestrictedArea/>

  if(auth?.isAuthenticated && !spaces?.length) {
    return (
      <div className="lead text-center">
        <p>You have not create any space</p>
        <Link href='/adspaces' className="btn btn-lg btn-primary">create new ad space</Link>
      </div>)
  }

  return (
    <div className="container">
      <ul className="d-flex gap-4 flex-column align-items-center list-unstyled">
        {
          spaces?.map(space =>{
            return (
              <li key={space?._id} className="bg-light card">
                <div className="card-header">
                  <button type="button"
                    onClick={(e)=>{setSelectedSpace(space?._id)}} 
                    className="btn btn-primary" 
                    data-bs-toggle="modal" 
                    data-bs-target="#newAuctionModal">
                  Auction this ad space
                </button>
                </div>
                <SpaceCard data={space}/>
              </li>
            )
          })
        }
      </ul>
      <AuctionForm space={selectedSpace}/>
    </div>
  );
}

export default AuctionCreate;
