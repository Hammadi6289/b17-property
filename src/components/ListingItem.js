import React from "react";
import { FaBath, FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div
          className="card category-link"
          style={{
            maxWidth: "800px",
            margin: "20px auto",
            backgroundColor: "#fff",
            borderRadius: "20px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Link to={`/category/${listing.type}/${id}`}>
            <div className="row container p-2">
              <div className="col-md-5">
                <img
                  src={listing.imgUrls[0]}
                  className="img-thumbnail"
                  alt={listing.name}
                  height={200}
                  width={300}
                  objectFit="cover"
                  borderRadius="10px"
                  style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}
                />
              </div>
              <div className="col-md-5">
                <p className="text-muted" style={{ color: "#666" }}>
                  {listing.location}
                </p>
                <h2 style={{ color: "#333", fontSize: "24px" }}>
                  {listing.name}
                </h2>
                <p
                  className="price"
                  style={{ color: "#333", fontSize: "18px" }}
                >
                  Rs :{" "}
                  {listing.offer
                    ? listing.discountedPrice
                    : listing.regularPrice}{" "}
                  {listing.type === "rent" && " / Month"}
                </p>
                <p
                  className="features"
                  style={{ color: "#666", fontSize: "16px" }}
                >
                  <FaBed /> &nbsp;
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} Bedrooms`
                    : "1 Bedroom"}
                  &nbsp; | &nbsp;
                  <FaBath /> &nbsp;
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} Bathrooms`
                    : "1 Bathroom"}
                </p>
              </div>
            </div>
          </Link>
          <div>
            {onDelete && (
              <button
                className="btn btn-danger"
                onClick={() => onDelete(listing.id)}
              >
                Remove Post
              </button>
            )}
            {onEdit && (
              <button
                className="btn btn-info"
                onClick={() => onEdit(listing.id)}
              >
                Edit Post
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingItem;
