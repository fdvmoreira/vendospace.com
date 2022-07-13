import { useForm } from "react-hook-form";
import { yup } from "yup";

export default function Listing() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className='container'>
      <h1 className='lead'>Create new Listing</h1>
      <hr className='' />

      {/** Ad space */}
      <span>Ad Space</span>

      {/** User ID */}
      <span>User ID</span>

      {/**  */}
      <select name='' id=''>
        <option value=''>Available</option>
        <option value=''>Sold</option>
        <option value=''>Rented</option>
        <option value=''>Active</option>
        <option value=''>Disabled</option>
      </select>
      {/**  */}

      {/**  */}

      {/**  */}

      {/**  */}
    </div>
  );
}
