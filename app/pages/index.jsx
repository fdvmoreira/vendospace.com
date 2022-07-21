import { useEffect, useState } from "react";
import AuctionCard from "../components/auctionCard";
import ListingCard from "../components/listingCard";

const AUCTIONS_API_URL = "/api/v1/auctions";
const LISTINGS_API_URL = "/api/v1/listings";

export default (props) => {
  let [auctions, setAuctions] = useState([]);
  let [listings, setListings] = useState([]);

  useEffect(() => {
    /** Auctions */
    fetch(AUCTIONS_API_URL)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setAuctions(data);
      })
      .catch((err) => console.error(err));

    /** Listings */
    fetch(LISTINGS_API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setListings(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='container'>
      <hr />
      <p className='lead'>welcome</p>
      <p>{props.data}</p>
      <ul className='list-group'>
        {auctions.map((auction) => {
          return (
            <li key={auction._id} className='list-group-item list-group-flush'>
              <AuctionCard auction={auction} />
            </li>
          );
        })}

        {listings.map((listing) => {
          return (
            <li key={listing._id} className='list-group-item list-group-flush'>
              <ListingCard listing={listing} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      data: "my testing data",
    },
  };
}
