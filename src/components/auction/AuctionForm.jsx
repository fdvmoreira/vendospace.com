import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useAuth } from "../../context/authContext";
import notify from "../../utils/notify";

const AUCTION_API = "/api/v1/auctions";

const AuctionForm = ({space}) => {

    const schema = yup.object().shape({
    user: yup.string().required('Authentication required'),
    start: yup
      .date()
      .required("Start date and time are required")
      .test("start-after-now", "This date has passed", (startDate, context) => {
        return startDate.getTime() > Date.now();
      }),
    end: yup
      .date()
      .required("End date and time are required")
      .test(
        "is-after-start",
        "End data is before start date",
        (value, context) => value.getTime() > context.parent.start.getTime(),
      ),
    initialPrice: yup
      .number()
      .positive()
      .min(0)
      .required("Initial price required")
      .label("Initial price"),
    status: yup
      .string()
      .oneOf(["open", "closed", "pending"])
      .required('Status required'),
  });

  const { register, handleSubmit, formState: { errors }, reset} = useForm({
    resolver: yupResolver(schema), 
  });

  const [auth, _] = useAuth();

  const onSubmit = (data, event) =>{
    event.preventDefault();
    fetch(AUCTION_API, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${auth?.token??null}`,
      },
      body: JSON.stringify({...data,space}),
    })
    .then((res) => res.json())
    .then((data) => {
      notify(data?.message, data?.success);
      if(data?.success) {
        reset();
      }
    })
    .catch(console.error);
  }

  return (
    <div className="modal fade" id="newAuctionModal" tabIndex="-1" role="dialog" >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
              <h5 className="modal-title">Create new auction</h5>
              <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/** User ID */}
              <input type='hidden' value={auth?.user?._id} {...register("user")} />
              {/** user error check */}
              {errors.user?.message && ( <p className='alert alert-danger'>{errors.user?.message}</p> )}
              {/** space ID */}
              <input type='hidden' value={space} {...register("space")} />
              {/** space error check */}
              {errors.space?.message && ( <p className='alert alert-danger'>{errors.space?.message}</p> )}
              {/** start date */}
              <label htmlFor='start' className='form-label'> Start date </label>
              <input className='form-control mb-2' type='datetime-local' id='start' {...register("start")}/>
              {/** start date error check */}
              {errors.start?.message && ( <p className='alert alert-danger'>{errors.start?.message} </p> )}
              {/** end date */}
              <label htmlFor='end' className='form-label'> End date </label>
              <input className='form-control mb-2' type='datetime-local' id='end' {...register("end")} />
              {/** end date error check */}
              {errors.end?.message && ( <p className='alert alert-danger'>{errors.end?.message}</p> )}
              {/** initial price */}
              <div className='input-group flex-nowrap mb-2'>
                <span className='input-group-text'>&pound;</span>
                <input
                  type='number'
                  className='form-control'
                  placeholder='initial price'
                  aria-label='initial price'
                  {...register("initialPrice")}
                />
              </div>
              {/** initial price error check */}
              {errors.initialPrice?.message && ( <p className='alert alert-danger'>{errors.initialPrice?.message}</p> )}
              {/** auction status */}
              <select className='form-select mb-2' defaultValue={''} {...register("status")}>
                <option value=''>-- select status --</option>
                <option value='open'>Open</option>
                <option value='closed'>Closed</option>
                <option value='pending'>Pending</option>
              </select>
              {/** auction error check */}
              {errors.status?.message && (
                <p className='alert alert-danger'>{errors.status?.message}</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Save changes</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuctionForm;