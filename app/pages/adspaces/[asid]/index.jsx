import { useRouter } from "next/router";
//import Space from "../../../../server/models/spaceModel";

export default function AdSpace(props) {
  const { asid } = useRouter().query;

  return (
    <div className='container'>
      {/** Page header */}
      <h1 className='lead'>Space {asid}</h1>
      <div className='border'>
        <div className='galery border'>Images</div>
        <p>Ad space type</p>
        <p>Location</p>
        <p>Dimensions</p>
        <p>Adress</p>
        <button type='button' className='btn btn-outline-success'>
          Edit Space
        </button>
      </div>
    </div>
  );
}

/** 
async function getServerSideProps(context) {
  //TODO- fetch data from Rest API
  Space.findById({ id: asid }, (error, doc) => {
    if (error) {
      return {
        notFound: true,
      };
    }
  });

  return {
    props: {},
  };
}
*/
