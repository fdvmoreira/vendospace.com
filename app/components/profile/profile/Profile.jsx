import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useAuth } from "../../../context/authContext";
import notify from "../../../utils/notify";

const Profile = ()=> {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
  });
  const { register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  });

  let [auth, _] = useAuth();
  let [profile, setProfile] = useState("");
  
  useEffect(()=>{
    fetch(`/api/v1/users/${auth?.user?._id??0}/profile`,{
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token}`,
      }
    })
    .then(response => response.json())
    .then(data => setProfile(data.data))
    .catch(console.error);
  }, []);

  const onSubmitHandler = (data)=>{
    fetch(`/api/v1/users/${auth?.user?._id??0}/profile`,{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token}`,
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if(data?.success) setProfile(data.data);
      notify(data?.message, data?.success);
    })
    .catch(console.error);
  }

  return (
    <div className="container d-flex flex-sm-column flex-lg-row">
      <Image src={profile?.avatarUrl??"/logo.jpeg"} 
        alt="User profile photo" 
        width={150} 
        height={150} 
        className="border m-2"
      />
      
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="form-group m-2">
          <label htmlFor="name">Name</label>
          <input
            {...register('name')}
            type="text" 
            id="name" 
            placeholder={profile?.name??"No name"}
            className="form-control" 
            />
          {errors?.name&&<span className="text-danger">{errors?.name?.message}</span>}
        </div>
        
        <div className="form-group m-2">
          <label htmlFor="email">Email</label>
          <input 
            {...register('email')}
            type="text" 
            id="email"
            placeholder={profile?.email??"email@example.com"} 
            className="form-control"
            disabled
            />
          {errors?.email&&<p className="text-danger">{errors?.email?.message}</p>}
          <small className="bi bi-pen text-muted" onClick={(e)=>{
            e.target.parentNode.childNodes[1].removeAttribute("disabled");
          }}>&nbsp;change email</small>
        </div>
        
        <div className="form-group m-2 d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">Save changes</button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default Profile;