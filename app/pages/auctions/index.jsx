import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import RestrictedArea from "../../components/RestrictedArea";
import AuctionItem from "../../components/auction/AuctionItem";
import { useAuth } from "../../context/authContext";
import notify from "../../utils/notify";
import ListBidsModal from "../../components/bid/ListBidModal";

const AuctionList = () =>{

  let [auth,_] = useAuth();
  let [auctions, setAuctions] = useState();
  let [auctionBids,setAuctionBids] = useState();

  useEffect(() =>{
    if(auth?.isAuthenticated) getAuctions();
  },[])

  const getAuctions = ()=>{
    const AUCTION_API = `/api/v1/users/${auth?.user?._id??0}/auctions`;
    fetch(AUCTION_API,{
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token??null}`,
      },
    })
    .then(res=>res.json())
    .then(data=>{
      if(data?.success) setAuctions(data?.data);
    })
    .catch(console.error);
  }

  const deleteAuction = (id)=>{
    const AUCTION_API = `/api/v1/users/${auth?.user?._id??0}/auctions/${id}`;
    fetch(AUCTION_API,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token??null}`,
      },
    })
    .then(res=>res.json())
    .then(data=>{
      notify(data?.message, data?.success);
      if(data?.success) setAuctions(prev=>prev.filter(auction =>auction?._id !== id));
    })
    .catch(console.error);
  }
  
  const getBidsForAuction = (id)=>{
    const BID_API = `/api/v1/users/${auth?.user?._id}/bids/auctions/${id}`;
    fetch(BID_API,{
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token??null}`,
      },
    })
    .then(res=>res.json())
    .then(data=>{
      if(data?.success) setAuctionBids(data?.data);
    })
    .catch(console.error);
  }

  if(!auth?.isAuthenticated) return <RestrictedArea/>

  if(auth?.isAuthenticated && !auctions?.length) {
    return (
      <div className="lead text-center">
        <p>You don't have any auction created</p>
        <Link href='/auctions/new' className="btn btn-lg btn-primary">create new auction</Link>
      </div>)
  }

  return (
    <div className='container justify-content-center'>
      <h6 className="lead text-center">My Auctions</h6>
      <hr />
      <ul className="list-unstyled d-flex flex-column align-items-center">
        {
          auctions?.map(auction => {
            return (
              <li key={auction?._id} className="card p-2 m-3">
                <div className="card-header">
                  <div className='d-flex justify-content-between'>
                    <span className="text-muted">Start&nbsp;{new Date(auction?.start).toLocaleDateString()}</span>
                    <div>
                      <span className="">Ends:&nbsp;{new Date(auction?.end).toLocaleDateString()}</span>
                      <span className="">&nbsp;{new Date(auction?.end).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>status: <span className="text-uppercase">{auction?.status}</span></span>
                    <span>Initial Price: <span className="lead">{auction?.initialPrice}</span>&nbsp;&pound;</span>
                  </div>
                </div>
                <div className="card-body">
                  <AuctionItem spaceId={auction?.space}/>
                </div>
                <div className="card-footer d-flex justify-content-end gap-2">
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={()=>getBidsForAuction(auction?._id)}
                    data-bs-toggle="modal"
                    data-bs-target="#listBidsModal">show bids</button>
                  <button className="btn btn-sm bi bi-trash btn-outline-danger" onClick={()=>deleteAuction(auction?._id)}>delete</button>
                </div>
                <ListBidsModal bids={auctionBids}/>
              </li>
            )
          })
        }
      </ul>
      <ToastContainer/>
    </div>
  );
}

export default AuctionList;