export default function TextInput({type, name, placeholder}){
    return(
        <>
            <input type={type} name={name} placeholder={placeholder} className="form-control my-3"/>
        </>
    );
}