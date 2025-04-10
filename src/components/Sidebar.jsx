import React, { useState } from "react";
import { FaBars, FaTimes, FaGraduationCap } from "react-icons/fa";
import SearchBar from "./SearchBar";

const Sidebar = ({ parcoursList, onParcoursSelect, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleParcoursClick = (parcoursName) => {
    onParcoursSelect(parcoursName);
    setIsOpen(false);
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-[#333333] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:static md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#4A90E2]">
          <h1 className="text-2xl font-semibold">EPL Bibliothèque</h1>
          <button onClick={toggleSidebar} className="md:hidden">
            <FaTimes className="text-2xl text-[#4A90E2] hover:text-[#357ABD]" />
          </button>
        </div>
        <div className="p-4">
          <SearchBar onSearch={onSearch} />
        </div>
        <nav className="mt-4">
          <ul className="space-y-2 px-4">
            <li>
              <button
                onClick={() => handleParcoursClick(null)}
                className="w-full flex items-center py-3 px-4 rounded-md hover:bg-[#4A90E2] transition duration-200 text-base font-medium"
              >
                <FaGraduationCap className="mr-3 text-[#4A90E2] hover:text-white" />
                Toutes les écoles
              </button>
            </li>
            {parcoursList.map((parcours) => (
              <li key={parcours.name}>
                <button
                  onClick={() => handleParcoursClick(parcours.name)}
                  className="w-full flex items-center py-3 px-4 rounded-md hover:bg-[#4A90E2] transition duration-200 text-base font-medium"
                >
                  <FaGraduationCap className="mr-3 text-[#4A90E2] hover:text-white" />
                  {parcours.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 bg-[#333333] text-[#4A90E2] p-2 rounded-md hover:bg-[#4A90E2] hover:text-white transition duration-200"
        >
          <FaBars className="text-2xl" />
        </button>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;