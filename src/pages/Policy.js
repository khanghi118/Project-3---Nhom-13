import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Terms and Conditions"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/adidas-13-1024.webp"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1>Privacy Policy effective as of August 1, 8</h1>
          <p>1. What does this Privacy Policy indicate?</p>
          <p>2. Who is responsible for your Personal Data?</p>
          <p>3. Who is the Data Protection Officer?</p>
          <p>4. What Personal Data (Categories of Personal Data) does adidas collect and use?</p>
          <p>5. What does adidas do with your Personal Data and why (Purpose, Processing)?</p>
          <p>7. How do we secure your Personal Data?</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;