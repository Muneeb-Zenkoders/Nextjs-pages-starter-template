// import Dashboard from "@/views/Authentication/Dashboard";
// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   thumbnail: string;
// }
// interface Props{
//   products:Product[]
// }
// export default function card({products}:Props) {
//   return (
//     <>
//       <Dashboard products={products}/>
//     </>
//   );
// }
// export const getServerSideProps = async () => {
//   // Fetch data from external API
//   const res = await fetch("https://dummyjson.com/products").then((data) =>
//     data.json()
//   );

//   // Pass data to the page via props
//   return { props: { ...res } };
// };
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

const Dashboard = ({ products }: Props) => {
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
      <div className="relative min-h-screen pt-16 p-4">
        {productId && selectedProduct ? (
          <div
            className="flex flex-col items-center p-4
          max-w-4xl mx-auto"
          >
            <button
              onClick={() => router.push("/dashboard")}
              className="absolute top-16 left-4 px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition"
            >
              Back to Dashboard
            </button>
            <div className="flex flex-col md:flex-row items-center mt-16">
              <Image
                src={selectedProduct.thumbnail}
                alt={selectedProduct.title}
                width={400}
                height={200}
                className="w-full md:w-1/3"
              />
              <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left">
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
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  onClick={() => handleCardClick(product.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Example usage if you are fetching products in the same component
export async function getServerSideProps() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  return {
    props: {
      products: data.products.slice(0, 12), // Example to limit to 12 products
    },
  };
}

export default Dashboard;
