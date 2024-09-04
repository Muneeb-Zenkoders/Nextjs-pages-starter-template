// pages/product/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  stock: number;
}

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://dummyjson.com/products/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={400}
        height={200}
        className="my-4"
      />
      <p className="text-gray-600">{product.description}</p>
      <p className="mt-2 font-semibold">Stock: {product.stock}</p>
    </div>
  );
};

export default ProductDetail;