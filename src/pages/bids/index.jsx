import Link from "next/link";
import { useEffect, useState } from "react";
import RestrictedArea from "../../components/RestrictedArea";
import { useAuth } from "../../context/authContext";

const ListBids = () => {
  let [bids, setBids] = useState();
  let [auth, _] = useAuth();

  useEffect(() => {
    if (auth?.isAuthenticated) getBids();
  }, []);

  const getBids = () => {
    const BID_API = `/api/v1/users/${auth?.user?._id}/bids`;

    fetch(BID_API, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setBids(data?.data);
      })
      .catch(console.error);
  };

  if (!auth?.isAuthenticated) return <RestrictedArea />;

  if (auth?.isAuthenticated && !bids?.length) {
    return (
      <div className='lead text-center'>
        <p>You don't have any bid yet</p>
        <Link href='/' className='btn btn-lg btn-primary'>
          bid on auctions
        </Link>
      </div>
    );
  }

  return (
    <>
      <h6 className='lead text-center'>My Bids</h6>
      <hr />
      <ul className='list-unstyled container'>
        {bids?.map((bid) => {
          return (
            <li key={bid?._id} className='d-block border p-4 my-2'>
              <ul className='list-unstyled'>
                <li>{new Date(bid?.createdAt).toUTCString()}</li>
                <li>Auction: {bid?.auction}</li>
                <li className='lead'>value: {bid?.price}</li>
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ListBids;
