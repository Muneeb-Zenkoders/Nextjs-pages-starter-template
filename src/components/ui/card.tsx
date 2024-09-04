// import Image from "next/image";
// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   thumbnail: string;
// }
// interface CardProps {
//   product: Product;
// }
// export default function Card({ product }: CardProps) {
//   return (
//     <div className="w-[300px] rounded-md border">
//       <Image
//         width={200}
//         height={100}
//         src={product.thumbnail}
//         alt={product.title}
//         className="h-[200px] w-full rounded-md object-cover"
//       />
//       <div className="p-4">
//         <h1 className="text-lg font-semibold">{product.title}</h1>
//         <p className="mt-3 text-sm text-gray-600">{product.description}</p>
//         <button
//           type="button"
//           className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//         >
//           Read
//         </button>
//       </div>
//     </div>
//   );
// }
import Image from "next/image";
import { useRouter } from "next/router";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

interface CardProps {
  product: Product;
  onClick: () => void;
}

export default function Card({ product, onClick }: CardProps) {
  return (
    <div className="w-[300px] rounded-md border cursor-pointer" onClick={onClick}>
      <Image
        width={200}
        height={100}
        src={product.thumbnail}
        alt={product.title}
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">{product.title}</h1>
        <p className="mt-3 text-sm text-gray-600">{product.description}</p>
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Read
        </button>
      </div>
    </div>
  );
}

