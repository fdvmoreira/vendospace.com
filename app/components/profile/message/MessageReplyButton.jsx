import NewMessage from "./NewMessage";

const MessageReplyButton = ({ to, subject }) => {
  return (
    <>
      <button
        className='btn btn-sm btn-outline-primary'
        data-bs-toggle='modal'
        data-bs-target='#messageModal'>
        <i className='bi bi-reply'>&nbsp;Reply</i>
      </button>
      <NewMessage recipient={to} subject={"RE: " + subject} />
    </>
  );
};

export default MessageReplyButton;
