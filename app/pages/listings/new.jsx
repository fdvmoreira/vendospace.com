import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useAuth } from "../../context/authContext";
import notify from "../../utils/notify";

const cloudinaryUploadURL = process.env.CLOUDINARY_UNAUTH_UPLOAD_URL;
const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = process.env.CLOUDINARY_UNAUTH_UPLOAD_PRESET;

export default function Listing() {
  const imageButton = useRef();
  const [imageSrc, setImageSrc] = useState("/upload-icon.png");
  const [selectImage, setSelectImage] = useState("Select Images");
  const [otherType, setOtherType] = useState({ display: "none" });

  const [auth, _] = useAuth();
  /** form schema */
  const schema = yup.object().shape({
    // TODO set the limit for the size of files accepted
    // file: yup.mixed().test("size", "Please select a file", (files) => {
    //   return files?.size <= 4*1024*1024 0;
    // }),
    user: yup.string().required().label("User"),
    type: yup.string().label("Type").required(),
    typeDescription: yup
      .string()
      .default("")
      .when("type", {
        is: (type) => type === "other",
        then: yup.string().required("A short description is required"),
      }),
    location: yup.object().shape({
      latitude: yup.number(),
      longitude: yup.number(),
    }),
    dimension: yup.object().shape({
      height: yup.number().positive().required(),
      width: yup.number().positive().required(),
      unit: yup
        .string()
        .label("Unit")
        .when(["height", "width"], {
          is: (height, width) => {
            return height || width;
          },
          then: yup.string().required(),
        }),
    }),
    address: yup.string().label("Address").required(),
    status: yup.string().label("Status").required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className='container'>
      <h1 className='lead text-center'>Create Listing</h1>
      <hr className='' />
      <div style={{ width: "360px" }} className='m-auto'>
        <form
          onSubmit={handleSubmit(submitHandler)}
          encType='multipart/form-data'>
          <figure
            className='border border-secondary d-inline-block cursor-hand p-4'
            style={{ cursor: "pointer" }}>
            <Image
              src={imageSrc}
              width={96}
              height={96}
              onClick={(e) => {
                console.log(imageButton);
                imageButton?.current?.click();
              }}
            />
            <figcaption
              className='text-small'
              onClick={(e) => imageButton?.current?.click()}>
              {selectImage}
            </figcaption>
          </figure>
          {/** user */}
          <input
            type='plain'
            className='form-control mb-2 d-none'
            value={auth?.user?._id}
            onChange={(e) => console.log("user has changed")}
            {...register("user")}
          />
          {/** error check */}
          {errors.user?.message && (
            <p className='text-danger'>{errors.user?.message}</p>
          )}

          {/** Files */}
          <input
            type='file'
            id='file'
            className='btn form-control mb-2 me-2 d-none'
            accept='image/*'
            onChange={(e) => {
              handleImageChange;
              console.log(e.target.files);
              setImageSrc(URL.createObjectURL(e.target.files[0]));
            }}
            multiple
            ref={imageButton}
            name='file'
            // {...register("file")}
          />
          {/** file error check */}
          {errors.file?.message && (
            <p className='text-danger'>{errors.file?.message}</p>
          )}

          {/**
           * Type of ad space
           */}
          <div className='form-group mb-2 '>
            <select
              className='form-select'
              defaultValue={""}
              onChange={(event) => {
                if (event.target.value === "other") {
                  setOtherType({ display: "block" });
                  console.log(event.target.value);
                  return;
                }
                setOtherType({ display: "none" });
              }}
              {...register("type")}>
              <option value=''>Select ad space type</option>
              <option value='billboard'>Billboard</option>
              <option value='bridge'>Bridge</option>
              <option value='bus'>Bus</option>
              <option value='digital'>Digital Transit</option>
              <option value='guerrilla'>Guerrilla</option>
              <option value='lampPost'>Lamp Post</option>
              <option value='outdoor'>Outdoors</option>
              <option value='pointOfSale'>Point of Sale</option>
              <option value='poster'>Poster</option>
              <option value='rail'>Rail</option>
              <option value='shelter'>Shelter</option>
              <option value='stunt'>Stunt</option>
              <option value='transit'>Transit</option>
              <option value='wall'>Wall</option>
              <option value='other'>Other</option>
            </select>
            {/** display error if the field is empty */}
            {errors.type?.message && (
              <span className='text-danger'>{errors.type.message}</span>
            )}
          </div>

          {/**
           * Other types
           */}
          <input
            type='text'
            placeholder='Type other ad space here ...'
            id='typeDescription'
            style={otherType}
            className='form-control mb-2'
            {...register("typeDescription")}
          />
          {/** other type error */}
          {errors.typeDescription?.message && (
            <span className='text-danger'>
              {errors.typeDescription.message}
            </span>
          )}

          {/**
           * Location
           */}
          <fieldset className='form-group'>
            <legend className='font-weight-bold'>Location</legend>

            <div className='d-flex input-group mb-2 '>
              <input
                type='number'
                id='lat'
                placeholder='Latitude'
                className='form-control me-1'
                {...register("location.latitude")}
              />
              <input
                type='number'
                id='long'
                placeholder='Longitude'
                className='form-control ms-1'
                {...register("location.longitude")}
              />
            </div>
          </fieldset>
          {/**
           * Ad space dimensions
           */}
          <fieldset>
            <legend>Dimensions</legend>
            <div className='form-group mb-2'>
              <div className='row form-row gx-2'>
                <div className='col'>
                  <input
                    type='number'
                    id='x'
                    className='form-control'
                    placeholder="5''"
                    {...register("dimension.height")}
                  />
                </div>
                <div className='col'>
                  <input
                    type='number'
                    id='y'
                    className='form-control'
                    placeholder="4''"
                    {...register("dimension.width")}
                  />
                </div>
                <div className='col col-5'>
                  <select
                    id='unit'
                    defaultValue={""}
                    className='form-select'
                    {...register("dimension.unit")}>
                    <option value=''>unit</option>
                    <option value='cm'>centimeters</option>
                    <option value='in'>inches</option>
                    <option value='ft'>feet</option>
                  </select>
                  {/** error check */}
                  {errors.dimension?.unit?.message && (
                    <span className='text-danger small'>
                      {errors.dimension.unit.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </fieldset>

          {/**
           * Ad space address
           */}
          <div className='form-group mb-2'>
            <input
              type='text'
              placeholder='Address here'
              className='form-control'
              {...register("address")}
            />
            {/** address error check */}
            {errors.address?.message && (
              <span className='text-danger'>{errors.address.message}</span>
            )}
          </div>

          <select
            defaultValue={""}
            className='form-select mb-2'
            {...register("status")}>
            <option value=''>Select status</option>
            <option value='active'>Active</option>
            <option value='rented'>Rented</option>
            <option value='disabled'>Disabled</option>
          </select>
          {/** error check */}
          {errors.status?.message && (
            <p className='text-danger'>{errors.status.message}</p>
          )}
          <br />
          <Link href='/' className='btn btn-outline-secondary mb-2'>
            cancel
          </Link>

          {/** Submit button */}
          <input
            type={"submit"}
            value={"Create Listing"}
            className='btn btn-success mb-2 ms-2'
          />
        </form>
      </div>
      <ToastContainer autoClose={4000} />
    </div>
  );

  /**
   * Handle the submit event
   * @param {event} event
   */
  async function submitHandler(data, event) {
    event.preventDefault();
    // console.log({ ...data, mine: "extra" });
    const elements = event.target;

    // upload the images
    let uploadedImageFiles = [];
    if (elements.file.files.length > 0)
      uploadedImageFiles = await uploadImageFiles(elements.file.files);

    // create adspace
    let adspaceId = await adspaceSubmitHandler({
      ...data,
      imagesURL: uploadedImageFiles,
    });

    // create listing
    listingSubmitHandler({
      space: adspaceId,
      user: data.user,
      status: data.status,
    });
  }

  /**
   * handles the image change
   * @param {*} event
   * @returns
   */
  async function handleImageChange(event) {
    const selectFilesCount = await event.target.files.length;
    let files = [];

    if (selectFilesCount === 0) return;

    for (let i = 0; i <= selectFilesCount; i++) {
      // event.target.files[`${i}`] && files.push(event.target.files[`${i}`]);
      event.target.files[i] && files.push(event.target.files[i]);
    }
    setSelectImage(`${selectFilesCount} selected`);
    setImageSrc(URL.createObjectURL(files[0]));
  }
}

/**
 * Uploads the images to the cloud storage
 * @param {*} files
 * @returns
 */
async function uploadImageFiles(files) {
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
      .then((res) => res.json())
      .then((data) => {
        if (data?.secure_url.length > 0)
          notify(files.length + " Images uploaded");
        URLs.push(data.secure_url);
      })
      .catch(console.error);
  }
  return URLs;
}

/**
 * Handles the creation of ad spaces
 * @param {*} obj
 */
async function adspaceSubmitHandler(obj) {
  let createdAdSpaceId = "cocoloco";
  const ADSPACE_API_URL = "/api/v1/spaces";

  await fetch(ADSPACE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) notify("Space created!");
      createdAdSpaceId = data.id;
    })
    .catch(console.error);
  return createdAdSpaceId;
}

/**
 * Handle listing submiting
 * @param {*} param0
 */
async function listingSubmitHandler({ space, user, status }) {
  const LISTINGS_API_URL = "/api/v1/listings";

  await fetch(LISTINGS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      space,
      user,
      status,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) notify("Listing created");
      console.log(data?.message || data?.stack);
    })
    .catch(console.error);
}
