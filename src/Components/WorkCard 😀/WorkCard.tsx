import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './WorkCard.css';
import dummyhomecollection from '../../dummyhomecollection.json';

interface WorkCardProps {
  productId: string;
  buttonText: string;
}

interface Metafield {
  key: string;
  value: string;
}

const WorkCard: React.FC<WorkCardProps> = ({ productId, buttonText }) => {
  const navigate = useNavigate();
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

  const handleCardClick = () => {
    navigate(`/product-listing/${productId}`);
  };

  useEffect(() => {
    if (productData && productData.productType === '3D Models') {
      generateImages(productData.featuredImage.src);
    }
  }, [productData]);

  const generateImages = (modelUrl: string) => {
    if (!modelContainerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const containerWidth = 300;
    const containerHeight = 200;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerWidth, containerHeight);

    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'lightgrey');
      gradient.addColorStop(1, 'white');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    const gradientTexture = new THREE.CanvasTexture(canvas);
    scene.background = gradientTexture;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        model.position.sub(center);

        const aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
        const maxDim = Math.max(size.x, size.y, size.z);
        const distance = maxDim / (2 * Math.tan((Math.PI / 180) * camera.fov / 2));
        const fitOffset = 1.5;
        const adjustedDistance = distance * fitOffset;

        camera.position.set(0, size.y * 0.5, adjustedDistance);
        camera.lookAt(0, 0, 0);

        const snapshots: string[] = [];
        const totalAngles = 36;

        for (let i = 0; i < totalAngles; i++) {
          const angle = (i / totalAngles) * Math.PI * 2;
          camera.position.set(
            Math.cos(angle) * adjustedDistance,
            size.y * 0.5,
            Math.sin(angle) * adjustedDistance
          );
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);

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
    const mouseX = e.clientX - rect.left;
    const percentage = mouseX / rect.width;
    const index = Math.floor(percentage * images.length);
    setCurrentImageIndex(Math.min(images.length - 1, Math.max(0, index)));
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
      onClick={handleCardClick}
    >
      <div className="work-card-image-container">
        {productType === '3D Models' ? (
          <div
            ref={modelContainerRef}
            className="work-card-image"
            onMouseMove={handleMouseMove}
          >
            {images.length > 0 && (
              <img
                src={images[currentImageIndex]}
                alt="3D Model Preview"
                className="preview-image"
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
      </div>

      <div className="card-rating-badge">
        <FontAwesomeIcon icon={faStar} className="card-star-icon" /> {rating}
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
