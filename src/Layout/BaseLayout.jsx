import React, { useState, useEffect } from "react";
import Logo from "../assets/Thumbails/ce5699233cbc0f142250b520d967dff7 (1).png";
import { NavLink, useNavigate } from "react-router-dom";
import dashbordIcon from "../assets/Icons/Dashbord.svg";
import Users from "../assets/Icons/users.svg";
import produitsIcons from "../assets/Icons/Produits.svg";
import ordersIcons from "../assets/Icons/Commandes.svg";
import Custumers from "../assets/Icons/custumers.svg";
import Settings from "../assets/Icons/settings.svg";
import { Outlet } from "react-router-dom";
import ButtonLoader from "../Components/ButtonLoader/ButtonLoader";

const commonClassName =
  "flex items-center gap-2 py-2 px-4 my-1 text-md font-semibold rounded-lg hover:bg-orange-600 hover:text-white";
const activedLinkClassName =
  "flex items-center gap-2 py-2 px-4 my-1 text-white bg-orange-600 text-md font-semibold rounded-lg hover:bg-orange-600";

export default function BaseLayout() {
  const [logOutLoading, setLogOutLoading] = useState(false);
  const navigateTo = useNavigate();
  const openDialogModal = () => {
    document.getElementById("deconnection").showModal();
  };

  const closeModal = () => {
    console.log("I'm called");
    document.getElementById("deconnection").close();
  };

  const handlelogOut = () => {
    setLogOutLoading(true);
    setTimeout(() => {
      localStorage.removeItem("isConnected");
      setLogOutLoading(false);
      navigateTo("/authentification");
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* SIDE BAR */}
      <div className="h-full w-80 bg-gray-100  border border-r">
        {/* SIDE BAR ELEMENT */}

        {/* SIDE TOP ELEMENT */}
        <div className="pl-5 gap-4 pt-7 w-full">
          <div className="flex items-center justify-center">
            <img className="h-12 w-12 rounded-full" src={Logo} alt="logo" />
          </div>
          <h1 className="text-xl text-gray-600 leading-3 font-extrabold ml-6 ">
            Heaven Market
          </h1>
          {/* <h1 className="text-xl text-orange-600 font-extrabold ml-6 ">
            Heaven Market
          </h1> */}
        </div>

        {/* SIDE MILDE ELEMENT */}

        {/* NAVIGATIONS */}
        <div className="flex-1 flex-col mt-8 text-gray-600 px-4 py-4 gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activedLinkClassName : commonClassName
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-layout-grid-icon lucide-layout-grid"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            {/* <img src={dashbordIcon} alt="" className="w-5 h-5" /> */}
            Dashboard
          </NavLink>

          <NavLink
            to="/utilisateur"
            className={({ isActive }) =>
              isActive ? activedLinkClassName : commonClassName
            }
          >
            {/* <img src={Users} alt="" className="w-5 h-5" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-users-icon lucide-users"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            Utilisateurs
          </NavLink>

          <NavLink
            to="/produits"
            className={({ isActive }) =>
              isActive ? activedLinkClassName : commonClassName
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-shopping-bag-icon lucide-shopping-bag"
            >
              <path d="M16 10a4 4 0 0 1-8 0" />
              <path d="M3.103 6.034h17.794" />
              <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
            </svg>
            {/* <img src={produitsIcons} alt="" className="w-5 h-5" /> */}
            Produits
          </NavLink>

          <NavLink
            to="/clients"
            className={({ isActive }) =>
              isActive ? activedLinkClassName : commonClassName
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-hand-platter-icon lucide-hand-platter"
            >
              <path d="M12 3V2" />
              <path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5" />
              <path d="M2 14h12a2 2 0 0 1 0 4h-2" />
              <path d="M4 10h16" />
              <path d="M5 10a7 7 0 0 1 14 0" />
              <path d="M5 14v6a1 1 0 0 1-1 1H2" />
            </svg>
            {/* <img src={Custumers} alt="" className="w-5 h-5" /> */}
            Clients
          </NavLink>

          <NavLink
            to="/commandes"
            className={({ isActive }) =>
              isActive ? activedLinkClassName : commonClassName
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-shopping-cart-icon lucide-shopping-cart"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {/* <img src={ordersIcons} alt="" className="w-5 h-5" /> */}
            Commandes
          </NavLink>

          <NavLink
            to="/parametrage"
            className={({ isActive }) =>
              isActive ? activedLinkClassName : commonClassName
            }
          >
            {/* <img src={Settings} alt="" className="w-5 h-5" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-settings-icon lucide-settings"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Paramétrage
          </NavLink>

          <div
            className=" absolute bottom-5 bg-red-700 flex  items-center justify-center border w-56 py-3 rounded-md gap-2 cursor-pointer transition-all"
            onClick={openDialogModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-log-out-icon lucide-log-out"
            >
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>

            <button className="text-white font-semibold text-md">
              Se deconnecter
            </button>
          </div>
        </div>
        {/* SIDE BAR BOTTOM ELEMENT */}
      </div>

      {/* OUTLET (THE CHILDREN) */}
      <div className="outlet overflow-y-scroll w-full no-scrollbar">
        <Outlet />
      </div>

      <dialog id="deconnection" className="modal rounded-lg">
        <div className="modal-box p-3">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="my-4">
            <h1 className="text-lg font-extrabold leading-3 ">
              Se deconnecter
            </h1>
          </div>

          <div className={`h-24`}>
            <div className="mt-10 mb-5">
              <p className=" font-medium">
                Vous êtes sur le point de vous déconnecter. Toutes les
                modifications non enregistrées seront perduesq. Souhaitez-vous
                vraiment continuer ?
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className={`
                ${
                  logOutLoading
                    ? "cursor-not-allowed w-full h-10 bg-red-600 rounded-md text-white"
                    : "w-full h-10 bg-red-600 rounded-md text-white"
                }   
              `}
              onClick={handlelogOut}
            >
              {logOutLoading ? (
                <span className="flex items-center justify-center">
                  <>
                    <ButtonLoader />
                  </>
                </span>
              ) : (
                "Me deconnecter"
              )}
            </button>

            <button
              className={`${
                logOutLoading
                  ? "cursor-not-allowed w-full h-10 bg-gray-200 rounded-md text-black"
                  : "w-full h-10 bg-gray-200 rounded-md text-black"
              }`}
              onClick={closeModal}
            >
              Annuler
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
