import React from "react";
import { FaDownload } from "react-icons/fa";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2">
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="text-gray-600">{course.description}</p>
      <a
        href={course.pdf}
        download
        className="mt-2 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
      >
        <FaDownload className="mr-2" />
        Télécharger PDF
      </a>
    </div>
  );
};

export default CourseCard;
