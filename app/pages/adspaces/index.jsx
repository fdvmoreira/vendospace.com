import React from "react";
import AdSpaceCard from "../../components/adSpaceCard";

export default function AdSpace(props) {
  const [data, data2] = props.data;
  const cards = props.data.map((item, index) => {
    return <AdSpaceCard data={item} />;
  });

  return (
    <div div className='container d-flex justify-content-between mt-5'>
      {
        //<AdSpaceCard data={data} />
        cards.map((item) => item)
      }
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: [
        {
          type: "Roadside",
          address: "78 Jaslow Garlic",
          dimension: { width: 7, height: 9 },
          location: { latitude: 78, logitude: 41 },
          images: ["/logo.jpeg", "/logo.jpeg"],
        },
        {
          type: "Billboard",
          address: "20  Jakare Cosl",
          dimension: { width: 20, height: 12 },
          location: { latitude: 8, logitude: 4 },
          images: ["/logo.jpeg", "/logo.jpeg"],
        },
      ],
    },
  };
}
