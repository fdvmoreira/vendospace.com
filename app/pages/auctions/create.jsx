import Image from "next/image";

export default function Auction(props) {
  let userId = props.id;

  return (
    <div className='container justify-content-center border'>
      <p className='lead'>Create new auction</p>
      <hr className='hr' />

      <form onSubmit={handleSubmit}>
        {/** User id */}
        <div className='form-group mb-2'>
          <input type='hidden' name='userId' id='userId' value={userId} />
        </div>

        {/** Ad space */}
        <div className='form-group mb-2'>
          {props.adspace}Adspace here
          <div className='border border-success'>
            <figure>
              <Image
                src={"/logo.jpeg"}
                alt='Adspace photo'
                width={96}
                height={96}
              />
              <figcaption>Adspace</figcaption>
            </figure>
          </div>
        </div>

        {/** start */}
        <div className='form-group mb-2'>
          <label htmlFor='start'>Start</label>
          <input
            type='datetime-local'
            value={Date.now()}
            min={Date.now()}
            name='start'
            id='start'
            className='form-control'
          />
        </div>

        {/** end */}
        <div className='form-group mb-2'>
          <label htmlFor='start'>End</label>
          <input
            type='datetime-local'
            value={Date.now()}
            min={Date.now()}
            name='end'
            id='end'
            className='form-control'
          />
        </div>

        {/** Initial Price */}
        <div className='form-group mb-2'>
          <label htmlFor='initialPrice'>Initial Price</label>
          <input
            type='number'
            name='initialPrice'
            id='initialPrice'
            className='form-control'
          />
        </div>

        {/** status */}
        <div className='form-group mb-2'>
          <fieldset className='d-flex flex-column'>
            <legend>Status</legend>

            <div>
              <input type='radio' name='status' id='open' />
              <label htmlFor='open'>&nbsp;Open</label>
            </div>

            <div>
              <input type='radio' name='status' id='closed' />
              <label htmlFor='closed'>&nbsp;Closed </label>
            </div>

            <div>
              <input type='radio' name='status' id='pending' />
              <label htmlFor='pending'>&nbsp;Pending </label>
            </div>
          </fieldset>
        </div>

        {/** Create button */}
        <input
          type='button'
          value='Create Auction'
          className='btn btn-outline-success'
        />
      </form>
    </div>
  );
}

function handleSubmit() {}
