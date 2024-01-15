import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import notify from "../../utils/notify";

const { default: Image } = require("next/image");

const ListingItem = (props) => {
  let [auth, _] = useAuth();
  let [listing, setListing] = useState(props?.listing);
  let [space, setSpace] = useState();
  let [disabled, setDisabled] = useState((props?.listing?.status=="disabled"));
  let [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const API_LISTING_SPACE = `/api/v1/users/${auth?.user?._id ?? 0}/spaces/${listing?.space??0}`;
    fetch(API_LISTING_SPACE, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.success) setSpace(() => data?.data);
      })
      .catch(console.error);
  }, []);

  const changeStatus = ()=>{
    const API_LISTING_STATUS = `/api/v1/users/${auth?.user?._id ?? 0}/listings/${listing?._id??0}`;
    fetch(API_LISTING_STATUS,{
      method:'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({status:`${disabled?"active":"disabled"}`})
    })
    .then(res=>res.json())
    .then(data=>{
      if(data?.success){
        setListing(prev => ({...prev,status:data?.data?.status}));
        setDisabled(prev =>!prev);
      }
    })
    .catch(console.error);
  }

  const deleteListing = ()=>{
    const API_LISTING_STATUS = `/api/v1/users/${auth?.user?._id ?? 0}/listings/${listing?._id??0}`;
    fetch(API_LISTING_STATUS,{
      method:'DELETE',
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token}`,
      },
    })
    .then(res=>res.json())
    .then(data=>{
      notify(data?.message, data?.success);
      if(data?.success) setDeleted(true);
    })
    .catch(console.error);
  }

  return deleted?<></>:(
    <div className="card bg-light">
      <div className="card-header">
        <div className="d-flex gap-2 justify-content-between">
          <div>
            <button className="btn btn-sm btn-outline-secondary bi bi-pen" onClick={changeStatus}>&nbsp;{disabled?"Activate":"Disable"} listing</button>
          </div>
          <button className="btn btn-sm btn-outline-danger bi bi-trash" onClick={deleteListing}>&nbsp;delete</button>
        </div>
      </div>
      <div className="card-body d-flex fw-light btn p-2" >
        <Image src={`${space?.imagesURL?.[0] ?? "/logo.jpeg"}`} alt="space image" width={150} height={150} />
        <div className="d-flex flex-column align-items-start p-2">
          <p className="fs-2 text-capitalize">{space?.type}</p>
          <p className="d-flex w-100 justify-content-between">
            <span>Dimension:</span>
            <span>{space?.dimension?.width} x {space?.dimension?.height}&nbsp;</span>
            <span className="text-uppercase">{space?.dimension?.unit}</span>
          </p>
          <p>{space?.address}</p>
          <p>GPS coords(DD): {space?.location?.latitude},{space?.location?.longitude}</p>
          <p className="d-flex w-100 justify-content-between">
            <span>Status:</span>
            <span className="text-uppercase">{listing?.status}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ListingItem;