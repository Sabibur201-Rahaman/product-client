import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  GetProfileDetails,
  ProfileUpdateRequest,
} from "../../ApiRequest/ApiRequest";
import { IsEmail, IsEmpty, IsMobile, getBase64 } from "../../helper/FormHelper";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserDetails } from "../../helper/SessionHelper";

function profile() {
  let emailRef,
    firstNameRef,
    lastNameRef,
    mobileRef,
    passwordRef,
    userImgRef,
    userImgView = useRef();
  useEffect(() => {
    (async () => {
 await GetProfileDetails();
    })();
  }, []);
  const navigate = useNavigate();
  const ProfileData = useSelector((state) => state.profile.ProfileValue);
  // const ProfileData = getUserDetails();
  const PreviewImage = () => {
    let ImgFile = userImgRef.files[0];
    getBase64(ImgFile).then((base64Img) => {
      userImgView.src = base64Img;
    });
  };

  const UpdateMyProfile = () => {
    let email = emailRef.value;
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    let mobile = mobileRef.value;
    let password = passwordRef.value;
    let photo = userImgView.src;
    console.log(email)
    console.log(firstName)
    console.log(lastName)
    console.log(mobile)
    console.log(password)
    if (IsEmail(email)) {
      toast.error("Valid Email Address is required");
    } else if (IsEmpty(firstName)) {
      toast.error("firstName is required");
    } else if (IsEmpty(lastName)) {
      toast.error("lastName is required");
    } else if (!IsMobile(mobile)) {
      toast.error("valid mobile no is required");
    } else if (IsEmpty(password)) {
      toast.error("password is required");
    } else {
      ProfileUpdateRequest(
        email,
        firstName,
        lastName,
        mobile,
        password,
        photo
      ).then((result) => {
        if (result === true) {
          navigate("/");
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <img
                  ref={(input) => (userImgView = input)}
                  className="icon-nav-img-lg"
                  src={ProfileData?.photo}
                  alt=""
                />
                <hr />
                <div className="row">
                  <div className="col-4 p-2">
                    <label>Profile Picture</label>
                    <input
                      onChange={PreviewImage}
                      ref={(input) => (userImgRef = input)}
                      className="form-control animated fadeInUp"
                      type="file"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Email Address</label>
                    <input
                      key={Date.now()}
                      value={ProfileData?.email}
                      readOnly={false}
                      ref={(input) => (emailRef = input)}
                      placeholder="User Email"
                      className="form-control animated fadeInUp"
                      type="email"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>First Name</label>
                    <input
                      key={Date.now()}
                      value={ProfileData?.FirstName}
                      ref={(input) => (firstNameRef = input)}
                      placeholder="First Name"
                      className="form-control animated fadeInUp"
                      type="text"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Last Name</label>
                    <input
                      key={Date.now()}
                      value={ProfileData?.lastName}
                      ref={(input) => (lastNameRef = input)}
                      placeholder="Last Name"
                      className="form-control animated fadeInUp"
                      type="text"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Mobile</label>
                    <input
                      key={Date.now()}
                      value={ProfileData?.mobile}
                      ref={(input) => (mobileRef = input)}
                      placeholder="Mobile"
                      className="form-control animated fadeInUp"
                      type="mobile"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Password</label>
                    <input
                      key={Date.now()}
                      value={ProfileData?.password}
                      ref={(input) => (passwordRef = input)}
                      placeholder="User Password"
                      className="form-control animated fadeInUp"
                      type="password"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <button
                      onClick={UpdateMyProfile}
                      className="btn w-100 float-end btn-primary animated fadeInUp"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;
