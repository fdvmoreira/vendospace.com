import Image from "next/image";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useLogin } from "../../context/loginContext";
import notify from "../../utils/notify";
import { ToastContainer } from "react-toastify";

const AUCTION_API_URL = "/api/v1/auctions";
let userId = "622f55d4b3763981e2e825df";

export default function Auction({ data }) {
  const [user] = useLogin();

  const schema = yup.object().shape({
    user: yup.string().required().label("User"),
    space: yup.string().required().label("Space"),
    start: yup
      .date()
      .required()
      .test("start-after-now", "This date has passed", (startdate, context) => {
        return startdate.getTime() > Date.now();
      })
      .typeError("Start date and time are required"),
    end: yup
      .date()
      .required()
      .test(
        "is-after-start",
        "End data is before start date",
        (value, context) => value.getTime() > context.parent.start.getTime(),
      )
      .typeError("End date and time are required"),
    initialPrice: yup
      .number()
      .positive()
      .min(0)
      .required()
      .typeError("Initial price required"),
    status: yup
      .string()
      .oneOf(["open", "closed", "pending"])
      .required()
      .typeError("Select the status"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div
      className='container justify-content-center border'
      style={{ width: "320px" }}>
      <h1 className='lead text-center'>Create new auction</h1>
      <hr className='hr' />

      <form onSubmit={handleSubmit(submitHandler)}>
        {/** User ID */} //TODO get the user from context API
        <input type='hidden' value={user.userId} {...register("user")} />
        {/** user error check */}
        {errors.user?.message && (
          <p className='text-danger'>{errors.user?.message}</p>
        )}
        {/** space ID */} //TODO implement space selection or creation
        <input
          type='hidden'
          value={"62d66ac134e94039f9bb8883"}
          {...register("space")}
        />
        {/** space error check */}
        {errors.space?.message && (
          <p className='text-danger'>{errors.space?.message}</p>
        )}
        {/** start date */}
        <label htmlFor='start' className='form-label'>
          Start date
        </label>
        <input
          className='form-control mb-2'
          type='datetime-local'
          id='start'
          {...register("start")}
        />
        {/** start date error check */}
        {errors.start?.message && (
          <p className='text-danger'>{errors.start?.message}</p>
        )}
        {/** end date */}
        <label htmlFor='end' className='form-label'>
          End date
        </label>
        <input
          className='form-control mb-2'
          type='datetime-local'
          id='end'
          {...register("end")}
        />
        {/** end date error check */}
        {errors.end?.message && (
          <p className='text-danger'>{errors.end?.message}</p>
        )}
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
        {errors.initialPrice?.message && (
          <p className='text-danger'>{errors.initialPrice?.message}</p>
        )}
        {/** auction status */}
        <select
          className='form-select mb-2'
          defaultValue={""}
          {...register("status")}>
          <option value=''>Auction status</option>
          <option value='open'>Open</option>
          <option value='closed'>Closed</option>
          <option value='pending'>Pending</option>
        </select>
        {/** auction error check */}
        {errors.status?.message && (
          <p className='text-danger'>{errors.status?.message}</p>
        )}
        {/** TODO cancel button */}
        <Link href='/'>
          <a className='btn btn-outline-secondary border border-none'>Cancel</a>
        </Link>
        {/** submit button */}
        <input
          type='submit'
          className='btn btn-success ms-2'
          value={"Create auction"}
        />
        <ToastContainer />
      </form>
    </div>
  );
}

async function submitHandler(data, event) {
  // event.preventDefault();
  // console.log(data);

  await fetch(AUCTION_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) notify("Auction Created");
      console.log(data);
    })
    .catch(console.error);
}
