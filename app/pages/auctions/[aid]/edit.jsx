import { useRouter } from "next/router";

export default function Auction(props) {
  const { aid } = useRouter().query;

  return (
    <div className='container border'>
      <p className='lead font-weight'>Auction {aid}</p>
      <hr className='hr' />
      <div>
        <p>Creator User ID</p>
        <p>Intial Price</p>
        <p>Number of bids</p>
        <p>Current Price</p>
        <p>A</p>
        <p>B</p>
        <p>Current Status</p>
        <button className='btn btn-outline-success me-1'>Edit auction</button>
        <button className='btn btn-outline-success ms-1'>Bid</button>
      </div>
    </div>
  );
}

function handleEdit() {}
