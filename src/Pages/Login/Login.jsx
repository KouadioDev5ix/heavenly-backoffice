import React, { useState } from "react";
import mainBg from "../../assets/Thumbails/shopping-venture-4536066_1280.jpg";
import forIcon from "../../assets/Thumbails/ce5699233cbc0f142250b520d967dff7 (1).png";
import { access } from "../../Acces";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";

import showPassword from "../../assets/Icons/show_Password.svg";
import HiddePassWord from "../../assets/Icons/HiddePASSWRD.svg";

export default function Login() {
  const [globalFormData, setGloblaFormData] = useState({
    userName: "",
    passWord: "",
  });
  const [error, setError] = useState({
    userName: "",
    passWord: "",
  });

  const [AppBooleanState, setAppBooleanState] = useState({
    logingLoding: false,
    inputContaintsError: false,
    showPassword: false,
  });

  const navigateTo = useNavigate();
  /**
   *
   * @param {*} field
   * @returns
   */

  const formateField = (field) => {
    const mapping = {
      userName: "Nom d'utilisateur",
      passWord: "Mot de pass",
    };

    return mapping[field] || field;
  };

  /**
   *
   * @param {*} e
   */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGloblaFormData((previouState) => ({
      ...previouState,
      [name]: value,
    }));
  };

  /**
   *
   * @returns
   */

  const handleLogin = () => {
    const newErrorOccured = {};
    Object.entries(globalFormData).forEach(([key, value]) => {
      if (value.trim() === "") {
        newErrorOccured[key] = `${formateField(key)} est réquis`;
        return;
      }
    });
    setError(newErrorOccured);
    const inputHasError = Object.values(newErrorOccured).some(
      (error) => error !== ""
    );

    if (inputHasError) {
      setAppBooleanState((previouState) => ({
        ...previouState,
        logingLoding: false,
      }));
      setAppBooleanState((previouState) => ({
        ...previouState,
        inputContaintsError: true,
      }));
      return;
    }

    setAppBooleanState((previouState) => ({
      ...previouState,
      logingLoding: true,
    }));

    setTimeout(() => {
      setAppBooleanState((previouState) => ({
        ...previouState,
        logingLoding: false,
      }));
      if (
        globalFormData.userName === access.username &&
        globalFormData.passWord === access.psw
      ) {
        localStorage.setItem("isConnected", "true");
        navigateTo("/");
      } else {
        toast.error("Oups, nom utilisateur ou mot de pass incorrecte");
      }
    }, 2000);
  };

  /**
   *
   */

  const hiddeOrShowPassWord = () => {
    setAppBooleanState((previouState) => ({
      ...previouState,
      showPassword: !previouState.showPassword,
    }));
  };

  return (
    <div className="relative w-full h-screen">
      {/* Image de fond */}
      <img
        src={mainBg}
        alt="image de couverture"
        className="absolute w-full h-full object-cover"
      />

      {/* Overlay*/}
      {/* <div className="absolute w-full h-full bg-black/55"></div> */}

      {/* Formulaire centré */}
      <div className="relative flex items-center justify-center w-full h-full p-3">
        <div className="bg-gray-100 p-2  md:p-5 rounded-xl shadow-md w-full max-w-md md:max-w-lg h-fit">
          <div className="flex items-center justify-center">
            <img
              src={forIcon}
              alt="image du logo"
              className="w-14 h-14 rounded-full text-center"
            />
          </div>
          <h2 className="text-lg font-medium mb-3 text-gray-600 text-center">
            Bienvenue, commencez par vous authentifier !
          </h2>

          <div className="form-control w-full max-w-full">
            <label className="label mb-0">
              <span className="label-text font-bold -mb-1 text-gray-600 text-xs  ">
                Nom utilisateur <span className="text-red-600">*</span>
              </span>
            </label>
            <input
              value={globalFormData.userName}
              onChange={handleChange}
              name="userName"
              type="text"
              placeholder="Ex: Fredo@"
              className={`input input-bordered text-xs w-full h-5 md:h-10 max-w-full rounded-md ${
                error.userName && AppBooleanState.inputContaintsError
                  ? "input-error"
                  : ""
              } `}
              disabled={AppBooleanState.logingLoding}
            />
          </div>

          <div className="form-control w-full relative max-w-full">
            <label className="label mb-0">
              <span className="label-text font-bold text-gray-600 -mb-1 text-xs  ">
                Mot de pass <span className="text-red-600">*</span>
              </span>
            </label>
            <input
              value={globalFormData.passWord}
              onChange={handleChange}
              name="passWord"
              type={AppBooleanState.showPassword ? "text" : "password"}
              placeholder="***************"
              className={`input input-bordered text-xs w-full h-5 md:h-10 max-w-full rounded-md ${
                error.passWord && AppBooleanState.inputContaintsError
                  ? "input-error"
                  : ""
              } `}
              disabled={AppBooleanState.logingLoding}
            />

            <span
              onClick={hiddeOrShowPassWord}
              className="absolute cursor-pointer inset-y-0 mt-7 right-0 pr-3 flex items-center justify-center text-sm"
            >
              {AppBooleanState.showPassword ? (
                <>
                  <img src={showPassword} alt="eye icon" className="w-5 h-5" />
                </>
              ) : (
                <>
                  <img src={HiddePassWord} alt="eye hash" className="w-5 h-5" />
                </>
              )}
            </span>
          </div>
          <div className="pt-5 md:pt-7" onClick={handleLogin}>
            <button
              className="w-full flex items-center justify-center  text-white p-0 md:p-2 rounded bg-orange-600 font-normal md:font-medium transition"
              disabled={AppBooleanState.logingLoding}
            >
              {AppBooleanState.logingLoding ? (
                <>
                  <RotatingLines
                    visible={true}
                    height="24"
                    width="24"
                    strokeColor="#fff"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 my-6">
            <hr className="flex-grow border-t border-gray-400" />
            <span className="text-gray-500 text-sm">OU</span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>

          <div className="flex items-center justify-center">
            <button
              className={`underline font-medium md:font-semibold ${
                AppBooleanState.logingLoding
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-500 cursor-pointer"
              }`}
              disabled={AppBooleanState.logingLoding}
              onClick={() => {
                if (!AppBooleanState.logingLoding) {
                  navigateTo("/mot-de-pass-oublié");
                }
              }}
            >
              Mot de pass oublier ?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
