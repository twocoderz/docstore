import React from "react";
import ResourceExplorer from "./ResourceExplorer";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm hover:shadow-md transition duration-300">
      <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{course.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{course.description}</p>
      <ResourceExplorer resources={course.resources} />
    </div>
  );
};

export default CourseCard;
