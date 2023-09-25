import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ListingItem from "../../components/listing/ListingItem";
import { useAuth } from "../../context/authContext";
import RestrictedArea from "../../components/RestrictedArea";

const ListingList = () => {

  let[listings, setListings] = useState();
  let [auth,_] = useAuth();

  useEffect(()=>{
    if (auth?.isAuthenticated) loadListings();
  },[]);

  const loadListings = ()=>{
    const API_LISTING_LIST = `/api/v1/users/${auth?.user?._id??0}/listings`;
    fetch(API_LISTING_LIST, {
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token??null}`,
      }
    })
    .then(res=>res.json())
    .then(data=>{
      if(data?.success) setListings(()=>data?.data);
    })
    .catch(console.error);
  }

  if(!auth?.isAuthenticated) return <RestrictedArea/>

  if(auth?.isAuthenticated && !listings?.length) {
    return (
      <div className="lead text-center">
        <p>You don't have any listing created</p>
        <Link href='/listings/new' className="btn btn-lg btn-primary">create new listing</Link>
      </div>)
  }

  return (
    <div className="container">
      <div className="lead text-center">My listings</div>
      <hr />
      {
        <div className="d-flex gap-2">
          <ul className="container list-unstyled d-flex gap-4 flex-column align-items-center">
          {
            listings?.map(listing=>{
              return (
                <li key={listing?._id} className="card">
                  <ListingItem listing={listing}/>
                </li>
              )
            })
          }
          </ul>
        </div>
      }
      <ToastContainer/>
    </div>
  )
};

export default ListingList;
