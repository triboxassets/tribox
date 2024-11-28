import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './WorkCard.css';
import dummyhomecollection from '../../dummyhomecollection.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface WorkCardProps {
  productId: string;
  buttonText: string;
}

interface Metafield {
  key: string;
  value: string;
}

const WorkCard: React.FC<WorkCardProps> = ({ productId, buttonText }) => {
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const modelContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const product = dummyhomecollection.find((item: any) => item.id === productId);
    if (product) {
      setProductData(product);
    } else {
      setError('Product not found.');
    }
    setLoading(false);
  }, [productId]);

  useEffect(() => {
    if (productData && productData.productType === '3D Models') {
      generateImages(productData.featuredImage.src);
    }
  }, [productData]);

  const generateImages = (modelUrl: string) => {
    if (!modelContainerRef.current) return;

    // Set up 3D scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(300, 300);

    // Append renderer to an offscreen canvas
    const canvas = document.createElement('canvas');
    renderer.setSize(300, 300, false);

    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Load the model
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        scene.add(model);

        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Create images from different angles
        const snapshots: string[] = [];
        const totalAngles = 36; // Number of angles to capture
        const radius = 5;

        for (let i = 0; i < totalAngles; i++) {
          const angle = (i / totalAngles) * Math.PI * 2;
          camera.position.set(
            Math.cos(angle) * radius,
            2,
            Math.sin(angle) * radius
          );
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);

          // Convert the current frame to a data URL
          const dataUrl = renderer.domElement.toDataURL();
          snapshots.push(dataUrl);
        }

        setImages(snapshots);
      },
      undefined,
      (err) => {
        console.error('Error loading model:', err);
      }
    );
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!modelContainerRef.current || images.length === 0) return;

    const rect = modelContainerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left; // Mouse X relative to the container
    const percentage = mouseX / rect.width; // Normalize to 0-1
    const index = Math.floor(percentage * images.length); // Map to image index
    setCurrentImageIndex(Math.min(images.length - 1, Math.max(0, index))); // Clamp index
  };

  const rating = productData?.metafields?.find((mf: Metafield) => mf.key === 'rating')?.value || 'N/A';
  const uploadDate = productData?.metafields?.find((mf: Metafield) => mf.key === 'upload_date')?.value || 'N/A';
  const fileFormat = productData?.metafields?.find((mf: Metafield) => mf.key === 'file_format')?.value || 'N/A';
  const author = productData?.metafields?.find((mf: Metafield) => mf.key === 'author')?.value || 'Unknown';
  const productType = productData?.productType || 'Default';

  const getAccentColor = (type: string): string => {
    switch (type) {
      case '3D Models':
        return '#ED254E';
      case 'Mockups':
        return '#FFBE0B';
      default:
        return '#61E294';
    }
  };

  const accentColor = getAccentColor(productType);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className="work-card"
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      {productType === '3D Models' ? (
        <div
          ref={modelContainerRef}
          className="work-card-image 3d-model-container"
          style={{ width: '100%', height: '300px', backgroundColor: '#f0f0f0', overflow: 'hidden' }}
          onMouseMove={handleMouseMove}
        >
          {images.length > 0 && (
            <img
              src={images[currentImageIndex]}
              alt="3D Model Preview"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          )}
        </div>
      ) : (
        <img
          className="work-card-image"
          src={productData?.featuredImage?.src}
          alt={productData?.featuredImage?.altText}
        />
      )}

      <div className="rating-badge">
        <FontAwesomeIcon icon={faStar} className="star-icon" /> {rating}
      </div>

      <h3 className="work-card-title">{productData?.title}</h3>

      <div className="work-card-meta">
        <p>
          <strong>Upload Date </strong> <span>{uploadDate}</span>
        </p>
        <p>
          <strong>File Format </strong> <span>{fileFormat}</span>
        </p>
        <p>
          <strong>Author </strong> <span>{author}</span>
        </p>
      </div>

      <p
        className="work-card-description"
        dangerouslySetInnerHTML={{ __html: productData?.descriptionHtml }}
      />

      <button className="work-card-button">{buttonText}</button>
    </div>
  );
};

export default WorkCard;
