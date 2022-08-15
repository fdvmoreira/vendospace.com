import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer } from "react-toastify";
import notify from "../utils/notify";

export default function NewMessage({ recipient, subject }) {
  const schema = yup.object().shape({
    recipient: yup.string().required(),
    subject: yup.string().required(),
    message: yup.string().max(200).required(),
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
        className='modal fade m-auto'
        id='messageModal'
        tabIndex='-1'
        role='dialog'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>New Message</h5>
              {/** modal close button */}
              <button
                type='button'
                className='btn close'
                data-bs-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'></div>
            {/** recipient */}
            <div className='m-1'>
              <input
                type='text'
                className='form-control'
                placeholder='Recipient'
                defaultValue={recipient}
                readOnly={true}
                {...register("recipient")}
              />
              {/** recipient error check */}
              {errors.recipient?.message && (
                <span className='text-danger'>{errors.recipient.message}</span>
              )}
            </div>
            {/** subject */}
            <div className='m-1'>
              <input
                type='text'
                className='form-control'
                placeholder='Subject'
                {...register("subject")}
              />
              {/** subject error check */}
              {errors.subject?.message && (
                <span className='text-danger'>{errors.subject.message}</span>
              )}
            </div>
            {/** message */}
            <div className='form-outline m-1'>
              <textarea
                id='message'
                placeholder='Message'
                className='form-control'
                rows='4'
                {...register("message")}
              />
              {/** message error check */}
              {errors.message?.message && (
                <span className='text-danger'>{errors.message.message}</span>
              )}
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn' data-bs-dismiss='modal'>
                {" "}
                Cancel
              </button>
              <input
                type='submit'
                className='btn btn-success'
                value='Send Message'
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
