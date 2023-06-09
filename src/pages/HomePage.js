import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import {Checkbox, Radio} from "antd";
import toast from "react-hot-toast"
import { Prices } from "../components/Prices";

const HomePage = () => {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState ([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      const {data} = await axios.get("/api/v1/product/get-product")
      setProducts(data.products)
    } catch (error) {
      console.log(error);
    }
  };

    const handleFilter = (value,id) => {
      let all = [...checked]
      if (value) {
        all.push(id)
      } else {
        all = all.filter((c) => c !== id)
      }
      setChecked(all);
    }
  
  useEffect(() => {
    if(!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if(checked.length || !radio.length) filterProduct();
  }, [checked, radio]);

  //get filtred product
  const filterProduct = async () => {
    try {
      const {data} = await axios.post("/api/v1/product/product-filters",{checked,radio})
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    
        <Layout title={"All Products"}>
          <div className="row mt-3">
            <div className="col-md-2">
              {/* filter category */}
              <h4 className="text-center">Filter by Category</h4>
              <div className="d-flex felx-column">
              {categories?.map((c)=> (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))}
              </div>

{/* filter price */}

              <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          </div>
              <div className="col-md-9">
                {JSON.stringify(radio,null,3)}
                <h1 className="text-center">All Products</h1>
                <div className="d-flex flex-wrap">
                {products?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">${p.price}</p>
                    <button class="btn btn-primary ms-1">See Deatails</button>
                    <button class="btn btn-secondary ms-1">Add to cart</button>
                  </div>
                </div>
              
            ))}
                </div>
                </div>
                </div>
        </Layout>
        
  )
}

export default HomePage