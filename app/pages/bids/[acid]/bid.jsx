/**
 * get the current highest bid
 * bid > current highest
 *
 */
import { useRouter } from "next/router";
import Image from "next/legacy/image";

export default function Bid(props) {
  const { acid } = useRouter().query;

  return (
    <div className='container'>
      <h1 className='lead mb-2'>Bid on auction {acid}</h1>
      <hr className='hr' />
      <div>
        <p>Auction {acid}</p>
        <figure className='border mb-2'>
          <Image
            src={"/logo.jpeg"}
            alt='Auction picture'
            width={96}
            height={96}
          />
          <figcaption>auction profile pic</figcaption>
        </figure>
        <p className='text-secondary'>Current highest bid {}</p>
        <form onSubmit={handleSubmit}>
          {/** bid input field */}
          <div className='form-group mb-2'>
            <input
              type='number'
              name=''
              id=''
              placeholder='Enter your bid'
              className='form-control'
            />
          </div>

          {/** submit */}
          <input
            type='submit'
            value={"Place your bid"}
            className='btn btn-success mb-2'
          />
        </form>
      </div>
    </div>
  );
}

const handleSubmit = (event) => {
  console.log(event.target.value);
};
