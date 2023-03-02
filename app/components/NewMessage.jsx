//TODO: ensure that the message is in the correct format before sending it to the server
//TODO: redesign the message form to present the form in better way
//TODO: Add character count to alert the user that the message size is limited


import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useLogin } from "../context/loginContext";
import notify from "../utils/notify";

export default function NewMessage({ recipient: to, subject }) {
  const [login, setLogin] = useLogin();
  const closeModalButton = useRef({});

  const schema = yup.object().shape({
    from: yup.string().required(),
    to: yup.string().required(),
    subject: yup.string().max(50).required(),
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
                defaultValue={login.userId}
                readOnly={true}
                {...register("from")}
              />
              {/** from error check */}
              {errors.from?.message && (
                <span className='alert alert-danger'>
                  {errors.from.message}
                </span>
              )}
            </div>
            {/** to */}
            <div className='m-1'>
              <input
                type='text'
                className='form-control'
                placeholder='to'
                defaultValue={to}
                readOnly={true}
                {...register("to")}
              />
              {/** to error check */}
              {errors.to?.message && (
                <span className='text-danger'>{errors.to.message}</span>
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

  /**
   * submit the message to the server
   * @param {objexxt} data to be sent to the server
   * @param {Event} event default event object of the form submitHandler
   */
  function onSubmit(data, event) {
    event.preventDefault();
    const API_NEWMESSAGE = "/api/v1/messages";

    fetch(API_NEWMESSAGE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: data.message, ...data }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return console.log(data?.message);
        notify("Message sent successfuly");
        closeModalButton.current.click();
      })
      .catch(console.error);
  }
}
