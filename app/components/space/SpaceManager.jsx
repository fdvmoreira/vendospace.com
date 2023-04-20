import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useAuth } from "../../context/authContext";
import notify from "../../utils/notify";

const SpaceManager =({spaceAPI, requestMethod, space}) => {
  
  const imageButton = useRef();
  const [imageSrc, setImageSrc] = useState("/upload-icon.png");
  const [selectImage, setSelectImage] = useState("Select Images");
  const [otherType, setOtherType] = useState({ display: "none" });

  const [auth, _] = useAuth();

  const {register,handleSubmit,formState: { errors },} = useForm({
    resolver: yupResolver(yup.object().shape({
      file: yup.mixed(),
      user: yup.string().required("Authentication required"),
      type: yup.string().required('Select the type of ad space'),
      address: yup.string().required('What is the address'),
      location: yup.object().shape({
        latitude: yup.number('Use DD(decimal degrees)'),
        longitude: yup.number('Use DD(decimal degrees'),
      }),
      dimension: yup.object().shape({
        width: yup.number().required('Width is not set'),
        height: yup.number().required('Height is not set'),
        unit: yup.string().required('Select the unit'),
      }),
    }))
  });

    /**
   * Handle the submit event
   * @param {event} event
   */
  const onSubmitHandler = async(data, event) =>{
    event.preventDefault();
    let uploadedImageFiles = [];
    if (data?.file?.length > 0){
      uploadedImageFiles = await uploadImageFiles(data?.file);
    }
    spaceSubmitHandler(
      {...data,imagesURL: uploadedImageFiles}, 
      requestMethod??null, 
      spaceAPI??null);
  }

    /**
   * handles the image change
   * @param {*} event
   * @returns
   */
  const handleImageChange = async (event) =>{
    const selectFilesCount = await event?.target?.files?.length;
    let files = [];

    if (selectFilesCount === 0) return;

    for (let i = 0; i <= selectFilesCount; i++) {
      event.target.files[i] && files.push(event.target.files[i]);
    }
    setSelectImage(`${selectFilesCount} selected`);
    setImageSrc(()=>URL.createObjectURL(files[0]));
  }

  const uploadImageFiles = async (files) =>{
    const cloudinaryUploadURL = process.env.CLOUDINARY_UNAUTH_UPLOAD_URL;
    const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
    const cloudinaryUploadPreset = process.env.CLOUDINARY_UNAUTH_UPLOAD_PRESET;
    let URLs = [];
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      formData.append("cloud_name", cloudinaryName);
      formData.append("upload_preset", cloudinaryUploadPreset);

      await fetch(cloudinaryUploadURL, {
        method: "POST",
        body: formData,
      })
      .then(res => res.json())
      .then(data => {
        if (data?.secure_url?.length > 0){
          URLs.push(data.secure_url);
        }
      })
      .catch(console.error);
    }
    return URLs;
  }

  /**
   * Handles the creation of ad spaces
   * @param {*} obj
   * @param {string} api endpoint
   */
  const spaceSubmitHandler = async(obj, requestMethod, api) =>{
    let createdAdSpaceId = "";
    const ADSPACE_API_URL = "/api/v1/spaces";

    await fetch(api??ADSPACE_API_URL, {
      method: requestMethod??"POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${auth?.token}`,
      },
      body: JSON.stringify(obj),
    })
    .then((res) => res.json())
    .then((data) => {
      notify(data?.message, data?.success);
      if (data?.success){
        createdAdSpaceId = data?.data?._id;
      } 
    })
    .catch(console.error);
    return createdAdSpaceId;
  }
  
  return (
    <div className='container'>
      <div style={{ width: "360px" }} className='m-auto'>
        <form onSubmit={handleSubmit(onSubmitHandler)} encType='multipart/form-data'>
          {/** user */}
          <input type='plain' className='form-control mb-2 d-none' value={auth?.user?._id??0} {...register("user")}/>
          {
            errors?.user && <p className="alert alert-warning">{errors?.user?.message}</p>
          }
          
          <figure
            className='border border-secondary d-inline-block cursor-hand p-4'
            style={{ cursor: "pointer" }}
            onClick={(e) => imageButton?.current?.click()}>
            <Image
              src={imageSrc}
              width={96}
              height={96}/>
            <figcaption className='text-small'>
              {selectImage}
            </figcaption>
          </figure>

          {/** Files */}
          <input
            className='btn form-control mb-2 me-2'
            type='file'
            id='file'
            accept='image/*'
            onChange={(e) => {
              handleImageChange;
              setImageSrc(()=> URL.createObjectURL(e.target.files[0]));
            }}
            ref={imageButton} 
            multiple {...register('file')}/>
          {errors.file?.message && <p className='alert alert-danger'>{errors?.file?.message}</p>}
          
          {/** Type */}
          <div className='form-group mb-2 '>
            <select
              className='form-select'
              defaultValue={space?.type??""}
              onChange={(event) => {
                if (event?.target?.value === "other") {
                  setOtherType(()=>{ display: "block" });
                  return;
                }
                setOtherType(()=>{ display: "none" });
              }}
              {...register("type")}>
              <option value=''>Select ad space type</option>
              <option value='billboard'>Billboard</option>
              <option value='bridge'>Bridge</option>
              <option value='bus'>Bus</option>
              <option value='digital'>Digital Transit</option>
              <option value='guerrilla'>Guerrilla</option>
              <option value='lamp-post'>Lamp Post</option>
              <option value='outdoor'>Outdoors</option>
              <option value='point-of-sale'>Point of Sale</option>
              <option value='poster'>Poster</option>
              <option value='rail'>Rail</option>
              <option value='shelter'>Shelter</option>
              <option value='stunt'>Stunt</option>
              <option value='transit'>Transit</option>
              <option value='wall'>Wall</option>
              <option value='other'>Other</option>
            </select>
            {/** display error if the field is empty */}
            {errors.type && <p className='alert alert-warning'>{errors.type.message}</p>}
          </div>
          {/** Other types */}
          <input
            type='text'
            id='typeDescription'
            style={otherType}
            className='form-control mb-2'
            placeholder={space?.otherType??'Type other ad space here ...'}
            defaultValue={space?.otherType??""}
            {...register("typeDescription")} />
            {/** other type error */}
            {errors.typeDescription?.message && (
              <p className='alert alert-warning'>
                {errors.typeDescription.message}
              </p>
            )}
          {/** Location */}
          <fieldset className='form-group'>
            <legend className='font-weight-bold'>Location</legend>
            <div className='d-flex input-group mb-2 '>
              <input
                type='number'
                step='any'
                placeholder={space?.location?.latitude??"ex: 41.759056"}
                defaultValue={space?.location?.latitude??null}
                className='form-control me-1'
                {...register("location.latitude")} />
              <input
                type='number'
                step='any'
                placeholder={space?.location?.longitude??"ex: -0.1960752"}
                defaultValue={space?.location?.longitude??null}
                className='form-control ms-1'
                {...register("location.longitude")} />
            </div>
          </fieldset>
          {/** Ad space dimensions */}
          <fieldset>
            <legend>Dimensions</legend>
            <div className='form-group mb-2'>
              <div className='row form-row gx-2'>
                <div className='col'>
                  <input
                    type='number'
                    id='x'
                    className='form-control'
                    placeholder={space?.dimension?.width??"ex: 5"}
                    defaultValue={space?.dimension?.width??null}
                    {...register("dimension.height")}
                  />
                </div>
                <div className='col'>
                  <input
                    type='number'
                    id='y'
                    className='form-control'
                    placeholder={space?.dimension.height??"ex: 3"}
                    defaultValue={space?.dimension?.height??null}
                    {...register("dimension.width")}
                  />
                </div>
                <div className='col col-5'>
                  <select
                    id='unit'
                    placeholder={space?.dimension?.unit??""}
                    defaultValue={space?.dimension?.unit??""}
                    className='form-select'
                    {...register("dimension.unit")}>
                    <option value=''>unit</option>
                    <option value='cm'>centimeters</option>
                    <option value='in'>inches</option>
                    <option value='ft'>feet</option>
                  </select>
                  
                </div>
              </div>
              {errors.dimension && (
                <p className='alert alert-warning'>
                  Provide the dimensions
                </p>
              )}
            </div>
            
          </fieldset>
          {/** Ad space address */}
          <div className='form-group mb-2'>
            <input
              type='text'
              placeholder={space?.address??'Address here'}
              defaultValue={space?.address??""}
              className='form-control'
              {...register("address")} />
            {/** address error check */}
            {
              errors?.address?.message && <p className='alert alert-warning'>{errors?.address?.message}</p>
            }
          </div>
          <div className="d-flex justify-content-end">
            <Link href='/' className='btn btn-outline-secondary mb-2'>Cancel</Link>
            {/** Submit button */}
            <input type={"submit"} value={"Save changes"} className='btn btn-success mb-2 ms-2' />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SpaceManager;