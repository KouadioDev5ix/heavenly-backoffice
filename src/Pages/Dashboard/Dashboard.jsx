import React, { useEffect } from "react";

import { Search } from "lucide-react";
import IncomeCharts from "../../Components/BarChart";
import IncomeDoughnutChart from "../../Components/IncomeDoughnutChart";

// import { Bar } from "react-chartjs-2";
// import "chart.js/auto";

export default function Dashboard() {
  return (
    <div className="">
      <div className="headear w-full fixed top-0 z-20 drop-shadow-md bg-gray-50 mr-3 ">
        <div className=" w-10/12 max-w-7xl h-20 flex items-center justify-between">
          <div className="ml-5">
            <h1 className="text-2xl font-extrabold">Tableau de board</h1>
          </div>

          {/* SECTIONS SEARCH */}
          <div className="flex items-center gap-2 mr-12">
            <div>
              {/* <div>
              <label htmlFor="categories" className="font-bold">
                Périodes
              </label>
            </div> */}

              {/* <div>
              <select className="select select-bordered select-sm w-full max-w-xs">
                <option disabled selected>
                  Selectionner category
                </option>
                <option value="">Toutes</option>
                <option value="Heure">Heure</option>
                <option value="Jours">Jours</option>
                <option value="Mois">Mois</option>
              </select>
            </div> */}
            </div>
            <div>
              <div>
                <label htmlFor="categories" className="font-bold">
                  Mois
                </label>
              </div>
              <div>
                <select className="select select-bordered select-sm w-full max-w-xs">
                  <option disabled selected>
                    Selectionner un mois
                  </option>
                  <option value="">Toutes</option>
                  <option value="Janvier">Janvier</option>
                  <option value="Février">Février</option>
                  <option value="Mars">Mars</option>
                  <option value="Avril">Avril</option>
                  <option value="Mai">Mai</option>
                  <option value="Juin">Juin</option>
                  <option value="Juillet">Juillet</option>
                  <option value="Août">Août</option>
                  <option value="Septembre">Septembre</option>
                  <option value="Octobre">Octobre</option>
                  <option value="Novembre">Novembre</option>
                  <option value="Décembre">Décembre</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="subCategories" className="font-bold">
                  Années
                </label>
              </div>

              <div>
                <select className="select select-bordered select-sm w-full max-w-xs">
                  <option disabled selected>
                    Selectionner une année
                  </option>
                  <option value="">Toutes</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button className="flex gap-1 px-1 py-1 text-white bg-black font-semibold rounded-md">
                <Search strokeWidth={2.25} className="w-5 h-5" />
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="containerr pt-28 pl-5 pr-2 ">
        {/* BOXES SECTIONS */}

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 w-full">
            {/* <!-- Articles vendus aujourd'hui --> */}
            <div className="bg-gray-50 rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-extrabold text-gray-600 mb-2">
                    45
                  </div>
                  <div className="text-sm font-medium text-slate-500 leading-relaxed">
                    Articles vendus
                  </div>
                </div>

                <div className="bg-black rounded-full p-3 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-shopping-bag-icon lucide-shopping-bag"
                  >
                    <path d="M16 10a4 4 0 0 1-8 0" />
                    <path d="M3.103 6.034h17.794" />
                    <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
                  </svg>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium">Aujourd 'hui</span>
                </div>
              </div>
            </div>

            {/* <!-- Montant total d'artiles vendus --> */}
            <div className="bg-gray-50 rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-extrabold text-gray-600 mb-2">
                    500 000 Frcs{" "}
                  </div>
                  <div className="text-sm font-medium text-slate-500 leading-relaxed">
                    Montant total d'artiles vendus
                  </div>
                </div>
                <div className="bg-blue-600 rounded-full p-3 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-hand-coins-icon lucide-hand-coins"
                  >
                    <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
                    <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                    <path d="m2 16 6 6" />
                    <circle cx="16" cy="9" r="2.9" />
                    <circle cx="6" cy="5" r="3" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium">Aujourd d'hui</span>
                </div>
              </div>
            </div>

            {/* <!-- Bénéfice --> */}
            <div className="bg-gray-50 rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-extrabold text-gray-700 mb-2">
                    {" "}
                    200 000 Frcs
                  </div>
                  <div className="text-sm font-medium text-slate-600 leading-relaxed">
                    Bénéfice
                  </div>
                </div>
                <div className="bg-green-500 rounded-full p-3 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
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
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium">Aujoud'hui</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GRAPHIQUE SECTIONS */}

        <div className="flex flex-col md:flex-row gap-5">
          {/* GRAPHE À BARRES */}
          <div className="w-[540px]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#A1A1A1] my-4">
                Statistiques
              </h2>
            </div>
            <div className="bg-white rounded-md shadow border border-gray-200 p-4 w-full">
              <h3 className="text-lg font-bold mb-4">Revenus générés (FCFA)</h3>
              <IncomeCharts />
            </div>
          </div>

          {/* GRAPHE DOUGHNUT */}
          <div className="w-[540px]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#A1A1A1] my-4">
                Analyse
              </h2>
            </div>
            <div className="bg-white rounded-md shadow border border-gray-200 p-4 w-full mx-auto">
              <h3 className="text-lg font-bold mb-4">
                Répartition des revenus par section
              </h3>
              <IncomeDoughnutChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
