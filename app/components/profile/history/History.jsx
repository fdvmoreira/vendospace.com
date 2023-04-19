import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import HistoryItemCard from './HistoryItemCard';

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
    <div className="container d-flex flex-column gap-2">
      <HistoryItemCard {...{title:"Auctions",href:"/auctions",count:history?.auctions?.count??0}} />
      <HistoryItemCard {...{title:"listings",href:"/listings",count:history?.listings?.count??0}} />
      <HistoryItemCard {...{title:"bids",href:"/bids",count:history?.bids?.count??0}} />
      <HistoryItemCard {...{title:"spaces",href:"/adspaces",count:history?.spaces?.count??0}} />
    </div>
  );
};

export default History;
