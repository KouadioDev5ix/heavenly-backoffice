import { CircularProgress, Pagination } from "@mui/material";
import { RefreshCcw, Search, SquarePlus, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import deleteIcon from "../../BASE/archive-check-svgrepo-com (2).svg";
import editIcon from "../../BASE/pen-2-svgrepo-com (3).svg";
import toast from "react-hot-toast";
import ButtonLoader from "../../Components/ButtonLoader/ButtonLoader";

export default function Users() {
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState({
    userDataLoading: false,
    deleteUserLoading: false,
    editUserLoading: false,
    filterIsActive: false,
    filterLoading: false,
  });

  const [editUser, setEditUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [inputHasError, setInputHasError] = useState(false);
  const [addUserLoarder, setAddUserLoarder] = useState(false);
  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    userName: "",
    city: "",
    number: "",
    mail: "",
  });
  const [inputs, setInputs] = useState({
    lastName: "",
    firstName: "",
    userName: "",
    city: "",
    number: "",
    mail: "",
  });
  const [user, setUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectUserToDeleteID, setselectUserToDeleteID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const usersToDisplay = stateLoading.filterIsActive ? filteredUsers : user;
  const currentUsers = usersToDisplay.slice(indexOfFirstUser, indexOfLastUser);
  const [searhTerm, setSearchTerm] = useState("");

  /**
   * Filters users based on a search term that matches either the last name or first name.
   * If the search term is empty, it resets the filter and , related loading states.
   * Otherwise, it activates a loadingg state, applies the filter, and updates the UI after az short delay.
   *
   * @function searhUserByLastNameOrFirstName
   * @returns {void}
   */

  const searhUserByLastNameOrFirstName = () => {
    if (searhTerm.trim() === "") {
      setStateLoading((previousState) => ({
        ...previousState,
        filterIsActive: false,
      }));
      setUserDataLoading(false);
      setStateLoading((previousState) => ({
        ...previousState,
        filterLoading: false,
      }));
      setFilteredUsers([]);
      return;
    }
    const filtered = user.filter((user) => {
      const key = user.lastName + " " + user.firstName;
      return key.toLowerCase().includes(searhTerm.toLowerCase());
    });
    setStateLoading((prev) => ({ ...prev, filterLoading: true }));
    setUserDataLoading(true);
    setTimeout(() => {
      setFilteredUsers(filtered);
      setCurrentPage(1);
      setStateLoading((prev) => ({ ...prev, filterIsActive: true }));
      setStateLoading((prev) => ({ ...prev, filterLoading: false }));
      setUserDataLoading(false);
    }, 1000);
  };

  /**
   * Cancels the active search by resetting the filtered user list
   * and desactivating the filter statee.
   *
   * @function cancelSearch
   * @returns {void}
   */
  const cancelSearch = () => {
    setStateLoading((previousState) => ({
      ...previousState,
      filterIsActive: false,
    }));
    setFilteredUsers([]);
  };

  /**
   * ::::::::::::::::::::::::::::::::::::PAGINATION:::::::::::::::::::::::::::::::
   */
  /**
   * Handles pagination change by updating the current page number.
   *
   * @function handlePageChange
   * @param {React.ChangeEvent<unknown>} event - The event triggered by the pagination component.
   * @param {number} value - The new page number seleccted by the user.
   * @returns {void}
   */
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  /**
   * :::::::::::::::::::::::LOCAL STORAGE SECTION ::::::::::::::::::::::::::::::::::::
   */

  /**
   * Loads user data from localStorage and updates the user state.
   * Activates loading indicators during the simulated fetch delay.
   * If an error occurs while parsing the data, it logs the error and resets the user list.
   *
   * @function loadUserSinceLocalStorage
   * @returns {void}
   */

  const loadUserSinceLocalStorage = () => {
    try {
      setUserDataLoading(true);
      setStateLoading((previousState) => ({
        ...previousState,
        filterLoading: true,
      }));
      setTimeout(() => {
        const saveUser = JSON.parse(localStorage.getItem("users")) || [];
        setUser(saveUser);
        setStateLoading((previousState) => ({
          ...previousState,
          filterLoading: false,
        }));
        setUserDataLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error while reading data", error);
      setUser([]);
    }
  };

  /**
   * Stores the given user list in localStorage under the key "users".
   *
   * @function storeUserInLocalStorage
   * @param {Array<Object>} user - The array of user objects to store.
   * @returns {void}
   */

  const storeUserInLocalStorage = (user) => {
    localStorage.setItem("users", JSON.stringify(user));
  };

  /**
   * ::::::::::::::::::::::::PERFORM ACTION ON USER ADD - DELETE - UPDATE::::::::::::::
   */

  /**
   * Prepares the UI and state for deleting a user by opening the modal,
   * setting the selected user ID for deletion, and updating related flags.
   *
   * @function selectUserToDelete
   * @param { number} userId - The ID of the user selected for deletion.
   * @returns {void}
   */
  const selectUserToDelete = (userId) => {
    document.getElementById("AddOrEditUserModal").showModal();
    setselectUserToDeleteID(userId);
    setDeleteUser(true);
    setInputHasError(false);
    setEditUser(false);
  };

  /**
   * Deletes the selected user from the user list.
   * Updates localStorage, recalculates pagination if needed,
   * shows a success toast, and closes the modal after a delay.
   *
   * @function handleDeletedUser
   * @returns {void}
   */

  const handleDeletedUser = () => {
    setStateLoading((previousState) => ({
      ...previousState,
      deleteUserLoading: true,
    }));
    setTimeout(() => {
      const updatedUsers = user.filter((u) => u.id !== selectUserToDeleteID);
      setUser(updatedUsers);

      setCurrentPage(Math.ceil((user.length + 1) / itemsPerPage));
      setCurrentPage((prevPage) => {
        const newTotalPages = Math.ceil((user.length - 1) / itemsPerPage);
        return prevPage > newTotalPages ? newTotalPages : prevPage;
      });
      storeUserInLocalStorage(updatedUsers);
      setStateLoading((previousState) => ({
        ...previousState,
        deleteUserLoading: false,
      }));
      toast.success("Utilisateur supprimé avec succèss");
      document.getElementById("AddOrEditUserModal").close();
    }, 2000);
  };
  /**
   * Prepares the UI and state for editing a user by pre-filling form inputs,
   * enabling edit mode, and opening the modal.
   *
   * @function selectUserToEdit
   * @param {Object} userToEdit - The user object to be edited.
   * @returns {void}
   */
  const selectUserToEdit = (userToEdit) => {
    setInputs(userToEdit);
    setEditUser(true);
    setDeleteUser(false);
    setInputHasError(false);
    document.getElementById("AddOrEditUserModal").showModal();
  };

  /**
   * Validates the input fields and updates the selected user if no errors are found.
   * Shows validation errors if present, updates the user list and localStorage,
   * and closes the modal after showing a success message.
   *
   * @function handleEditUser
   * @returns {void}
   */

  const handleEditUser = () => {
    const newErrors = {};
    Object.entries(inputs).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${formatFieldName(key)} ne peut être vide.`;
      }
    });
    if (inputs.mail && !isValidEmail(inputs.mail)) {
      newErrors.mail = "Adresse email invalide.";
    }
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((e) => e !== "");
    if (hasErrors) {
      setInputHasError(true);
      setStateLoading((previousState) => ({
        ...previousState,
        editUserLoading: false,
      }));

      return;
    }
    setStateLoading((previousState) => ({
      ...previousState,
      editUserLoading: true,
    }));

    setTimeout(() => {
      const updatedUsers = user.map((u) =>
        u.id === inputs.id ? { ...inputs } : u
      );
      setUser(updatedUsers);
      storeUserInLocalStorage(updatedUsers);
      setStateLoading((previousState) => ({
        ...previousState,
        editUserLoading: false,
      }));
      toast.success("Utilisateur modifié avec succèss");
      document.getElementById("AddOrEditUserModal").close();
    }, 1000);
  };

  /**
   * Opens the modal to add a new user.
   * Clears the form, resets error and mode flags before displaying the modal.
   *
   * @function OpenModalToAddUser
   * @returns {void}
   */
  const OpenModalToAddUser = () => {
    clearFormAfterSubmitting();
    setInputHasError(false);
    setEditUser(false);
    setDeleteUser(false);
    document.getElementById("AddOrEditUserModal").showModal();
  };

  /**
   * Maps internal field names to user-friendly display names in French.
   * Returns the original field name if no mapping is found.
   *
   * @function formatFieldName
   * @param {string} field - The internal field name to format.
   * @returns {string} The user-friendly display name for the field.
   */

  const formatFieldName = (field) => {
    const mapping = {
      lastName: "Nom",
      firstName: "Prénoms",
      userName: "Nom d'utilisateur",
      city: "Ville",
      number: "Numéro",
      mail: "Email",
    };
    return mapping[field] || field;
  };

  /**
   * Validates whether a given string is a valid email address.
   *
   * @function isValidEmail
   * @param {string} email - The email address to validate.
   * @returns {boolean} True if the email is valid, false otherwise.
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Resets the user input form fields to empty strings.
   *
   * @function clearFormAfterSubmitting
   * @returns {void}
   */
  const clearFormAfterSubmitting = () => {
    setInputs({
      lastName: "",
      firstName: "",
      userName: "",
      city: "",
      number: "",
      mail: "",
    });
  };

  /**
   * Validates the user input fields and adds a new user to the list if valid.
   * Shows validation errors if present, updates the user list and localStorage,
   * clears the form, closes the modal, and shows a success toast.
   *
   * @function handleAddUser
   * @returns {void}
   */
  const handleAddUser = () => {
    const newErrors = {};
    Object.entries(inputs).forEach(([key, value]) => {
      if (value.trim() === "") {
        newErrors[key] = `${formatFieldName(key)} ne peut être vide.`;
      }
    });
    if (inputs.mail.trim() !== "" && !isValidEmail(inputs.mail)) {
      newErrors.mail = "Adresse email invalide.";
    }
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      setInputHasError(true);
      setAddUserLoarder(false);
      return;
    }

    setAddUserLoarder(true);
    setTimeout(() => {
      const newUser = { ...inputs, id: Date.now() };
      setUser((prevUsers) => {
        const updatedUsers = [...prevUsers, newUser];
        storeUserInLocalStorage(updatedUsers);
        return updatedUsers;
      });
      setAddUserLoarder(false);
      clearFormAfterSubmitting();
      document.getElementById("AddOrEditUserModal").close();
      toast.success("Utilisateur ajouté avec succès");
    }, 1000);
  };

  /**
   * Closes the modal dialog with the ID "AddOrEditUserModal".
   *
   * @function closeModal
   * @returns {void}
   */

  const closeModal = () => {
    document.getElementById("AddOrEditUserModal").close();
  };

  /**
   * Get users store in the localStorage, once the component is mounted
   */
  useEffect(() => {
    loadUserSinceLocalStorage();
  }, []);

  return (
    <div className="p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold ">Utilisateurs</h1>

        <button
          className="flex gap-1 px-2 py-2 text-white bg-black font-semibold rounded-md"
          onClick={OpenModalToAddUser}
        >
          <SquarePlus strokeWidth={2.25} className="" />
          Ajouter
        </button>
      </div>
      {/* Search field */}
      <div className="mt-5 flex items-center gap-4">
        <div className="form-control w-full max-w-[270px]">
          <label className="label mb-0">
            <span className="label-text text-lg font-bold text-nowrap -mb-1 text-gray-600">
              Rechercher utilisateur
            </span>
          </label>
          <input
            value={searhTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Nb : par nom ou prénoms"
            className="input input-bordered w-full h-5 md:h-10 max-w-sm rounded-md"
          />
        </div>

        {stateLoading.filterIsActive ? (
          <div className="mt-9" onClick={cancelSearch}>
            <button className="flex gap-1 px-2 py-2 text-white font-semibold bg-red-500  rounded-md">
              <RefreshCcw strokeWidth={2.25} />
              Reinitialser
            </button>
          </div>
        ) : null}
        <div className="mt-9" onClick={searhUserByLastNameOrFirstName}>
          <button className="flex gap-1 px-2 py-2 text-white bg-black font-semibold rounded-md">
            <Search strokeWidth={2.25} className="" />
            Rechercher
          </button>
        </div>
      </div>
      {/* Table sections */}
      <section className="bg-white rounded-2xl border border-gray-100   shadow-sm p-4 mt-5">
        <div className="overflow-auto rounded-lg border border-gray-300">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 border-b text-gray-600 font-semibold">
              <tr>
                <th className="px-4 py-3">Date de creation</th>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Prenoms</th>
                <th className="px-4 py-3">Nom utilisateur</th>
                <th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Ville</th>
                <th className="px-4 py-3">Addresse Mail</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {userDataLoading && stateLoading.filterLoading ? (
                <tr>
                  <th colSpan={8}>
                    <div className="my-7 flex items-center justify-center">
                      <CircularProgress color="inherit" />
                    </div>
                  </th>
                </tr>
              ) : null}

              {currentUsers.length > 0 && !userDataLoading
                ? currentUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-4 py-3">
                        {new Date(u.id).toLocaleDateString("fr-FR")} -{" "}
                        {new Date(u.id).toLocaleTimeString("fr-FR")}
                      </td>
                      <td className="px-4 py-3">{u.lastName}</td>
                      <td className="px-4 py-3">{u.firstName}</td>
                      <td className="px-4 py-3">{u.userName}</td>
                      <td className="px-4 py-3">{u.number}</td>
                      <td className="px-4 py-3">{u.city}</td>
                      <td className="px-4 py-3">
                        <span className="items-center px-2 py-0.5 text-xs font-medium">
                          {u.mail}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <img
                          src={editIcon}
                          alt="edit"
                          className="w-7 h-7"
                          onClick={() => selectUserToEdit(u)}
                        />
                        <img
                          src={deleteIcon}
                          alt="delete"
                          className="w-7 h-7"
                          onClick={() => selectUserToDelete(u.id)}
                        />
                      </td>
                    </tr>
                  ))
                : null}

              {!userDataLoading && currentUsers.length === 0 ? (
                <tr>
                  <th colSpan={8}>
                    <div className="my-10">
                      <p className="text-gray-400 font-medium text-lg text-center">
                        Aucune donnée trouvée !!!
                      </p>
                    </div>
                  </th>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
      {/* PAGINATIONS */}
      <div className="flex justify-end mt-7">
        <Pagination
          count={Math.ceil(
            (stateLoading.filterIsActive ? filteredUsers.length : user.length) /
              itemsPerPage
          )}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </div>

      {/* Modal section */}
      <dialog id="AddOrEditUserModal" className="modal rounded-lg">
        <div className="modal-box p-3">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {/* TITLES ACTIONS  */}
          <div className="my-4">
            <h1 className="text-lg font-extrabold leading-3 ">
              {editUser && "Modification d'utilisateur"}

              {!editUser && !deleteUser && "Ajout d'utilisateur"}
            </h1>
            <h1 className="text-lg font-semibold leading-3 ">
              {deleteUser &&
                "Etes vous sur de vouloir supprimer cet utilisateur ?"}
            </h1>
          </div>
          {/* CONTENT */}
          <div className={`${deleteUser ? "h-24" : "h-[380px]"}`}>
            {deleteUser ? (
              <div className="mt-10 mb-7">
                <p className=" font-medium">
                  Cette action est irreversible et supprimera l'utilisateur de
                  la liste automatiquement !
                </p>
              </div>
            ) : null}

            {!deleteUser ? (
              <div className="mt-4">
                {/* FIRSTNAME AND LASTNAME */}
                <div className="flex items-center gap-3">
                  <div className="form-control w-full relative max-w-full">
                    <label className="label mb-0">
                      <span className="label-text font-medium -mb-1 ">Nom</span>
                    </label>
                    <input
                      value={inputs.lastName}
                      onChange={(e) => {
                        setInputs((previousState) => ({
                          ...previousState,
                          lastName: e.target.value,
                        }));
                      }}
                      type="text"
                      placeholder="Ex: Kouadio"
                      className={`input relative input-bordered text-xs w-full h-5 md:h-10 max-w-full rounded-md ${
                        errors.lastName && inputHasError ? "input-error" : ""
                      }`}
                    />

                    {errors.lastName && inputHasError && (
                      <span className="text-red-500 absolute top-20 text-xs -mt-1">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                  <div className="form-control w-full relative max-w-full">
                    <label className="label mb-0">
                      <span className="label-text font-medium -mb-1 ">
                        Prenoms
                      </span>
                    </label>
                    <input
                      value={inputs.firstName}
                      onChange={(e) => {
                        setInputs((previousState) => ({
                          ...previousState,
                          firstName: e.target.value,
                        }));
                      }}
                      type="text"
                      placeholder="Ex: Kouadio Alfred"
                      className={`input relative input-bordered text-xs w-full h-5 md:h-10 max-w-full rounded-md ${
                        errors.firstName && inputHasError ? "input-error" : ""
                      }`}
                    />
                    {errors.firstName && inputHasError && (
                      <span className="text-red-500 absolute top-20 text-xs -mt-1">
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                </div>
                {/* USERNAME */}
                <div className="form-control relative w-full max-w-full my-4">
                  <label className="label mb-0">
                    <span className="label-text font-medium -mb-1 ">
                      Nom utilisateur
                    </span>
                  </label>
                  <input
                    value={inputs.userName}
                    onChange={(e) => {
                      setInputs((previousState) => ({
                        ...previousState,
                        userName: e.target.value,
                      }));
                    }}
                    type="text"
                    placeholder="Ex: Kouadio@"
                    className={`input relative input-bordered text-xs w-full h-5 md:h-10 max-w-full rounded-md ${
                      errors.userName && inputHasError ? "input-error" : ""
                    }`}
                  />

                  {errors.userName && inputHasError && (
                    <span className="text-red-500 absolute top-20 text-xs -mt-1">
                      {errors.userName}
                    </span>
                  )}
                </div>

                {/* CITY */}

                <div className="form-control relative w-full max-w-full mb-4 ">
                  <label className="label mb-0">
                    <span className="label-text font-medium -mb-1 ">
                      Ville de residence
                    </span>
                  </label>
                  <input
                    type="text"
                    value={inputs.city}
                    onChange={(e) => {
                      setInputs((previousState) => ({
                        ...previousState,
                        city: e.target.value,
                      }));
                    }}
                    placeholder="Ex: Abidjan"
                    className={`input relative input-bordered text-xs w-full h-5 md:h-10 max-w-full rounded-md ${
                      errors.city && inputHasError ? "input-error" : ""
                    }`}
                  />

                  {errors.city && inputHasError && (
                    <span className="text-red-500 absolute top-20 text-xs -mt-1">
                      {errors.city}
                    </span>
                  )}
                </div>
                {/* PHONE AND EMAIL */}
                <div className="flex items-center gap-3">
                  <div className="form-control relative w-full max-w-full">
                    <label className="label mb-0">
                      <span className="label-text font-medium -mb-1 ">
                        Numéro
                      </span>
                    </label>
                    <input
                      type="number"
                      value={inputs.number}
                      onChange={(e) => {
                        setInputs((previousState) => ({
                          ...previousState,
                          number: e.target.value,
                        }));
                      }}
                      placeholder="Ex: 05 85 13 22 12"
                      className={`input relative input-bordered text-xs w-full h-5 md:h-10 max-w-full rounded-md ${
                        errors.number && inputHasError ? "input-error" : ""
                      }`}
                    />

                    {errors.number && inputHasError && (
                      <span className="text-red-500 absolute top-20 text-xs -mt-1">
                        {errors.number}
                      </span>
                    )}
                  </div>
                  <div className="form-control relative w-full max-w-full">
                    <label className="label mb-0">
                      <span className="label-text font-medium -mb-1 ">
                        Adrresse mail
                      </span>
                    </label>
                    <input
                      value={inputs.mail}
                      onChange={(e) => {
                        setInputs((previousState) => ({
                          ...previousState,
                          mail: e.target.value,
                        }));
                      }}
                      type="text"
                      placeholder="Ex: kouadio@gmail.com"
                      className={`input relative input-bordered text-xs w-full h-5 md:h-10 max-w-full rounded-md ${
                        errors.mail && inputHasError ? "input-error" : ""
                      }`}
                    />

                    {errors.mail && inputHasError && (
                      <span className="text-red-500 absolute top-20 text-xs -mt-1">
                        {errors.mail}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-4">
            <button
              className={`${
                deleteUser
                  ? "w-full h-10 bg-red-600 rounded-md text-white"
                  : "w-full h-10 bg-orange-600 rounded-md text-white"
              } ${
                stateLoading.deleteUserLoading ||
                stateLoading.editUserLoading ||
                addUserLoarder
                  ? "cursor-not-allowed"
                  : ""
              }`}
              onClick={() => {
                if (editUser) {
                  handleEditUser();
                } else if (deleteUser) {
                  handleDeletedUser();
                } else {
                  handleAddUser();
                }
              }}
              disabled={
                stateLoading.deleteUserLoading ||
                stateLoading.editUserLoading ||
                addUserLoarder
              }
            >
              {!editUser && !deleteUser ? (
                addUserLoarder ? (
                  <span className="flex items-center justify-center">
                    <>
                      <ButtonLoader />
                    </>
                  </span>
                ) : (
                  "Ajouter"
                )
              ) : null}

              {editUser ? (
                stateLoading.editUserLoading ? (
                  <span className="flex items-center justify-center">
                    <>
                      <ButtonLoader />
                    </>
                  </span>
                ) : (
                  "modifier"
                )
              ) : null}

              {deleteUser ? (
                stateLoading.deleteUserLoading ? (
                  <span className="flex items-center justify-center">
                    <>
                      <ButtonLoader />
                    </>
                  </span>
                ) : (
                  "Supprimer"
                )
              ) : null}
            </button>

            <button
              className={`${
                stateLoading.deleteUserLoading ||
                stateLoading.editUserLoading ||
                addUserLoarder
                  ? "cursor-not-allowed w-full h-10 bg-gray-200 rounded-md text-black"
                  : "w-full h-10 bg-gray-200 rounded-md text-black"
              }`}
              onClick={closeModal}
              disabled={
                stateLoading.deleteUserLoading ||
                stateLoading.editUserLoading ||
                addUserLoarder
              }
            >
              Annuler
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
