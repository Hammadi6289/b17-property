import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import Spinner from "./Spinner";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container-fluid">
      {listings === null ? (
        <Spinner />
      ) : (
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          useKeyboardArrows={true}
        >
          {listings.map(({ data, id }) => (
            <div
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <h6 className="bg-info text-light p-2 m-0">
                <span className="ms-2"> {data.name}</span>
              </h6>
              <img
                src={data.imgUrls[0]}
                height={400}
                width={800}
                alt={data.name}
              />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Slider;
