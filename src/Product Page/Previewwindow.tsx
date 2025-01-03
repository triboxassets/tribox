import React, { useState, useRef } from 'react';
import './Previewwindow.css';
import BackArrow from '../Assets/back_arrow.svg';

interface PreviewWindowProps {
  featuredImage: string;
  allImages: string[];
  signatureSvg: string;
}

const PreviewWindow: React.FC<PreviewWindowProps> = ({ featuredImage, allImages, signatureSvg }) => {
  const [selectedImage, setSelectedImage] = useState<string>(featuredImage);
  const imageListRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (imageListRef.current) {
      imageListRef.current.scrollBy({ left: -120, behavior: 'smooth' });
    }
    const currentIndex = allImages.indexOf(selectedImage);
    const previousIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setSelectedImage(allImages[previousIndex]);
  };

  const scrollRight = () => {
    if (imageListRef.current) {
      imageListRef.current.scrollBy({ left: 120, behavior: 'smooth' });
    }
    const currentIndex = allImages.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % allImages.length;
    setSelectedImage(allImages[nextIndex]);
  };

  return (
    <div className="preview-window-container">
      <div className="preview-window" style={{ backgroundImage: `url(${selectedImage})` }}>
        {selectedImage ? (
          <img src={selectedImage} alt="Preview" className="preview-image" />
        ) : (
          <div className="preview-placeholder">Select an image to preview it here</div>
        )}
        <img src={BackArrow} alt="Scroll Left" className="scroll-arrow left" onClick={scrollLeft} />
        <img src={BackArrow} alt="Scroll Right" className="scroll-arrow right" onClick={scrollRight} />
      </div>
      <div className="image-list" ref={imageListRef}>
        {allImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Preview ${index + 1}`}
            className="thumbnail"
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      <img src={signatureSvg} alt="Signature" className="signature-image" />
    </div>
  );
};

export default PreviewWindow;