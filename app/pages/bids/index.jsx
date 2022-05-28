import { useRouter } from "next/router";

export default function Bids(props) {
  const { bids } = props;

  const listOfBids = bids.map((item, index) => {
    return <li key={index}>{item}</li>;
  });

  return (
    <div className='container'>
      <p className='lead'> My Bids</p>
      <hr className='hr' />
      <div className='d-flex'>
        <ul>{listOfBids}</ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { bids: ["bid1", "bid2", "bid3"] },
  };
}
