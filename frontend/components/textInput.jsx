export default function TextInput({type, placeholder}){
    return(
        <>
            <input type={type} placeholder={placeholder} className="form-control my-3"/>
        </>
    );
}