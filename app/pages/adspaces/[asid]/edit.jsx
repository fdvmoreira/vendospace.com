import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function AdSpaceEdit() {
  const { asid } = useRouter().query;
  const [imageSrc, setImageSrc] = useState("/upload-icon.png");
  const [selectImage, setSelectImage] = useState("Select Images");
  const [otherType, setOtherType] = useState({ display: "none" });
  let imgSelect = useRef();

  return (
    <div className='container'>
      {/** Page title */}
      <h1 className='lead text-center'>Change {asid}</h1>
      <hr className='' />
      <div style={{ width: "360px" }} className='m-auto'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
            onChange={imageSelectedHandler}
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
              name='type'
              defaultValue={"DEFAULT"}
              onChange={(event) => {
                if (event.target.value === "other") {
                  setOtherType({ display: "block" });
                  console.log(event.target.value);
                  return;
                }
                setOtherType({ display: "none" });
              }}
              className='form-select '
              required>
              <option value=''>Select Adspace type</option>
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
          </div>

          {/**
           * Other types
           */}
          <input
            type='text'
            placeholder='Type other ad space here ...'
            name='typeDescription'
            id='typeDescription'
            style={otherType}
            className='form-control mb-2'
          />

          {/**
           * Location
           */}
          <fieldset className='form-group'>
            <legend className='font-weight-bold'>Location</legend>

            <div className='d-flex input-group mb-2 '>
              <input
                type='number'
                name='lat'
                id='lat'
                placeholder='Latitude'
                className='form-control me-1'
              />
              <input
                type='number'
                name='long'
                id='long'
                placeholder='Longitude'
                className='form-control ms-1'
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
                name='x'
                id='x'
                className='form-control me-2'
                placeholder="5''"
              />
              <input
                type='number'
                name='y'
                id='y'
                className='form-control'
                placeholder="4''"
              />

              <select
                name='unit'
                id='unit'
                className='form-select ms-2'
                required>
                <option value='' selected className=''>
                  unit
                </option>
                <option value=''>in</option>
                <option value=''>cm</option>
              </select>
            </div>
          </fieldset>

          {/**
           * Ad space address
           */}
          <div className='input-group mb-2'>
            <input
              type='text'
              name=''
              id=''
              placeholder='Address here'
              className='form-control'
            />
          </div>

          <input
            type={"submit"}
            value={"Save changes"}
            className='btn btn-success mb-2'
          />
        </form>
      </div>
    </div>
  );

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.file);
  }

  async function imageSelectedHandler(event) {
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
