
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
        {products?.map((product) =>(
            <div key={product.id}>
                <img src={product.image}/>
                <p>{product.title}</p>
                <p>{product.price}</p>
            </div>
        ))}
        </>
    );

}