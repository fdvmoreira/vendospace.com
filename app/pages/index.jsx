import React from "react";
import TextInput from "../components/textInput";
import { useState } from "react";

const Index = (props) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [otherType, setOtherType] = useState({ display: "none" });

  const handleDimensionRangeChange = (event) => {
    setCurrentValue(event.target.value);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <input
            type='search'
            className='form-control rounded '
            placeholder='Search'
            aria-label='Search'
          />
          <button type='button' className='btn btn-outline-primary'>
            search
          </button>
        </div>
      </form>

      <div className='row d-flex'>
        <aside className='border flex d-flex aside col'>
          <form onSubmit={handleFilter}>
            <h6>Filter</h6>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                name='auction'
                id='auction'
              />
              <label htmlFor='auction' className='form-check-label'>
                {" "}
                Auction{" "}
              </label>
            </div>

            <div className='form-check mb-2'>
              <input
                className='form-check-input'
                type='checkbox'
                name='standard'
                id='standard'
              />
              <label htmlFor='standard' className='form-check-label'>
                {" "}
                Standard{" "}
              </label>
            </div>

            <div className='mb-2'>
              <select
                name=''
                defaultValue={"All"}
                onChange={(event) => {
                  if (event.target.value === "other") {
                    setOtherType({ display: "block" });
                    console.log(event.target.value);
                    return;
                  }
                  setOtherType({ display: "none" });
                }}
                id='medium'
                className='form-select'
                aria-label='Default select example'
                required>
                <option value='all'>All</option>
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

            {/** Price */}
            <fieldset className='text-muted'>
              <legend>Price</legend>
              <div className='input-group mb-2'>
                <input
                  type='text'
                  inputMode='number'
                  maxLength={7}
                  size={7}
                  placeholder='price min'
                  className='form-control me-1'
                />
                <input
                  type='text'
                  inputMode='number'
                  maxLength={7}
                  size={7}
                  placeholder='price max'
                  className='form-control ms-1'
                />
              </div>
            </fieldset>

            {/** size */}
            <fieldset className='text-muted'>
              <legend>Size</legend>
              <div className='input-group mb-2 g-3'>
                <input
                  type='text'
                  placeholder='width'
                  className='form-control me-1'
                />

                <input
                  type='text'
                  placeholder='height'
                  className='form-control ms-1 me-1'
                />

                <select className='form-select ms-1' defaultValue={""} required>
                  <option value='' disabled>
                    unit
                  </option>
                  <option value='centimeter'>cm</option>
                  <option value='foot'>ft</option>
                </select>
              </div>
            </fieldset>

            {/** Apply button */}
            <input
              type='submit'
              value='Apply'
              className='btn btn-outline-success mb-3'
            />
          </form>
        </aside>

        <main className='col border'>list of posts</main>
      </div>
    </div>
  );
};

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(event.target);
};

const handleFilter = (event) => {};

export default Index;
