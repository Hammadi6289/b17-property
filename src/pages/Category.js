import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout/Layout";
import { db } from "./../firebase.config";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  where, //for sql query
  orderBy,
  limit, //pagination
  startAfter,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Category = () => {
  const [listing, setListing] = useState(null);
  const [lastFetchListing, setLastFetchListing] = useState(null);

  const [loading, setLoading] = useState(true);
  const params = useParams();

  //fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //reference
        const listingsRef = collection(db, "listings");
        //query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(15)
        );
        //execute query
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
          // console.log(doc.data());
        });
        setListing(listings);
        setLoading(false);
        ////Note: FirebaseError: The query requires an index. You can create it here:
        //// This might take some time
      } catch (error) {
        console.log(error);
        toast.error("Error fetching data");
      }
    };
    fetchListing();
  }, [params.categoryName]);

  //loadmore pagination func
  const fetchLoadMoreListing = async () => {
    try {
      //refrence
      const listingsRef = collection(db, "listings");
      //query
      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchListing),
        limit(10)
      );
      //execute query
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Unble to fetch data");
    }
  };

  return (
    <Layout>
      <div className="mt-3 container-fluid">
        <h1>
          {params.categoryName === "rent"
            ? "Property For Rent"
            : "Property For Sale"}
        </h1>
        {loading ? (
          <Spinner />
        ) : listing && listing.length > 0 ? (
          <>
            <div>
              {listing.map((list) => (
                <ListingItem listing={list.data} id={list.id} key={list.id} />
              ))}
            </div>
          </>
        ) : (
          <p>No Listings Found For {params.categoryName} </p>
        )}
      </div>
      <div className="d-flex align-item-center justify-content-center mb-4 mt-4">
        {lastFetchListing && (
          <button className="btn btn-primary" onClick={fetchLoadMoreListing}>
            Load more
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Category;
