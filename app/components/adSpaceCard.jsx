import Image from "next/image";
/**
 * _id
 * type
 * location (gps coords)
 * dimension(w*h)
 * imagesURL
 * address
 * date
 */
export default function AdSpaceCard({ data }) {
  const [...images] = data.images;
  const {
    type,
    location: { latitude, longitude },
    dimension: { width, height },
    address,
    date,
  } = data;

  return (
    <div className='card border' style={{ width: "50%" }}>
      <div className='card-header'>
        <div className='card-img-top'>
          <Image
            src={images[0]}
            alt={`${type}-${address}`}
            width={96}
            height={96}
          />
        </div>
      </div>
      <div className='card-body'>
        <ul>
          <li>
            <ul className='d-flex'>
              <li className='font-weight-bolder'>{type}</li>
              <li className='text-secondary'>{date}</li>
            </ul>
          </li>
          <li>{address}</li>
          <li>
            <ul className='d-flex'>
              <li>W:{width}</li>
              <li>H:{height}</li>
            </ul>
          </li>
          <li>
            <ul className='d-flex'>
              <li>Lat:{latitude}</li>
              <li>Lng:{longitude}</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className='card-footer'></div>
    </div>
  );
}
