import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserLoginAction } from "../../Redux/Actions/UserActions";
import Loading from "../Loading/Loading";

function Login() {
  const [email, Setemail] = useState();
  const [password, Setpassword] = useState();

  const dispatch = useDispatch();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(UserLoginAction(email, password));
  };

  const userLog = useSelector((state) => state.userLogin);
  const { loading, error, userLogin } = userLog;
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
      {userLogin ? (userLogin.data ? history.push("/") : null) : null}
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
                        <h3>LOGIN</h3>
                      </div>
                      <form onSubmit={SubmitHandler}>
                        <div className="form-group first">
                          <label htmlFor="Email">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            type="email"
                            name="email"
                            value={email}
                            required
                            placeholder="Enter Your Email"
                            onChange={(e) => Setemail(e.target.value)}
                          />
                        </div>
                        <div className="form-group last mb-4">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            required
                            placeholder="Enter Your Password"
                            onChange={(e) => Setpassword(e.target.value)}
                          />
                        </div>
                        <input
                          type="submit"
                          value="Log In"
                          className="btn btnnnnn text-white btn-primary"
                        />

                        <Link
                          className="btn btnnnnn text-white btn-primary"
                          to="/register"
                        >
                          Register
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

export default Login;
