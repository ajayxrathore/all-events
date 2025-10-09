import { useRef } from "react";
import { useEventStore } from "../store/useEventStore";
import { Link } from "react-router-dom";
import { useState } from "react";
function EventMedia() {
  const { setEventField, addMedia } = useEventStore();
  const bannerInputRef = useRef(null);
  const mediaInputRef = useRef(null);
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET_NAME;
  const [bannerPreview, setBannerPreview] = useState(null);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setBannerPreview(previewURL);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setEventField("banner", data.secure_url);
      }
    } catch (err) {
      console.error("Error uploading banner:", err);
    }
  };

  const handleMediaUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const previews = files.map((file) => URL.createObjectURL(file));
    setMediaPreviews((prev) => [...prev, ...previews]);
    const uploadedURLs = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          uploadedURLs.push(data.secure_url);
        }
      } catch (err) {
        console.error("Error uploading media file:", err);
      }
    }

    uploadedURLs.forEach((url) => addMedia(url));
  };

  return (
    <>
      <div className="media-page-container">
        <div className="upload-section">
          <h2 className="section-title">Upload event banner</h2>
          <p className="section-description">
            This banner will appear everywhere.
          </p>
          <div className="drop-zone">
            <button
              className="upload-button"
              onClick={() => bannerInputRef.current.click()}
            >
              Add Banner
              <input
                type="file"
                accept="image/*"
                ref={bannerInputRef}
                onChange={handleBannerUpload}
                style={{ display: "none" }}
              />
            </button>
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  borderRadius: "10px",
                  marginTop: "10px",
                  objectFit: "cover",
                }}
              />
            )}
            <p className="drop-zone-info">
              Max image size 20MB. Recommended dimension: 1200x600px (2:1)
            </p>
          </div>
        </div>

        <div className="upload-section">
          <h2 className="section-title">Add a promotional video</h2>
          <p className="section-description">
            Share a YouTube link to showcase your event in action.
          </p>
          <input
            type="text"
            className="video-input"
            placeholder="ex. https://youtube.com/yourvideo"
            onChange={(e) => setEventField("youtubeVideoLink", e.target.value)}
          />
        </div>

        <div className="upload-section">
          <h2 className="section-title">Upload media</h2>
          <p className="section-description">
            This media will appear under gallery section.
          </p>
          <div className="drop-zone large-drop-zone">
            <button
              className="upload-button"
              onClick={() => mediaInputRef.current.click()}
            >
              Upload media
            </button>
            <input
              type="file"
              accept="image/*"
              ref={mediaInputRef}
              onChange={handleMediaUpload}
              multiple
              style={{ display: "none" }}
            />
            <div
              className="media-preview-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, 150px)",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              {mediaPreviews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Preview ${i}`}
                  style={{
                    width: "150px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </div>
            <p className="drop-zone-info">
              You can upload maximum 10 images.
              <br />
              Max size should be 20MB per media.
            </p>
          </div>
        </div>

        <div className="navigation-container">
          <Link to="/event/tickets">
            <button className="next-button">Next</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default EventMedia;
