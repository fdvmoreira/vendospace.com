import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useLogin } from "../context/loginContext";
import NewBid from "./NewBid";

export default function AuctionCard({ auction }) {
  const {
    _id: auctionId,
    start,
    end,
    initialPrice,
    space: spaceId,
    createdAt,
    user,
    status,
  } = auction;

  const [authUser, userUpdate] = useLogin();
  let [space, setSpace] = useState();
  let [highestBid, setHighestBid] = useState(0);
  let [remainingTime, setRemainingTime] = useState(
    (Number(new Date(end).getTime()) - Number(Date.now())) / (1000 * 60 * 60),
  );

  // TODO: fetch the highest price from every minute
  const BIDS_URL = "/api/v1/bids/${auctionId}";
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(BIDS_URL, fetcher, { refreshInterval: 1000 });
  setHighestBid(data?.highestBid);

  const SPACE_API_URL = `/api/v1/spaces/${spaceId}`;
  const BID_API_URL = `/api/v1/bids/${spaceId}`;

  // TODO: fetch thhe data with the swr hook
  useEffect(() => {
    // fetch space data
    fetch(SPACE_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setSpace(data);
        console.log(data);
      })
      .catch((err) => console.error(err));

    // set remaining time interval
    setInterval(
      (end) => {
        let currenTime = Number(Date.now());
        let days = Math.floor(getTimeLeftDays(end - currenTime));
        let hours = Math.floor(getTimeLeftHours(end - currenTime));
        let minutes = Math.floor(getTimeLeftMinutes(end - currenTime));
        let seconds = Math.floor(getTimeLeftSeconds(end - currenTime));
        // console.log(Math.abs(end - Date.now()));
        setRemainingTime(days || hours || minutes || seconds);
      },
      1000,
      Number(new Date(end).getTime()),
    );
  }, []);

  return (
    <div className='card'>
      <div className='card-header'>
        {/** owner */}
        <p>
          <small className='text-muted text-uppercase'>
            {String(user).substring(0, 6)}
          </small>
        </p>

        {/** end date */}
        <p>
          Remaining time{" "}
          <span className='fw-bolder text-danger'>
            {remainingTime > 24 ? remainingTime / 24 : remainingTime}
          </span>{" "}
          hours
        </p>
        {/** highest bid */}
        <p className='card-text'>
          Highest bid: <span className='fw-bolder'>{highestBid}</span>
        </p>
        {/** image */}
        <Image
          src={space?.imagesURL[0] || "/logo.jpeg"}
          alt={`${space?.type} ${space?.dimension.width}x${space?.dimension.height} ${space?.dimension.unit}`}
          height={200}
          width={200}
          className='card-img-top'
        />
      </div>
      <div className='card-body'>
        {/** started at and status */}
        <h6>
          <small className='card-text text-uppercase'>{status}&nbsp;</small>
          <small className='text-muted'>
            {new Date(start).toLocaleDateString()}
          </small>
        </h6>

        {/** title */}
        <h5 className='card-title text-uppercase'>
          {`${space?.type} ${space?.dimension.width}x${space?.dimension.height} ${space?.dimension.unit}`}
        </h5>

        {/** address */}
        <p className='card-text'>{space?.address}</p>

        {/** lat and lng coords */}
        <p className='card-text'>
          <span>lat@{space?.location.latitude}</span>&#9900;
          <span>lng@{space?.location.longitude}</span>
        </p>
      </div>
      <div className='card-footer'>
        <button
          type='button'
          className='btn btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#bidModal'>
          New bid
        </button>
        <NewBid data={{ bidderId: authUser.userId, auctionId: auction._id }} />
      </div>
    </div>
  );
}
/**
 * gets remaining time in days
 * @param {milliseconds} milliseconds
 * @returns
 */
const getTimeLeftDays = (milliseconds) =>
  Math.abs(Number(milliseconds) / (24 * 60 * 60 * 1000));

/**
 * gets the remaining time in hours
 * @param {milliseconds} milliseconds
 * @returns hours
 */
const getTimeLeftHours = (milliseconds) =>
  Math.abs(Number(milliseconds) / (60 * 60 * 1000));

/**
 * gets the remaining time in minutes
 * @param {milliseconds} milliseconds
 * @returns hours
 */
const getTimeLeftMinutes = (milliseconds) =>
  Math.abs(Number(milliseconds) / (60 * 1000));

/**
 * gets remaining time in seconds
 * @param {milliseconds} milliseconds
 * @returns
 */
const getTimeLeftSeconds = (milliseconds) =>
  Math.abs(Number(milliseconds) / 1000);

export {
  getTimeLeftDays,
  getTimeLeftHours,
  getTimeLeftMinutes,
  getTimeLeftSeconds,
};
