
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
import type { Auth } from '@/types';
import { logout } from "@/routes";
import TextLink from "@/components/text-link";

type Product = {
    id: number;
    title:string,
    price:number,
    image:string

};
type PageProps = {
    auth: Auth;
};

export default function Hello() {
    const { auth } = usePage<PageProps>().props;
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
        <h2 className="text-gray-200">Hello, {auth.user && auth.user.name}. What are you going to buy today?</h2>
        {auth.user && <TextLink href={logout()} className="text-red-500 cursor-pointer">Logout</TextLink>}
        {!auth.user && <TextLink href="/login" className="text-yellow-500 cursor-pointer">Login</TextLink>} 
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