//TODO: ensure that the price is higher than the current price
//TODO: show the current price in the form
//TODO: redesign new bid form to present all info required before bid is submitted

import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useAuth } from "../context/authContext";
import notify from "../utils/notify";

const NewBid = ({ data: { bidderId, auctionId } }) => {
  let [auth, _] = useAuth();
  const closeModalButton = useRef();

  const schema = yup.object().shape({
    bidder: yup.string().required("Authentication required"),
    auction: yup.string().required(),
    price: yup
      .number()
      .min(1, "Bid should be > 0")
      .label("Price")
      .required()
      .typeError("Bid required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      bidder: bidderId,
      auction: auctionId,
    },
  });

  const onSubmit = (data, event) => {
    event.preventDefault();
    const BID_API = `/api/v1/bids`;

    fetch(BID_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        notify(data?.message, data?.success);
        closeModalButton?.current?.click();
      });
  };

  return (
    <form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
      <div
        className='modal fade'
        id='bidModal'
        tabIndex='-1'
        role='dialog'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Place your bid</h5>
              {/** close modal button */}
              <button
                ref={closeModalButton}
                type='button'
                className='btn close'
                data-bs-dismiss='modal'
                aria-label='close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>

            <div className='modal-body'>
              {/** bidder */}
              <div className='m-1'>
                <input
                  type='hidden'
                  className='form-control'
                  placeholder='Bidder ID'
                  readOnly={true}
                  {...register("bidder")}
                />
                {/** check bidder error  */}
                {errors.bidder?.message && (
                  <span className='text-danger'>{errors.bidder.message}</span>
                )}
              </div>
              {/** auction */}
              <div className='m-1'>
                <input
                  type='hidden'
                  className='form-control'
                  placeholder='Auction ID'
                  readOnly={true}
                  {...register("auction")}
                />
                {/** check auction error  */}
                {errors.auction?.message && (
                  <span className='text-danger'>{errors.auction.message}</span>
                )}
              </div>
              {/** price */}
              <div className='m-1'>
                <input
                  type='number'
                  placeholder='Bidding value'
                  className='form-control'
                  {...register("price")}
                />
                {/** check price error  */}
                {errors.price?.message && (
                  <span className='text-danger'>{errors.price.message}</span>
                )}
              </div>
            </div>

            <div className='modal-footer'>
              <button type='button' className='btn' data-bs-dismiss='modal'>
                Cancel
              </button>
              <input
                type='submit'
                className='btn btn-success'
                value='Place bid'
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default NewBid;
