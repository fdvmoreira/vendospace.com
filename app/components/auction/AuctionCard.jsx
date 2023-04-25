import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import NewBid from "../bid/NewBid";

const AuctionCard = ({ auction }) => {
  const [auth, _] = useAuth();
  let [space, setSpace] = useState();
  let [bidStat, setBidStat] = useState(0);

  const SPACE_PUBLIC_API = `/api/v1/spaces/${auction?.space}/public/1`;
  const SPACE_AUTH_API = `/api/v1/spaces/${auction?.space}`;
  const BID_STATS_API = `/api/v1/bids/stats/${auction?._id}`;

  useEffect(() => {
    getSpace(auth?.isAuthenticated ? SPACE_AUTH_API : SPACE_PUBLIC_API);
    getBidStats(BID_STATS_API);
  }, []);

  const getSpace = (api) => {
    fetch(api, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth?.token ?? null}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setSpace(data?.data);
      })
      .catch((err) => console.error(err));
  };

  const getBidStats = (api) => {
    fetch(api, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setBidStat(data?.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='card fw-light'>
      <div className='card-header d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <small className='text-uppercase'>{auction?.status}&nbsp;</small>
          <span>
            <small className='text-muted fw-normal'>
              Posted&nbsp;{new Date(auction?.start).toLocaleDateString()}
            </small>
          </span>
        </div>
        <div>
          <small className='text-muted text-uppercase'> {auction?.user} </small>
        </div>
        <div className='d-flex justify-content-between text-uppercase'>
          <div className='d-flex flex-column'>
            <span>Ends&nbsp;</span>
            <div>
              <span>{new Date(auction?.end).toLocaleDateString()}</span>
              &nbsp;
              <span className='fw-bolder text-danger lead'>
                {new Date(auction?.end).toLocaleTimeString()}
              </span>
            </div>
          </div>
          <div className='d-flex flex-column'>
            <span>Initial</span>
            <h5 className='fw-bolder text-muted'>
              {auction?.initialPrice ?? 0}&pound;
            </h5>
          </div>
          <div className='d-flex flex-column'>
            <span>Highest &pound;</span>
            <h3 className='fw-bolder text-success'>
              {bidStat?.highestBid ?? 0}&pound;
            </h3>
          </div>
          <div className='d-flex flex-column'>
            <span>Bids</span>
            <h5 className='fw-bolder text-secondary'>
              {bidStat?.bidsCount ?? 0}
            </h5>
          </div>
        </div>
      </div>
      <div className='card-body d-flex gap-3'>
        <div>
          <Image
            src={space?.imagesURL?.[0] ?? "/logo.jpeg"}
            alt={`${space?.type} ${space?.dimension?.width}x${space?.dimension?.height} ${space?.dimension?.unit}`}
            height={200}
            width={200}
            className='card-img-top'
          />
        </div>
        <div>
          <p className='lead fw-bold text-uppercase'>{space?.type}</p>
          <div className='d-flex justify-content-between'>
            <p>Dimensions&nbsp;</p>
            <span>{`${space?.dimension?.width}x${space?.dimension?.height} ${space?.dimension?.unit}`}</span>
          </div>
          <p>Address&nbsp;{space?.address}</p>
          <div className='d-flex justify-content-between'>
            <span>GPS Coords (DD)&nbsp;</span>
            <div className='fw-light'>
              <span>{space?.location?.latitude}</span>,
              <span>{space?.location?.longitude}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='card-footer'>
        {auth?.isAuthenticated ? (
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#bidModal'>
            New bid
          </button>
        ) : (
          <Link href={"/login"} className='btn btn-sm btn-outline-primary'>
            Authenticate to place a bid
          </Link>
        )}
        <NewBid data={{ bidderId: auth?.user?._id, auctionId: auction?._id }} />
      </div>
    </div>
  );
};

export default AuctionCard;
