import Image from "next/legacy/image";

const AdSpaceCard = ({ data }) =>{

  const {
    type,
    location:{latitude:latitude},
    location:{longitude:longitude},
    dimension:{width:width}, 
    dimension:{height:height},
    dimension:{unit:unit},
    address,
    createdAt,
    imagesURL:images,
  } = data;


  return (
    <div className='card bg-light d-flex gap-2 flex-row'>
      <div className='card-header'>
        <div className='card-img-top'>
          <Image
            src={images?.[0]??"/face.jpeg"}
            alt={`${type}-${address}`}
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className="d-block flex-column">
        <div className='card-body'>
          <ul className=" list-unstyled">
            <li>
              <ul className='d-flex list-unstyled'>
                <li className='lead fw-bolder'>{type}</li>
              </ul>
            </li>
            <li className="fw-light fs-5">{address}</li>
            <li className="d-flex justify-content-between">
              <span>Dimensions&nbsp;</span>
              <ul className='d-flex list-unstyled justify-content-around fw-light'>
                <li>{width}</li>
                <li className="bi bi-x"></li>
                <li>{height}</li>
                <li className="text-uppercase fw-light">&nbsp;{unit}</li>
              </ul>
            </li>
            <li className="d-flex justify-content-between">
              <p className="text-nowrap">GPS Coords&nbsp;</p>
              <ul className='d-flex list-unstyled justify-content-end fw-light'>
                <li>{latitude}</li>
                <li>&nbsp;&bull;&nbsp;</li>
                <li>{longitude}</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className='card-footer d-flex justify-content-between'>
          <span className="text-muted">Last update</span>
          <span className="text-muted fw-light">{new Date(createdAt).toLocaleDateString('en-GB')}</span>
        </div>
      </div>
    </div>
  );
}

export default AdSpaceCard;