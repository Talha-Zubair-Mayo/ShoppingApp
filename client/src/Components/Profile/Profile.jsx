import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  UserUpdateAction,
  UserInfoAction,
} from "../../Redux/Actions/UserActions";
import Loading from "../Loading/Loading";

function Profile() {
  const userInfoo = useSelector((state) => state.userInfo);
  const { userInfo } = userInfoo;
  const [name, Setname] = useState(userInfo?.name);
  const [email, Setemail] = useState(userInfo?.email);
  const [password, Setpassword] = useState();
  const [confirmpassword, Setconfirmpassword] = useState();
  const userTokeno = useSelector((state) => state.userToken);
  const { userToken } = userTokeno;
  const dispatch = useDispatch();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Password Does not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      await dispatch(
        UserUpdateAction(name, email, password, confirmpassword, userToken)
      );
      await dispatch(UserInfoAction(userToken));
    }
  };

  const userUpdater = useSelector((state) => state.userUpdate);
  const { loading, error, userUpdate } = userUpdater;

  const history = useHistory();

  toast.success(userUpdate, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  toast.error(error, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
      {/* Same as */}
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : userInfo ? (
        <>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 contents">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="form-block">
                      <div className="mb-4">
                        <h3>Profile</h3>
                      </div>
                      <form onSubmit={SubmitHandler}>
                        <div className="form-group first">
                          <label htmlFor="Name">Name</label>
                          <input
                            required
                            placeholder="Enter Your Name "
                            type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={(e) => Setname(e.target.value)}
                          />
                        </div>
                        <div className="form-group first">
                          <label htmlFor="Email">Email</label>
                          <input
                            className="form-control"
                            required
                            placeholder="Enter Your Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => Setemail(e.target.value)}
                          />
                        </div>
                        <div className="form-group last mb-4">
                          <label htmlFor="password">Password</label>
                          <input
                            placeholder="Enter Your Password"
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => Setpassword(e.target.value)}
                          />
                        </div>
                        <div className="form-group last mb-4">
                          <label htmlFor="password">Confirm Password</label>
                          <input
                            placeholder="Confirm Your Password"
                            type="password"
                            className="form-control"
                            id="cpassword"
                            name="Confrim password"
                            value={confirmpassword}
                            onChange={(e) => Setconfirmpassword(e.target.value)}
                          />
                        </div>
                        <input
                          type="submit"
                          value="Update Profile"
                          className="btn btnnnnn text-white btn-primary"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </>
  );
}

export default Profile;
