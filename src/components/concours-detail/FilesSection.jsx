import FileCard from "./FileCard";

const FilesSection = ({ title, icon: Icon, files, onPreview, onDownload, className = "" }) => {
  if (!files || files.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex items-center space-x-3 mb-4">
        {Icon && <Icon className="w-6 h-6 text-red-600" />}
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file, idx) => (
          <FileCard key={idx} file={file} onPreview={onPreview} onDownload={onDownload} />
        ))}
      </div>
    </div>
  );
};

export default FilesSection;
