import React from "react";
/**
 * start
 * end
 * user
 * space
 * initial price
 * status
 * @returns
 */
export default function Auction() {
  return (
    <div className='container justify-content-center border'>
      <p className='lead'>Auctions</p>
      <hr className='hr' />
      {/** Ad space */}
      <div className='form-group'>Space</div>

      <div className='form-group'>start</div>

      <div className='form-group'>end</div>

      <div className='form-group'>user</div>

      <div className='form-group'>Initial Price</div>

      <div className='form-group'> Status</div>
    </div>
  );
}

async function getServerSideProps(context) {
  return {
    props: {},
  };
}
