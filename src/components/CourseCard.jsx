import React from "react";
import ResourceExplorer from "./ResourceExplorer";

const CourseCard = ({ course }) => {
  // Transformation des ressources pour inclure une structure imbriquée
  const resources = {
    name: "Ressources",
    type: "folder",
    contents: course.resources.map((resource) => ({
      name: resource.type,
      type: "file",
      fileId: resource.fileId, // ID du fichier dans le bucket Appwrite
      mimeType: resource.mimeType, // Type MIME du fichier
    })),
  };

  return (
    <div className="card-smooth-hover bg-white p-6 rounded-md shadow-sm cursor-pointer group">
      <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2 group-hover:text-blue-600 transition-colors duration-300">{course.title}</h3>
      <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">{course.description}</p>
      <ResourceExplorer resources={resources} />
    </div>
  );
};

export default CourseCard;