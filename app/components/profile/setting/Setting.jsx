import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../../context/authContext";
import notify from "../../../utils/notify";

const Setting = () =>{

  const router = useRouter();
  let [auth, updateAuth] = useAuth();
  let [account, setAccount] = useState({});

  let {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(yup.object().shape({
      type: yup.string().required(),
    }))
  });

  useEffect(() =>{
    fetch(`/api/v1/users/${auth?.user?._id??0}/account`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token}`,
      },
    })
    .then(res => res.json())
    .then(data => setAccount(data?.data))
    .catch(console.error);
  },[]);

  const onSubmitHandle = (data)=>{
    fetch(`/api/v1/accounts/${account?._id??0}`,{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token}`,
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if(data?.success) setAccount(data?.data);
      notify(data?.message, data?.success);
    })
    .catch(console.error);
  }

  const deleteAccount = (event)=>{
    fetch(`/api/v1/users/${auth?.user?._id??0}`,{
      method: 'DELETE',
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth?.token}`,
      }
    })
    .then(res => res.json())
    .then(data => {
      notify(data?.message, data?.success);
      if(data?.success){
        updateAuth({});
        setTimeout(()=> router.push('/'), 3000);
      }
    })
    .catch(console.error);
  }

  const enableAccountTypeChange = (event)=>{
    const SELECT = 1;
    event.target.parentNode.childNodes[SELECT].removeAttribute("disabled");
  }

  const enableSubmitButton = (event)=>{
    const SUBMIT_BUTTON_PARENT = 1;
    const SUBMIT_BUTTON = 0;

    event
    .target
    .parentNode.parentNode.parentNode
    .childNodes[SUBMIT_BUTTON_PARENT]
    .childNodes[SUBMIT_BUTTON].removeAttribute("disabled");
  }

  return (
    <div className="container d-flex flex-column">
      <fieldset>
        <legend>Account Status</legend>
        <p className="text">{account?.status??"active"}</p>
      </fieldset>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <fieldset>
          <legend>Account Type</legend>
          <div className="form-group form-row">
            <label htmlFor="type" className="sr-only">Account Type</label>
            <select className="form-select" {...register('type')} id="type" onChange={enableSubmitButton} disabled>
              <option value={"personal"}>Personal</option>
              <option value={"professional"}>Professional</option>
              <option value={"business"}>Business</option>
            </select>
            <small className="bi bi-pen btn btn-sm" onClick={enableAccountTypeChange}>&nbsp;change type</small>
          </div>
        </fieldset>
        <div className="d-flex justify-content-end">
          <input type="submit" value="Save changes" className="btn btn-outline-primary" disabled/>
        </div>
      </form>
      
      <hr className="hr" />
      <fieldset>
        <legend>Danger Zone</legend>    
        <p>Note that this action is permanent and cannot be undone. All your data and information will be deleted.</p>
        <div className="d-flex justify-content-end">
          <button onClick={deleteAccount} className="btn btn-outline-danger">Delete account</button>
        </div>
      </fieldset>
    </div>
  );
}

module.exports = Setting;