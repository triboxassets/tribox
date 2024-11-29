import React from 'react';
import './Previewwindow.css';

interface PreviewWindowProps {
  imageUrl: string;
}

const PreviewWindow: React.FC<PreviewWindowProps> = ({ imageUrl }) => {
  return (
    <div className="preview-window">
      {imageUrl ? (
        <img src={imageUrl} alt="Preview" className="preview-image" />
      ) : (
        <div className="preview-placeholder">Select an image to preview it here</div>
      )}
    </div>
  );
};

export default PreviewWindow;
