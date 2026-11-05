// File name, size tips and the "Change image" button for one image.
//   imageUrl    - the current image, for example "/uploads/slide-123.jpg"
//   hint        - a short tip about the best image size
//   isUploading - true while this image is being uploaded
//   onPick      - called when the admin chooses a file
const AdminImageMeta = ({ imageUrl, hint, isUploading, onPick }) => {
  return (
    <div className="adm-image-meta">
      <p className="adm-file">{imageUrl?.split("/").pop()}</p>
      <p className="adm-hint">{hint}</p>
      <label className="adm-upload">
        <input type="file" accept="image/jpeg,image/png,image/webp" disabled={isUploading} onChange={onPick} />
        <span>{isUploading ? "Uploading..." : "Change image"}</span>
      </label>
      <p className="adm-hint">Max file size: 5 MB</p>
    </div>
  );
};

export default AdminImageMeta;
