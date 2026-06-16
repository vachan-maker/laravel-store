
import { Layout } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
type Product = {
    id: number;
    title:string,
    price:number,
    image:string

};
export default function Hello() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(()=>{
        const fetchProducts = async () => {
            try {
                const response = (await fetch('https://fakestoreapi.com/products'))
                const data = await response.json();
                setProducts(data);
                if(!response.ok) {
                    throw new Error("Failed to fetch Products");
                }
            }

            catch(err) {
                console.log(err);
            }
        }
        fetchProducts();
    },[])
    return (
        <>
        <div className="p-10 text-center">
        <h1 className="text-4xl">Store</h1>
        <div className="grid grid-cols-4 gap-4 p-10">
        {products?.map((product) =>(
            <a href={`/store/${product.id}`}>
            <div key={product.id} className="flex flex-col bg-gray-500 p-4 rounded-xl justify-center items-center hover:scale-90 cursor-pointer ease-in-out transition hover:border border-amber-200">
                <img src={product.image} className="w-max h-35"/>
                <p>{product.title}</p>
                <p className="text-green-500 font-bold">Rs. {product.price}</p>
            </div>
            </a>
        ))}
        </div>

        </div>
        </>
    );

}