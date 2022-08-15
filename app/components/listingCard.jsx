import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewMessage from "./NewMessage";

export default function ListingCard({ listing }) {
  const { _id, space: spaceId, createdAt, user, status } = listing;
  let [space, setSpace] = useState();
  const SPACE_API_URL = `/api/v1/spaces/${spaceId}`;
  /**
   * _id,
   * space-url,location,size,
   * user - name,
   * status,
   * timestamp
   */
  useEffect(() => {
    fetch(SPACE_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setSpace(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className='card'>
      <div className='card-header'>
        <p>
          <small className='text text-uppercase'>
            {String(user).substring(0, 6)}
          </small>
        </p>
        <Image
          src={space?.imagesURL[0] || "/logo.jpeg"}
          alt={`${space?.type} ${space?.dimension.width}x${space?.dimension.height} ${space?.dimension.unit}`}
          height={200}
          width={200}
          className='card-img-top'
        />
      </div>
      <div className='card-body'>
        <h6>
          <small className='card-text'>
            {status.toLocaleUpperCase()}&nbsp;
          </small>
          <small className='text-muted'>
            {new Date(createdAt).toLocaleDateString()}
          </small>
        </h6>
        <h5 className='card-title text-uppercase'>
          {`${space?.type} ${space?.dimension.width}x${space?.dimension.height} ${space?.dimension.unit}`}
        </h5>
        <p className='card-text'>{space?.address}</p>
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
          data-bs-target='#messageModal'>
          Message owner
        </button>
        <NewMessage recipient={user} />
      </div>
    </div>
  );
}
