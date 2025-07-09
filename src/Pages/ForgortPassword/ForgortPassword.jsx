import React, { useState } from "react";
import mainBg from "../../assets/Thumbails/shopping-mall-7340181_1280.jpg";
import forIcon from "../../assets/Thumbails/ce5699233cbc0f142250b520d967dff7 (1).png";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";

export default function ForgortPassword() {
  const [globalFormData, setGloblaFormData] = useState({
    userName: "",
  });
  const [error, setError] = useState({
    userName: "",
    passWord: "",
  });

  const [AppBooleanState, setAppBooleanState] = useState({
    sendingEmailLoading: false,
    inputContaintsError: false,
    showPassword: false,
    sendingEmailSuccess: false,
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
   * Simple regular expression to check a valid email
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

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
        sendingEmailLoading: false,
      }));
      setAppBooleanState((previouState) => ({
        ...previouState,
        inputContaintsError: true,
      }));
      return;
    }
    setAppBooleanState((previouState) => ({
      ...previouState,
      sendingEmailLoading: true,
    }));

    setTimeout(() => {
      setAppBooleanState((previouState) => ({
        ...previouState,
        sendingEmailLoading: false,
      }));
      if (isValidEmail(globalFormData.userName)) {
        setAppBooleanState((previousState) => ({
          ...previousState,
          sendingEmailSuccess: true,
        }));
        toast.success(
          "Merci, votre adresse mail est enregistrée Vous recevrez un nouvel accès sous peu."
        );
        setGloblaFormData({
          userName: "",
        });
      } else {
        toast.error("Veuillez renseigner une address mail valide !");
      }
    }, 2000);
  };

  /**
   *
   */

  return (
    <div className="relative w-full h-screen">
      {/* Image de fond */}
      <img
        src={mainBg}
        alt="image de couverture"
        className="absolute w-full h-full object-cover"
      />

      {/* Overlay*/}
      <div className="absolute w-full h-full bg-black/45"></div>

      {/* Formulaire centré */}
      <div className="flex items-center justify-center w-full h-full p-3">
        <div className="relative bg-gray-100 p-2  md:p-5 rounded-xl shadow-md w-full max-w-md md:max-w-lg h-fit">
          <div className="flex items-center justify-center">
            <img
              src={forIcon}
              alt="image du logo"
              className="w-14 h-14 rounded-full text-center"
            />
          </div>
          <h2 className="text-lg font-medium mb-6 text-gray-600 text-center">
            Veuillez renseigner votre adrress mail
          </h2>
          {/* 
          <span className="  absolute mx-auto top-24 text-xs font-medium text-green-600">
            Merci, votre adresse mail est enregistrée. <br /> Vous recevrez un
            nouvel accès sous peu.
          </span> */}

          <div className="form-control w-full max-w-full">
            <label className="label mb-0">
              <span className="label-text font-bold -mb-1 text-gray-600 text-xs  ">
                Addresse mail
              </span>
            </label>
            <input
              value={globalFormData.userName}
              onChange={handleChange}
              name="userName"
              type="text"
              placeholder="Ex: kouadio@gmail.com"
              className={`input input-bordered text-xs w-full h-5 md:h-10 max-w-full rounded-md ${
                error.userName && AppBooleanState.inputContaintsError
                  ? "input-error"
                  : ""
              } `}
              disabled={AppBooleanState.sendingEmailLoading}
            />
          </div>

          <div className="pt-5 md:pt-7" onClick={handleLogin}>
            <button
              className="w-full flex items-center justify-center  text-white p-0 md:p-2 rounded bg-orange-600 font-normal md:font-medium transition"
              disabled={AppBooleanState.sendingEmailLoading}
            >
              {AppBooleanState.sendingEmailLoading ? (
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
                "Envoyer"
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
                AppBooleanState.sendingEmailLoading
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-500 cursor-pointer"
              }`}
              disabled={AppBooleanState.sendingEmailLoading}
              onClick={() => {
                if (!AppBooleanState.sendingEmailLoading) {
                  navigateTo("/authentification");
                }
              }}
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
