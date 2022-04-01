import React, { useState } from "react";
import { postRegister, postSignIn } from "../requests";
import SnackBar from "./SnackBar";

export default function Register(props) {
  let tempUser = props.user.username;

  const [myReg, setMyReg] = useState({
    username: "",
    email: "",
    password: "",
    pwdConf: "",
  });

  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });

  const [confirmed, setConfirmed] = useState({
    signIn: false,
    register: false,
  });

  const [snackBar, setSnackBar] = useState({
    state: false,
    colour: "",
    type: "",
    message: "",
  });

  const signInForm = (
    <div className="m-auto flex flex-col items-center w-1/2 border-2 border-blue-700 bg-blue-50 rounded-2xl">
      <div className="my-4 text-xl uppercase text-blue-700 font-bold">
        Sign In
      </div>
      <form
        className="w-5/6 mb-5 bg-white rounded-xl shadow-lg border border-1 border-blue-700 "
        onSubmit={handleSignIn}
      >
        <div className="ml-4 my-2">
          <label className="text-blue-700 font-semibold" htmlFor="username">
            Username:
          </label>
        </div>
        <div className="">
          <input
            required
            name="username"
            type="text"
            value={signIn.username || ""}
            onChange={handleSignInChange}
            className="ml-4 w-2/3 border border-gray-300 rounded-md shadow-sm p-1"
          />
        </div>
        <div className="my-4 ml-4">
          <label className="text-blue-700 font-semibold" htmlFor="password">
            Password:
          </label>
        </div>
        <div className="flex flex-col">
          <input
            required
            name="password"
            type="password"
            value={signIn.password || ""}
            onChange={handleSignInChange}
            className="ml-4 w-2/3 border border-gray-300 rounded-md shadow-sm p-1"
          />
        </div>
        <div className="flex flex-row m-4 justify-around">
          <button className="btn-form">Sign in</button>
        </div>
      </form>
    </div>
  );

  const registerForm = (
    <div className="m-auto flex flex-col w-1/2 h-full my-6 border-2 border-blue-700 bg-blue-50 rounded-2xl">
      <div className="my-2 text-xl text-blue-700 font-bold text-center">
        New to ΤΕΚΝΟΣΚΕΝΑ?
      </div>
      <div className="mb-2 text-center text-lg font-semibold  text-orange-600">
        Register
      </div>
      <form
        className="bg-white w-5/6 m-auto rounded-xl shadow-lg border border-1 border-blue-700 flex flex-col justify-center text-blue-700 font-semibold "
        onSubmit={handleRegister}
      >
        <div className="flex flex-col ml-4 my-2">
          <label className="" htmlFor="username">
            Username: <p className="inline-block">*</p>
          </label>
        </div>
        <div className="flex flex-col">
          <input
            required
            name="username"
            type="text"
            value={myReg.username || ""}
            onChange={handleRegisterChange}
            className="ml-4 w-2/3 border border-gray-300 rounded-md shadow-sm p-1"
          />
        </div>
        <div className="flex flex-col mt-4 ml-4 mb-2">
          <label className="" htmlFor="email">
            Email: <p className="inline-block">*</p>
          </label>
        </div>
        <div className="flex flex-col">
          <input
            required
            name="email"
            type="email"
            value={myReg.email || ""}
            onChange={handleRegisterChange}
            className="ml-4 w-2/3 border border-gray-300 rounded-md shadow-sm p-1"
          />
        </div>
        <div className="flex flex-col mt-4 ml-4 mb-2">
          <label className="" htmlFor="password">
            Password: <p className="inline-block">*</p>
          </label>
        </div>
        <div className="flex flex-col">
          <input
            required
            name="password"
            type="password"
            value={myReg.password || ""}
            onChange={handleRegisterChange}
            className="ml-4 w-2/3 border border-gray-300 rounded-md shadow-sm p-1"
          />
        </div>
        <div className="flex flex-col mt-4 ml-4 mb-2">
          <label className="" htmlFor="pwdConf">
            Confirm password: <p className="inline-block">*</p>
          </label>
        </div>
        <div className="flex flex-col">
          <input
            required
            name="pwdConf"
            type="password"
            value={myReg.pwdConf || ""}
            onChange={handleRegisterChange}
            className="ml-4 w-2/3 border border-gray-300 rounded-md shadow-sm p-1"
          />
        </div>
        <div className="flex flex-row my-4 justify-around">
          <button className="btn-form">Register</button>
        </div>
      </form>
      <p className="my-4 text-center text-blue-700 font-bold">
        *{" "}
        <span className="text-orange-600 font-normal">
          Required Information
        </span>
      </p>

      <div className="grid grid-cols-2">
        <div>
          <div className="my-2 text-xl text-blue-700 font-bold text-center">
            Already Registered?
          </div>
          <div className="mb-2 text-center text-lg font-semibold  text-orange-600">
            Sign in
          </div>
          <div className="flex flex-row my-4 justify-around">
            <button
              className="btn-form"
              onClick={() =>
                setConfirmed((prevConfirmed) => {
                  return {
                    ...prevConfirmed,
                    register: true,
                  };
                })
              }
            >
              Sign in
            </button>
          </div>
        </div>
        <div>
          <div className="my-2 text-xl text-blue-700 font-bold text-center">
            Signed in?
          </div>
          <div className="mb-2 text-center text-lg font-semibold  text-orange-600">
            Sign out
          </div>
          <div className="flex flex-row my-4 justify-around">
            <button className="btn-form" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const actionConfirmed = (
    <div className="flex justify-center mt-20 ">
      <div className="flex flex-col justify-center w-4/12 items-center bg-blue-50 rounded-2xl border-2 border-blue-700">
        <div
          className="bg-orange-100 border-l-4 rounded-lg border-orange-500 text-orange-700 p-2 m-4"
          role="alert"
        >
          <p className="font-bold">
            Hi, {tempUser}! You have signed in successfully!`
          </p>
        </div>
        <button
          className="mb-4 p-2 border border-blue-700 text-blue-700 bg-white rounded-lg hover:border-white hover:bg-blue-700 hover:font-bold hover:shadow-2xl hover:text-white transition ease-out duration-500"
          onClick={() => props.goPage("home")}
        >
          {tempUser ? "Return Home" : "Sign in"}
        </button>
      </div>
    </div>
  );

  function validatePassword() {
    return myReg.password === myReg.pwdConf ? true : false;
  }

  function resetSnackBar() {
    // sets SnackBar state back to false after 3 seconds
    setTimeout(() => {
      setSnackBar({
        state: false,
        colour: "",
        type: "",
        message: "",
      });
    }, 5000);
  }

  function handleRegisterChange(evt) {
    const { name, value } = evt.target;
    setMyReg((prevMyReg) => {
      return {
        ...prevMyReg,
        [name]: value,
      };
    });
  }

  function handleSignInChange(evt) {
    const { name, value } = evt.target;
    setSignIn((prevSignIn) => {
      return {
        ...prevSignIn,
        [name]: value,
      };
    });
  }

  function handleRegister(evt) {
    evt.preventDefault();
    // if the passwords are not the same it sets SnackBar state to true to make it appear and notify the user
    !validatePassword()
      ? setSnackBar({
          state: true,
          colour: "red",
          type: "warning",
          message: "Passwords do NOT match!",
        })
      : postRegister(myReg, setSnackBar, resetSnackBar, setConfirmed);
    resetSnackBar();
  }

  function handleSignIn(evt) {
    evt.preventDefault();
    postSignIn(
      signIn,
      props.setUserState,
      tempUser,
      setConfirmed,
      setSnackBar,
      resetSnackBar
    );
  }

  function handleSignOut() {
    props.signOutUser();
    setConfirmed({
      signIn: false,
      register: false,
    });
    props.goPage("home");
  }

  return (
    <React.Fragment>
      {snackBar.state === true ? (
        <SnackBar
          colour={snackBar.colour}
          type={snackBar.type}
          message={snackBar.message}
        />
      ) : confirmed.signIn ? (
        actionConfirmed
      ) : confirmed.register ? (
        signInForm
      ) : (
        registerForm
      )}
    </React.Fragment>
  );
}
