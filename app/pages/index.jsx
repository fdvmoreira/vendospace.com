import CryptoJS from "crypto-js";
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

  let params = useRouter();
  let [auth, updateAuth] = useAuth();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(params.asPath);
    let auth_success = urlSearchParams.get("/?auth_success"); //TODO: parameter name corrupted. Check the origin  
    let data = urlSearchParams.get("data");

    //TODO: DO NOT USE ''NEXT_PUBLIC_JWT_SECRET'' env IN PRODUCTION
    if(!auth?.isAuthenticated && data && auth_success) {
      data = JSON.parse(CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_JWT_SECRET).toString(CryptoJS.enc.Utf8));
      updateAuth(data);
    }

    /** Auctions */
    fetch(AUCTIONS_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setAuctions(data);
      })
      .catch(console.error);

    /** Listings */
    fetch(LISTINGS_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
      })
      .catch(console.error);
    
    
      
  }, []);

  return (
    <div className='container'>
      <hr />
      {
        //TODO: display the listings and auctions according to the selected sorting order
      }
      <ul className='list-group'>
        {
          auctions.map((auction) => {
            return (
              <li key={auction?._id} className='list-group-item list-group-flush'>
                <AuctionCard auction={auction} />
              </li>
            );
          })
        }

        {
          listings.map((listing) => {
            return (
              <li key={listing?._id} className='list-group-item list-group-flush'>
                <ListingCard listing={listing} />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};
