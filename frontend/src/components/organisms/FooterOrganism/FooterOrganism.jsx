import React from "react";
import FooterMolecule from "../../molecules/FooterMolecule/FooterMolecule";
import "./FooterOrganism.style.scss";
import FeaturesBanner from "../FeaturesBannerOrganism/FeaturesBanner";

function Footer() {
  return (
    <>
      <FeaturesBanner />
      <div className="footer-container">
        <div className="address-div">
          <h2 style={{ marginBottom: "1rem" }}>BookHeaven</h2>
          <h4>Address : </h4>
          <p>215/F, Baridhara, Dhaka.</p>
          <p>Bangladesh</p>
          <h4>Email : </h4>
          <p>bookheaven247@gmail.com</p>
          <h4>Phone : </h4>
          <p>+880 1712345678</p>
        </div>

        <FooterMolecule
          header="Our Stores"
          list={["Dhaka", "Barishal", "Rajshahi", "Khulna", "Barishal"]}
        />
        <FooterMolecule
          header="Useful Links"
          list={[
            "Privacy & Policy",
            "Returns",
            "Trems & Conditions",
            "Contact Us",
            "Latest News",
            "Our Sitemap",
          ]}
        />
        <FooterMolecule
          header="Social Links"
          list={["facebook", "youtube", "instagram", "whatsapp"]}
        />
      </div>
      <div className="footer-bottom">
        <p>© 2023 BookHeaven. All Rights Reserved.</p>
      </div>
    </>
  );
}

export default Footer;
