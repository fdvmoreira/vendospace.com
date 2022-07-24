import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import notify from "../utils/notify";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function NewBid({ data }) {
  const schema = yup.object().shape({
    bidder: yup.string().required(),
    auction: yup.string().required(),
    price: yup.number().min(1).required().typeError("Price required > 1"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div
        className='modal fade'
        id='bidModal'
        tabIndex='-1'
        role='dialog'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>New bid</h5>
              {/** close modal button */}
              <button
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
                  type='text'
                  className='form-control'
                  placeholder='Bidder ID'
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
                  type='text'
                  className='form-control'
                  placeholder='Auction ID'
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
                value='Place did'
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
