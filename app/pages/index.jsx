import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuctionCard from "../components/auctionCard";
import ListingCard from "../components/listingCard";
import { useAuth } from "../context/authContext";

const AUCTIONS_API_URL = "/api/v1/auctions";
const LISTINGS_API_URL = "/api/v1/listings";

export default (props) => {
  let [auctions, setAuctions] = useState([]);
  let [listings, setListings] = useState([]);

  let param = useRouter();
  let [auth, updateAuth] = useAuth();

  useEffect(() => {
    
    /** Auctions */
    fetch(AUCTIONS_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setAuctions(data);
      })
      .catch((err) => console.error(err));

    /** Listings */
    fetch(LISTINGS_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
      })
      .catch((err) => console.error(err));

    let {data, auth_success} = param.query;
    if(data && auth_success) data = JSON.parse(data);
    
    /** Authenticate the user */
    if(auth_success&& data&&!auth.isAuthenticated) {
      updateAuth(data);
    }
      
  }, []);

  return (
    <div className='container'>
      {
        auth?.user?.name&&<span className="alert alert-success">Welcome {auth?.user?.name}</span>
      }
      <hr />
      {/**
       * // TODO: display the listings and auctions according to the current sort order
       */}
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

/**
 * server-side rendering for main page content
 * @param {*} context
 * @returns
 */
export async function getServerSideProps(context) {
  //TODO: fetch data from server side
  return {
    props: {
      data: "my testing data",
    },
  };
}
