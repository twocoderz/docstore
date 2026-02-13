import { FaChevronDown, FaChevronUp, FaGraduationCap } from "react-icons/fa";
import UeResources from "./UeResources";

const UeCard = ({ ue, expanded, onToggle, onPreview, onDownload }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
              <FaGraduationCap className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2">
              {ue.nom}
            </h3>
          </div>

          <p className="text-gray-600 leading-relaxed line-clamp-2 text-sm md:text-base">
            {ue.description}
          </p>

          {ue.anneeEnseignement && ue.anneeEnseignement.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(ue.anneeEnseignement) ? ue.anneeEnseignement : [ue.anneeEnseignement]).map(
                (annee, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {annee}
                  </span>
                )
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => onToggle(ue.$id)}
          className="ml-4 p-2 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          {expanded ? <FaChevronUp className="w-5 h-5" /> : <FaChevronDown className="w-5 h-5" />}
        </button>
      </div>
    </div>

    {expanded && (
      <UeResources files={ue.files} onPreview={onPreview} onDownload={onDownload} />
    )}
  </div>
);

export default UeCard;
