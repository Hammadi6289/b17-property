import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsFillEyeFill } from "react-icons/bs";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import OAuth from "../components/OAuth";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmitHndler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
      toast.success("Signup Successfully");

      //alert("Signup Successfull");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center w-100 mt-4 container-fluid px-0">
        <form
          className="bg-light p-4 rounded shadow col-lg-6 col-md-8 col-sm-10 col-12 mx-auto"
          onSubmit={onSubmitHndler}
        >
          <h4 className="bg-dark p-2 mt-2 text-light text-center rounded-top">
            Create Your Account
          </h4>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={onChange}
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={onChange}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="johndoe@example.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onChange}
              className="form-control"
              id="password"
              placeholder="Enter a strong password"
            />
            <span>
              Show password
              <BsFillEyeFill
                className="text-danger ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowPassword((prevState) => !prevState);
                }}
              />
            </span>
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign up
          </button>
          <hr />
          <div className="text-center">
            <OAuth />
            <span>Already a user?</span>
            <Link to="/signin" className="text-decoration-none">
              Login
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
