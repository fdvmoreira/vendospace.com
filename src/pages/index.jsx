import AuctionCard from "@/components/auction/AuctionCard";
import NewBid from "@/components/bid/NewBid";
import ListingCard from "@/components/listing/ListingCard";
import { useAuth } from "@/context/authContext";
import CryptoJS from "crypto-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AUCTIONS_PUBLIC_API = "/api/v1/auctions/public/1";
const AUCTIONS_AUTH_API = "/api/v1/auctions";
const LISTINGS_PUBLIC_API = "/api/v1/listings/public/1";
const LISTINGS_AUTH_API = "/api/v1/listings";

export default (props) => {
  let [auctions, setAuctions] = useState([]);
  let [listings, setListings] = useState([]);
  let [selectedAuction, setSelectedAuction] = useState("");
  let params = useRouter();
  let [auth, updateAuth] = useAuth();

  useEffect(() => {
    authenticate();

    /** Auctions */
    getAuctions(
      auth?.isAuthenticated ? AUCTIONS_AUTH_API : AUCTIONS_PUBLIC_API,
    );

    /** Listings */
    getListings(
      auth?.isAuthenticated ? LISTINGS_AUTH_API : LISTINGS_PUBLIC_API,
    );
  }, []);

  const getAuctions = (api) => {
    fetch(api, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth?.token}}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setAuctions(() => data?.data);
      })
      .catch(console.error);
  };

  const getListings = (api) => {
    fetch(api, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth?.token}}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setListings(() => data?.data);
      })
      .catch(console.error);
  };

  const authenticate = () => {
    const urlSearchParams = new URLSearchParams(params.asPath);
    let auth_success = urlSearchParams.get("/?auth_success"); //TODO: parameter name corrupted. Check the origin
    let data = urlSearchParams.get("data");

    //TODO: DO NOT USE "NEXT_PUBLIC_JWT_SECRET" env IN PRODUCTION
    if (!auth?.isAuthenticated && data && auth_success) {
      data = JSON.parse(
        CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_JWT_SECRET).toString(
          CryptoJS.enc.Utf8,
        ),
      );
      updateAuth(data);
    }
  };

  const handleNewBidSelection = (auction) => {
    setSelectedAuction(auction);
  };

  if (auctions.length == 0 && listings.length == 0)
    return <div className='lead text-center'>No Data</div>;

  return (
    <div className='container'>
      <hr />
      <ul className='list-group'>
        {auctions?.map((auction) => {
          return (
            <li key={auction?._id} className='list-group-item list-group-flush'>
              <AuctionCard
                auction={auction}
                onNewBidSelected={handleNewBidSelection}
              />
            </li>
          );
        })}

        {listings?.map((listing) => {
          return (
            <li key={listing?._id} className='list-group-item list-group-flush'>
              <ListingCard listing={listing} />
            </li>
          );
        })}
      </ul>
      <NewBid
        selectedAuction={selectedAuction}
        data={{ bidderId: auth?.user?._id, auctionId: selectedAuction }}
      />
    </div>
  );
};
