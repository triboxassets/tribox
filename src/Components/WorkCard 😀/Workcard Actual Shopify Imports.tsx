// For Ahsan and Abdullah, this is the code which actually imports information from the
// Shopify API, the WordCard.css is importing dummy data from a json file.


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WorkCard.css';

interface WorkCardProps {
  productId: string; // Product ID passed as a prop
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

  const api = axios.create({
    baseURL: 'https://your-shop-name.myshopify.com/api/2023-10/graphql.json', // Replace with your store's domain and API version
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': 'your-storefront-access-token', // Your Storefront Access Token
    },
  });

  const PRODUCTS_QUERY = `
    query {
      product(id: "gid://shopify/Product/${productId}") {
        id
        title
        descriptionHtml
        createdAt
        tags
        featuredImage {
          src
          altText
        }
        metafields(namespace: "custom_info", keys: ["rating", "upload_date", "file_format", "author"]) {
          key
          value
        }
      }
    }
  `;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await api.post('', { query: PRODUCTS_QUERY });
        const product = response.data.data.product;

        if (product) {
          setProductData(product);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError('Error fetching product data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Extract metafields
  const rating = productData?.metafields?.find((mf: Metafield) => mf.key === 'rating')?.value || 'N/A';
  const uploadDate = productData?.metafields?.find((mf: Metafield) => mf.key === 'upload_date')?.value || 'N/A';
  const fileFormat = productData?.metafields?.find((mf: Metafield) => mf.key === 'file_format')?.value || 'N/A';
  const author = productData?.metafields?.find((mf: Metafield) => mf.key === 'author')?.value || 'Unknown';

  return (
    <div className="work-card">
      <img className="work-card-image" src={productData?.featuredImage?.src} alt={productData?.featuredImage?.altText} />
      <h3 className="work-card-title">{productData?.title}</h3>
      <p className="work-card-description" dangerouslySetInnerHTML={{ __html: productData?.descriptionHtml }} />
      
      <div className="work-card-meta">
        <p><strong>Rating:</strong> {rating}</p>
        <p><strong>Upload Date:</strong> {uploadDate}</p>
        <p><strong>File Format:</strong> {fileFormat}</p>
        <p><strong>Author:</strong> {author}</p>
        <p><strong>Tags:</strong> {productData?.tags.join(', ')}</p>
      </div>

      <button className="work-card-button">{buttonText}</button>
    </div>
  );
};

export default WorkCard;
