import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
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
  const modelContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate fetching data from JSON file
    const product = dummyhomecollection.find((item: any) => item.id === productId);
    
    if (product) {
      setProductData(product);
    } else {
      setError('Product not found.');
    }
    setLoading(false); // End loading state
  }, [productId]);

  useEffect(() => {
    if (productData && productData.productType === '3D Models' && modelContainerRef.current) {
      render3DModel(productData.featuredImage.src);
    }
  }, [productData]);

  const render3DModel = (modelUrl: string) => {
    if (!modelContainerRef.current) return;
  
    // Clear any existing content
    modelContainerRef.current.innerHTML = '';
  
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(300, 300);
    
    // Set a red gradient background
    const texture = new THREE.Texture();
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 2;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createLinearGradient(0, 0, 0, 2);
      gradient.addColorStop(0, 'grey');
      gradient.addColorStop(1, '#ffffff');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 2, 2);
      texture.image = canvas;
      texture.needsUpdate = true;
    }
    scene.background = texture;
  
    modelContainerRef.current.appendChild(renderer.domElement);
  
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
  
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
  
    // Determine loader based on file extension
    const fileExtension = modelUrl.split('.').pop()?.toLowerCase();
    let loader: GLTFLoader | OBJLoader;
  
    switch (fileExtension) {
      case 'gltf':
      case 'glb':
        loader = new GLTFLoader();
        break;
      case 'obj':
        loader = new OBJLoader();
        break;
      default:
        console.error('Unsupported 3D model format');
        return;
    }
  
    // Log the model URL to ensure it's correct
    console.log('Loading model from URL:', modelUrl);
  
    // Load the model
    loader.load(
      modelUrl,
      (loadedModel) => {
        // Adjust model scale and position
        const model = fileExtension === 'gltf' ? loadedModel.scene : loadedModel;
        model.scale.set(1, 1, 1);
        scene.add(model);
  
        // Compute the bounding box of the model
        const boundingBox = new THREE.Box3().setFromObject(model);
        const size = boundingBox.getSize(new THREE.Vector3());
  
        // Adjust the camera position based on model size
        const maxSize = Math.max(size.x, size.y, size.z);
        const cameraDistance = maxSize * 1; // Zoom out by a factor of 2.5
        camera.position.z = cameraDistance;
  
        // Center the model in the scene
        const center = boundingBox.getCenter(new THREE.Vector3());
        model.position.sub(center); // Shift the model to the center
  
        // Position the camera to ensure the model fits within the view
        controls.maxDistance = cameraDistance * 3; // Allow zooming out more
        controls.update();
  
        // Render loop
        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
      },
      (error) => {
        console.error('Error loading 3D model:', error);
      }
    );
  };
  // Extract metafields
  const rating = productData?.metafields?.find((mf: Metafield) => mf.key === 'rating')?.value || 'N/A';
  const uploadDate = productData?.metafields?.find((mf: Metafield) => mf.key === 'upload_date')?.value || 'N/A';
  const fileFormat = productData?.metafields?.find((mf: Metafield) => mf.key === 'file_format')?.value || 'N/A';
  const author = productData?.metafields?.find((mf: Metafield) => mf.key === 'author')?.value || 'Unknown';
  const productType = productData?.productType || 'Default';

  // Function to map productType to accent color
  const getAccentColor = (type: string): string => {
    switch (type) {
      case '3D Models':
        return '#ED254E';
      case 'Mockups':
        return '#FFBE0B';
      case 'Templates':
        return '#A0ECD0';
      case 'Audio Samples':
        return '#6610F2';
      case 'Photos':
        return '#E5C1BD';
      case 'Presentation Templates':
        return '#9ED0E6';
      case 'Fonts':
        return '#61E294';
      default:
        return '#61E294'; // Default color
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
          style={{ width: '100%', height: '300px' }}
        />
      ) : (
        <img 
          className="work-card-image" 
          src={productData?.featuredImage?.src} 
          alt={productData?.featuredImage?.altText} 
        />
      )}

      {/* Display star icon and rating */}
      <div className="rating-badge">
        <FontAwesomeIcon icon={faStar} className="star-icon" /> {rating}
      </div>

      <h3 className="work-card-title">{productData?.title}</h3>

      <div className="work-card-meta">
        <p><strong>Upload Date </strong> <span>{uploadDate}</span></p>
        <p><strong>File Format </strong> <span>{fileFormat}</span></p>
        <p><strong>Author </strong> <span>{author}</span></p>
        <p className="work-card-tags">
          {productData?.tags?.map((tag: string, index: number) => (
            <span 
              key={index} 
              className="work-card-tag"
            >
              {tag}
            </span>
          ))} 
        </p>
      </div>

      <p 
        className="work-card-description" 
        dangerouslySetInnerHTML={{ __html: productData?.descriptionHtml }} 
      />

      <button 
        className="work-card-button"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default WorkCard;
