import { useState, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { env } from "../../next.config";

const cloudinaryUploadURL = process.env.CLOUDINARY_UNAUTH_UPLOAD_URL;
const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = process.env.CLOUDINARY_UNAUTH_UPLOAD_PRESET;

export default function Listing() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup
        .object()
        .shape({
          type: yup.string().required(),
          typeDescription: yup.string(),
          location: yup.object({
            latitude: yup.number(),
            logitude: yup.number(),
          }),
          dimension: yup.object({
            height: yup.number().positive().required(),
            width: yup.number().positive().required(),
          }),
          unit: yup.string().required(),
          address: yup.string().required(),
          status: yup.string().required(),
          imageUrls: yup.array(yup.string().url()),
        })
        .required(),
    ),
  });

  const [imageSrc, setImageSrc] = useState("/upload-icon.png");
  const [selectImage, setSelectImage] = useState("Select Images");
  const [otherType, setOtherType] = useState({ display: "none" });
  let imgSelect = useRef();

  return (
    <div className='container'>
      <h1 className='lead text-center'>Create Listing</h1>
      <hr className='' />
      <div style={{ width: "360px" }} className='m-auto'>
        <form
          onSubmit={submitHandler}
          method={"POST"}
          action={"/"}
          encType='multipart/form-data'>
          <figure
            className='border border-secondary d-inline-block cursor-hand p-4'
            style={{ cursor: "pointer" }}>
            <Image
              src={imageSrc}
              width={96}
              height={96}
              onClick={() => imgSelect.current.click()}
            />
            <figcaption
              className='text-small'
              onClick={() => imgSelect.current.click()}>
              {selectImage}
            </figcaption>
          </figure>

          <input
            type='file'
            name='file'
            id='file'
            accept='image/*'
            style={{ display: "none" }}
            ref={imgSelect}
            onChange={handleImageChange}
            multiple
          />
          {/**
           * Image URLs
           */}
          <datalist name='imageUrls' id='imageUrls'>
            <option value='' />
          </datalist>

          {/**
           * Type of ad space
           */}
          <div className='input-group mb-2'>
            <select
              defaultValue={""}
              onChange={(event) => {
                if (event.target.value === "other") {
                  setOtherType({ display: "block" });
                  console.log(event.target.value);
                  return;
                }
                setOtherType({ display: "none" });
              }}
              className='form-select'
              {...register("type")}>
              <option value=''>Select ad space type</option>
              <option value='billboard'>Billboard</option>
              <option value='bridge'>Bridge</option>
              <option value='bus'>Bus</option>
              <option value='digital'>Digital Transit</option>
              <option value='guerrila'>Guerrila</option>
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
            <br />
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
                {...register("latitude")}
              />
              <input
                type='number'
                id='long'
                placeholder='Longitude'
                className='form-control ms-1'
                {...register("longitude")}
              />
            </div>
          </fieldset>
          {/**
           * Ad space dimensions
           */}
          <fieldset>
            <legend>Dimensions</legend>
            <div className='input-group mb-2'>
              <input
                type='number'
                id='x'
                className='form-control me-2'
                placeholder="5''"
                {...register("height")}
              />
              <input
                type='number'
                id='y'
                className='form-control'
                placeholder="4''"
                {...register("width")}
              />

              <select
                id='unit'
                defaultValue={""}
                className='form-select ms-2'
                {...register("unit")}>
                <option value=''>unit</option>
                <option value='centimeters'>cm</option>
                <option value='inches'>in</option>
                <option value='feet'>ft</option>
              </select>
              <br />
              {errors.unit?.message && (
                <span className='text-danger'>{errors.unit.message}</span>
              )}
            </div>
          </fieldset>

          {/**
           * Ad space address
           */}
          <div className='input-group mb-2'>
            <input
              type='text'
              placeholder='Address here'
              className='form-control'
              {...register("address")}
            />
            <br />
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

          {errors.status?.message && (
            <span className='text-danger'>{errors.status.message}</span>
          )}
          <br />
          {/** Submit button */}
          <input
            type={"submit"}
            value={"Create Listing"}
            className='btn btn-success mb-2'
          />
        </form>
      </div>
    </div>
  );

  /**
   * Handle the submit event
   * @param {event} event
   */
  async function submitHandler(event) {
    event.preventDefault();
    const elements = event.target;

    // console.log(cloudinaryUploadURL);
    // console.log(cloudinaryName);
    // console.log(cloudinaryUploadPreset);

    // console.log(event.target.file);
    // upload the images
    console.log(elements.file.files);
    let uploadedImageFiles = await uploadImageFiles(elements.file.files);
    console.log(uploadedImageFiles);
    // wait for the urls from object
    // create adspace
    const adpaceId = await adspaceSubmitHandler({
      type: elements.type.value,
      otherType: elements.otherType?.value||"",
      location: {
        latitude: elements.latitude.value,
        longitude: elements.longitude.value,
      },
      dimension: {
        width: elements.width.value,
        height: elements.height.value,
        unit: elements.unit.value,
      },
      imagesURL: uploadedImageFiles,
      address: elements.address.value,
    });

    // create listing
    const userId = "62d5c2e8fa838b651f49b98c";

    if (adpaceId) {
      fetch("/api/v1/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          space: adpaceId,
          user: userId, // TODO find user ID to send with the request
          status: elements.status,
        }),
      });
    }

    // console.log(event.target.file);
  }

  /**
   * handle the image change
   * @param {*} event
   * @returns
   */
  async function handleImageChange(event) {
    const selectFilesCount = await event.target.files.length;
    let files = [];

    if (selectFilesCount === 0) return;

    for (let i = 0; i <= selectFilesCount; i++) {
      event.target.files[`${i}`] && files.push(event.target.files[`${i}`]);
    }

    setSelectImage(`${selectFilesCount} selected`);

    setImageSrc(URL.createObjectURL(files[0]));
  }
}

/**
 * Upload the images to the cloud storage
 * @param {*} files
 * @returns
 */
async function uploadImageFiles(files) {
  const uploadURL = process.env.CLOUDINARY_UNAUTH_UPLOAD_URL;

  let URLs = [];
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("file", files[i]);
    formData.append("cloud_name", cloudinaryName);
    formData.append("upload_preset", cloudinaryUploadPreset);
    // formData.append("public_id", files[i].name); //TODO give unique name for each file

    fetch(cloudinaryUploadURL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => URLs.push(data.secure_url))
      .catch((err) => console.error(err.message));
  }
  return URLs;
}

/**
 * Handle the creation of ad spaces
 * @param {*} obj
 */
async function adspaceSubmitHandler(obj) {
  const API_URL = "/api/v1/spaces";
  const {
    type,
    otherType,
    location: { latitude, longitude },
    dimension: { width, height },
    imageUrls,
    address,
  } = obj;

  //TODO print verufy the structure received
  console.log(obj);

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // TODO debugger line
      return data.id || undefined;
    })
    .catch(console.error);
}

/**
 * TODO add the multiple choices for selecting or creating new adspace
 *
 */
