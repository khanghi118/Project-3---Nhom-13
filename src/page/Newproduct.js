import React, { useState } from 'react';
import { RiGalleryUploadFill } from "react-icons/ri";
import { ImagetoBase64 } from '../utility/ImagetoBase64';

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price:"",
    description: "",
  })
  const handleOnChange = (e) => {
    const {name, value} = e.target
setData((preve)=>{
return{
  ...preve,
  [name]: value
}
})
  }
const uploadImage= async (e) =>{
  const data = await ImagetoBase64(e.target.files[0])
  console.log(data)
}
const handleSubmit =(e) => {
  e.preventDefault()
  console.log(data)
}
  return (
    <div className="p-4">
      <form className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-lg font-medium">Name</label>
        <input type="text" name="name" className="bg-gray-200 p-2 my-1 rounded" onChange={handleOnChange} />

        <label htmlFor="category" className="text-lg font-medium">Category</label>
        <select className="bg-gray-200 p-2 my-1 rounded" id="category" name="category" onChange={handleOnChange}>
          <option>Nike</option>
          <option>Adidas</option>
          <option>Puma</option>
          <option>MLB</option>
          <option>Vans</option>
        </select>

        <label htmlFor="image" className="text-lg font-medium" name="image">Image
        <div className="h-40 w-full bg-gray-200 rounded flex items-center justify-center cursor-pointer">
          <span className="text-5xl"><RiGalleryUploadFill /></span>
          <img src=""/>
          <input type={"file"} accept="image/*" id="image"  onChange={uploadImage} className="hidden"/>
        </div>
        </label>
        <label htmlFor="price" className="text-lg font-medium my-1">Price</label>
        <input type="text" className="bg-gray-200 p-2 my-1 rounded" name="price" onChange={handleOnChange} />

        <label htmlFor="description" className="text-lg font-medium" >Description</label>
        <textarea rows={3} className="bg-gray-200 p-2 my-1 rounded resize-none" onChange={handleOnChange} name="description" ></textarea>

        <button className="bg-black text-white font-medium py-2 px-4 rounded hover:bg-gray-800">
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
