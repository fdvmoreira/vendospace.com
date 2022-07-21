const TextInput = ({ type, name, value, placeholder, required }) => {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        className='form-control my-3'
      />
    </>
  );
};

export default TextInput;
