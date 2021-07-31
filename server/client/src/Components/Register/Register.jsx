import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserRegisterAction } from "../../Redux/Actions/UserActions";
import Loading from "../Loading/Loading";

function Register() {
  const [name, Setname] = useState();
  const [email, Setemail] = useState();
  const [password, Setpassword] = useState();
  const [confirmpassword, Setconfirmpassword] = useState();

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
        UserRegisterAction(name, email, password, confirmpassword)
      );
    }
  };

  const userRegisterr = useSelector((state) => state.userRegister);
  const { loading, error, userRegister } = userRegisterr;
  const history = useHistory();
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
      {userRegister ? (userRegister.data ? history.push("/") : null) : null}
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
      />
      {/* Same as */}
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 contents">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="form-block">
                      <div className="mb-4">
                        <h3>Register</h3>
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
                            required
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
                            required
                            placeholder="Confirm Your Password"
                            type="password"
                            className="form-control"
                            id="password"
                            name="Confrim password"
                            value={confirmpassword}
                            onChange={(e) => Setconfirmpassword(e.target.value)}
                          />
                        </div>
                        <input
                          type="submit"
                          value="Register"
                          className="btn btnnnnn text-white btn-primary"
                        />

                        <Link
                          className="btn btnnnnn text-white btn-primary"
                          to="/login"
                        >
                          login
                        </Link>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Register;
