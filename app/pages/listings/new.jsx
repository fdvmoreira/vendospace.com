import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import RestrictedArea from "../../components/RestrictedArea";
import { useAuth } from "../../context/authContext";
import notify from "../../utils/notify";

// let dummy = [  
//   {type: "furniture", 
//   _id: "624f0d0979313c9e4389c8b7",
//   address: "123 Main St",
//   dimension: { width: 60,height: 80, unit: "cm" },
//    location: { latitude: 37.7749,longitude: -122.4194 },    
//    imagesURL: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
//   },
//   {
//     type: "electronics",
//     _id: "514f0d0979313c9e4389c8b7",
//     address: "456 Elm St",
//     dimension: {
//       width: 20,
//       height: 40,
//       unit: "in"
//     },
//     location: {
//       latitude: 37.7749,
//       longitude: -122.4194
//     },
//     imagesURL: ["https://example.com/image3.jpg", "https://example.com/image4.jpg"]
//   },
//   {
//     type: "clothing",
//     _id: "614f0d0979313c9e4389c878",
//     address: "789 Oak St",
//     dimension: {
//       width: 50,
//       height: 70,
//       unit: "cm"
//     },
//     location: {
//       latitude: 37.7749,
//       longitude: -122.4194
//     },
//     imagesURL: ["https://example.com/image5.jpg"]
//   },
//   {
//     type: "books",
//     _id: "694f0d0979313c9e4389c8b7",
//     address: "1010 Pine St",
//     dimension: {
//       width: 15,
//       height: 20,
//       unit: "cm"
//     },
//     location: {
//       latitude: 37.7749,
//       longitude: -122.4194
//     },
//     imagesURL: ["https://example.com/image6.jpg"]
//   },
//   {
//     type: "household",
//     _id: "614f0a0979313c9e4389c8b7",
//     address: "1111 Market St",
//     dimension: {
//       width: 30,
//       height: 40,
//       unit: "in"
//     },
//     location: {
//       latitude: 37.7749,
//       longitude: -122.4194
//     },
//     imagesURL: ["https://example.com/image7.jpg", "https://example.com/image8.jpg"]
//   }
// ];

const ListingCreate = () => {

  let router = useRouter();
  let [spaces, setSpaces] = useState();
  let [auth, _] = useAuth();
  
  useEffect(()=>{
    if(auth?.isAuthenticated) loadSpaces();
  },[]);

  const loadSpaces = () =>{
    const SPACE_API = `/api/v1/users/${auth?.user?._id??0}/spaces`;
    fetch(SPACE_API, {
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token??null}`,
      }
    })
    .then(res=>res.json())
    .then(data=> {if(data?.data) setSpaces(()=>data?.data)})
    .catch(console.error);
  }

  const onCreateListing = (data) =>{
    const LISTING_API = '/api/v1/listings';
    fetch(LISTING_API, {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token??null}`,
      },
      body: JSON.stringify(data),
    }).then(res=>res.json())
    .then(data=>{
      notify(data?.message,data?.success);
    }).catch(console.error);
  };

  if(!auth?.isAuthenticated) return <RestrictedArea/>

  if(auth?.isAuthenticated && !spaces.length) {
    return (
      <div className="lead text-center">
        <p>You have not create any space</p>
        <Link href='/adspaces' className="btn btn-lg btn-primary">create new ad space</Link>
      </div>)
  }

  return (
    <div className="container">
      <div className="lead text-center">Create new listing</div>
      <hr />
      {
        <div className="d-flex gap-2">
          <ul className="container list-unstyled d-flex gap-4 flex-column align-items-center">
          {
            spaces?.map(space=>{
              return (
                <li key={space?._id} className="card">
                  <div className="card-head">
                    <button className="btn btn-sm btn-outline-primary" 
                      onClick={()=>onCreateListing({
                        user: `${auth?.user?._id??0}`,
                        space: `${space?._id??0}`,
                        status: 'active'
                      })}>Use this space to create listing</button>
                  </div>
                  <div className="d-flex fw-light btn p-2" >
                    <Image src={`${space?.imagesURL?.[5]??"/logo.jpeg"}`} alt="space image" width={150} height={150}/>
                    <div className="d-flex flex-column align-items-start p-2">
                      <p className="fs-2 text-capitalize">{space?.type}</p>
                      <p className="d-flex w-100 justify-content-between">
                        <span>Dimension:</span>
                        <span>{space?.dimension?.width} x {space?.dimension?.height}&nbsp;</span>
                        <span className="text-uppercase">{space?.dimension?.unit}</span>
                      </p>
                      <p>{space?.address}</p>
                      <p>GPS coords(DD): {space?.location?.latitude},{space?.location?.longitude}</p>                      
                    </div>
                  </div>
                </li>
              )
            })
          }
          </ul>
        </div>
      }
      <ToastContainer/>
    </div>
  )
}

export default ListingCreate;