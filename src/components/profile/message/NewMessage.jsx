import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useAuth } from "../../../context/authContext";
import notify from "../../../utils/notify";

const NewMessage = ({ recipient: to, subject }) => {
  const [auth, _] = useAuth();
  const closeModalButton = useRef({});

  const schema = yup.object().shape({
    from: yup.string().required("Authentication required"),
    to: yup.string().required("Authentication required"),
    subject: yup.string().max(50).required("Subject line"),
    message: yup.string().max(200).required("What you want to say"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, event) => {
    event.preventDefault();
    const MESSAGE_API = "/api/v1/messages";

    fetch(MESSAGE_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token ?? null}`,
      },
      body: JSON.stringify({ text: data.message, ...data }),
    })
      .then((res) => res.json())
      .then((data) => {
        notify("Message sent successfuly!");
        closeModalButton.current.click();
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
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
                ref={closeModalButton}
                type='button'
                className='btn close'
                data-bs-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'></div>
            {/** sender id */}
            <div className='m1'>
              <input
                type='hidden'
                className='form-control'
                placeholder='Your User ID'
                defaultValue={auth?.user?._id}
                readOnly={true}
                {...register("from")}
              />
              {/** from error check */}
              {errors.from?.message && (
                <span className='alert text-warning'>
                  {errors.from.message}
                </span>
              )}
            </div>
            {/** to */}
            <div className='m-1'>
              <input
                type='hidden'
                className='form-control'
                placeholder='to'
                defaultValue={to}
                readOnly={true}
                {...register("to")}
              />
              {/** to error check */}
              {errors.to?.message && (
                <span className='alert text-warning'>{errors.to.message}</span>
              )}
            </div>
            {/** subject */}
            <div className='m-1'>
              <input
                type='text'
                className='form-control'
                placeholder='Subject'
                defaultValue={subject}
                {...register("subject")}
              />
              {/** subject error check */}
              {errors.subject?.message && (
                <span className='alert text-warning'>
                  {errors.subject.message}
                </span>
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
                <span className='alert text-warning'>
                  {errors.message.message}
                </span>
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
};

export default NewMessage;
