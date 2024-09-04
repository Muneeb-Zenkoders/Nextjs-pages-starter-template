// import Nav from "@/components/ui/nav";
// import Card from "@/components/ui/card";

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   thumbnail: string;
// }

// interface Props {
//   products: Product[];
// }

// export default function Dashboard({ products }: Props) {
//   // const [products, setProducts] = useState<Product[]>([]);

//   // useEffect(() => {
//   //   fetch("http://dummyjson.com/products")
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       // Limiting the results to the first 12 products
//   //       setProducts(data.products.slice(0, 12));
//   //     });
//   // }, []);

//   return (
//     <>
//       <Nav />
//       <div className="flex justify-center items-center min-h-screen p-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {products.map((product) => (
//             <Card key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "@/components/ui/nav";
import Card from "@/components/ui/card";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  stock: number;
}

interface Props {
  products: Product[];
}

export default function Dashboard({ products }: Props) {
  const router = useRouter();
  const { productId } = router.query;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      fetch(`http://dummyjson.com/products/${productId}`)
        .then((response) => response.json())
        .then((data) => setSelectedProduct(data))
        .catch((error) => console.error(error));
    }
  }, [productId]);

  const handleCardClick = (id: number) => {
    router.push(`/dashboard?productId=${id}`);
  };

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center min-h-screen p-4">
        {productId && selectedProduct ? (
          <div className="p-4 max-w-4xl mx-auto">
            <button
              onClick={() => router.push("/dashboard")}
              className="mb-4 text-blue-500 underline"
            >
              Back to Dashboard
            </button>
            <div className="flex flex-col md:flex-row">
              <Image
                src={selectedProduct.thumbnail}
                alt={selectedProduct.title}
                width={400}
                height={200}
                className="w-full md:w-1/3"
              />
              <div className="md:ml-4">
                <h1 className="text-2xl font-bold">{selectedProduct.title}</h1>
                <p className="text-gray-600 mt-2">
                  {selectedProduct.description}
                </p>
                <p className="mt-2 font-semibold">
                  Stock: {selectedProduct.stock}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card
                key={product.id}
                product={product}
                onClick={() => handleCardClick(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
