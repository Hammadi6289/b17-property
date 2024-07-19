import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate, Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Listing = () => {
  const [listing, setListing] = useState(null); // Change to null to avoid initial state issues
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout title={listing.name}>
      <div className="row listing-container">
        <div className="col-md-8 listing-container-col1">
          <div className="card-header">
            {listing.imgUrls ? (
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                useKeyboardArrows={true}
              >
                {listing.imgUrls.map((url, index) => (
                  <div key={index}>
                    <img src={url} alt={listing.name} />
                  </div>
                ))}
              </Carousel>
            ) : (
              <Spinner />
            )}
          </div>
          <div className="card-body">
            <h3>{listing.name}</h3>
            <h6>
              Price:{" "}
              {listing.offer ? listing.discountedPrice : listing.regularPrice} /
              RS
            </h6>
            <p>Property For: {listing.type === "rent" ? "Rent" : "Sale"}</p>
            {listing.offer && (
              <p>
                <span>
                  {listing.regularPrice - listing.discountedPrice} Discount
                </span>
              </p>
            )}
            <p>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1 Bedroom"}
            </p>
            <p>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : "1 Bathroom"}
            </p>
            <p>{listing.parking ? `Parking spot` : "No spot for parking"}</p>
            <p>{listing.furnished ? `Furnished house` : "Not furnished"}</p>
            <Link
              className="btn btn-success"
              to={`/contact/${listing.useRef}?listingName=${listing.name}`}
            >
              Contact Landlord
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Listing;
