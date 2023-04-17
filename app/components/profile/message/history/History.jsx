import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/authContext';

const History = () => {
  let [history, setHistory] = useState({});
  let [auth, _] = useAuth();

  const HISTORY_API = `/api/v1/users/${auth?.user?._id??0}/history`;
  
  useEffect(()=>{
    fetch(HISTORY_API,{
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token}`
      }
    })
    .then(response => response.json()
    .then(data => setHistory(data.data)))
    .catch(console.error);

  },[]);
  return (
    <div className="container border border-danger">
      <div className="card bg-light mb-3">
        <Link className="card-body"  href="/auctions">
          <p className="text-center">
            <h1>{history?.auctions?.count??0}</h1>
            <h5>Auctions</h5>
          </p>
        </Link>
      </div>
      <div className="card bg-light mb-3">
        <Link className="card-body" href="/bids">
          <p className="text-center">
            <h1>{history?.bids?.count??0}</h1>
            <h5>Bids</h5>
          </p>
        </Link>
      </div>
      <div className="card bg-light mb-3">
        <Link className="card-body" href="/listings">
          <p className="text-center">
            <h1>{history?.listings?.count??0}</h1>
            <h5>Listings</h5>
          </p>
        </Link>
      </div>
      <div className="card bg-light mb-3">
        <Link className="card-body" href="/adspaces">
          <p className="text-center">
            <h1>{history?.spaces?.count??0}</h1>
            <h5>Spaces</h5>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default History;
