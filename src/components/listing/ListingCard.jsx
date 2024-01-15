import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import NewMessage from "../profile/message/NewMessage";

const ListingCard = ({ listing }) => {
  const { _id, space: spaceId, createdAt, user, status } = listing;
  let [space, setSpace] = useState();

  let [auth, _] = useAuth();

  const SPACE_PUBLIC_API = `/api/v1/spaces/${spaceId}/public/1`;
  const SPACE_AUTH_API = `/api/v1/spaces/${spaceId}`;

  useEffect(() => {
    getSpace();
  }, []);

  const getSpace = () => {
    fetch(auth?.isAuthenticated ? SPACE_AUTH_API : SPACE_PUBLIC_API, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setSpace(data?.data);
      })
      .catch(console.error);
  };

  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between'>
        <small className='text text-uppercase text-nowrap text-muted'>
          ID:&nbsp;{_id}
        </small>
        <small className='text-muted'>
          Posted&nbsp;{new Date(createdAt).toLocaleDateString()}
        </small>
      </div>
      <div className='card-body'>
        <div className='d-flex gap-2'>
          <Image
            src={space?.imagesURL?.[0] || "/logo.jpeg"}
            alt={`${space?.type} ${space?.dimension.width}x${space?.dimension.height} ${space?.dimension.unit}`}
            height={200}
            width={200}
            className='card-img-top'
          />
          <div className='fw-light'>
            <h5 className='card-title text-uppercase'>{space?.type}</h5>
            <p className='bi bi-mailbox'>&nbsp;{space?.address}</p>
            <p className='bi bi-aspect-ratio d-flex justify-content-between'>
              Dimensions:&nbsp;
              <span>
                <span>{space?.dimension.width}</span>
                &times;
                <span>{space?.dimension.height}</span>
              </span>
              <span className='text-uppercase'>{space?.dimension.unit}</span>
            </p>
            <p className='bi bi-geo-alt'>
              <span>&nbsp;GPS coords(DD):</span>
              <span className='text-right'>
                {" "}
                {space?.location.latitude},{space?.location.longitude}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className='card-footer'>
        {auth?.isAuthenticated ? (
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#messageModal'>
            Message owner
          </button>
        ) : (
          <Link href={"/login"} className='btn btn-outline-primary btn-sm'>
            Authenticate to message the owner
          </Link>
        )}
        <NewMessage recipient={user} subject={"Enquire about your LISTING!"} />
      </div>
    </div>
  );
};

export default ListingCard;
