import { Button } from "@/components/ui/button";
import { usePage } from "@inertiajs/react"
import { useState, useEffect } from "react"
type Product = {
    id: number;
    title:string,
    price:number,
    image:string

};
export default function Product() {
    const [product, setProdct] = useState<Product>();
    const { id } = usePage().props;
    useEffect(()=>{
            async function fetchData() {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            if(!response.ok) {
                throw new Error("Failed to fetch product data");
            }
            setProdct(data);

        }
        catch(err) {
            console.log(err);
        }
    }
    fetchData();
    },[])
    return (
        <>
        <h1 className="text-xl"><a href="/store">Home</a></h1>
        <div className="flex flex-row justify-around items-center padding-10">
        <div className= "padding-10">
        <img src={product?.image}/>
        </div>
        <div className="flex flex-col">
        <h1 className="text-6xl">{product?.title}</h1>
        <p>Price:{product?.price}</p>
        <div className="flex flex-row gap-4">
        <Button className="bg-orange-400 cursor-pointer">Buy Now</Button>
        <Button className="bg-green-400 cursor-pointer">Add to Cart</Button>
        </div>
        </div>
        </div>
        </>
    )
}