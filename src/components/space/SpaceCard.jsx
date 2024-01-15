import Image from "next/legacy/image";

const SpaceCard = ({ data }) => {
  return (
    <div className='bg-light d-flex gap-2 flex-row'>
      <div className='card-header'>
        <div className='card-img-top'>
          <Image
            src={data?.imagesURL?.[0] ?? "/logo.jpeg"}
            alt={`${data?.type}-${data?.address}`}
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className='d-block flex-column'>
        <div className='card-body'>
          <ul className=' list-unstyled'>
            <li>
              <ul className='d-flex list-unstyled'>
                <li className='lead fw-bolder text-uppercase'>{data?.type}</li>
              </ul>
            </li>
            <li className='fw-light fs-5'>{data?.address}</li>
            <li className='d-flex justify-content-between'>
              <span>Dimensions:&nbsp;</span>
              <ul className='d-flex list-unstyled justify-content-around fw-light'>
                <li>{data?.dimension?.width}</li>
                <li className='bi bi-x'></li>
                <li>{data?.dimension?.height}</li>
                <li className='text-uppercase fw-light'>
                  &nbsp;{data?.dimension?.unit}
                </li>
              </ul>
            </li>
            <li className='d-flex justify-content-between'>
              <p className='text-nowrap'>GPS Coords (DD):&nbsp;</p>
              <ul className='d-flex list-unstyled justify-content-end fw-light'>
                <li>{data?.location?.latitude}</li>
                <li>&nbsp;&bull;&nbsp;</li>
                <li>{data?.location?.longitude}</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className='card-footer d-flex justify-content-between bg-light'>
          <span className='text-muted'>Last update</span>
          <span className='text-muted fw-light'>
            {new Date(data?.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
