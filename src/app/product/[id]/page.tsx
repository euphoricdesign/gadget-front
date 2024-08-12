"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import { CiShoppingCart } from "react-icons/ci";
import { getProductById } from "@/helpers/getData";
import Toastify from "toastify-js";
import { useRouter } from "next/navigation";
import IProduct from "@/types/IProduct";
import styles from "../../../components/CardHome/CardHome.module.css";

interface ProductDetailParams {
  params: {
    id: string;
  };
}

const ProductDetail = ({ params }: ProductDetailParams) => {
  const [userSession, setUserSession] = useState<any>(null);
  const [product, setProduct] = useState<IProduct>();

  const router = useRouter();

  const handleAddToCart = () => {
    if (!userSession) {
      // Crear una instancia de notificación
      const myToast = Toastify({
        text: "Login to add products to cart",
        className: "toastify",
        position: "left",
        gravity: "bottom",
        duration: 999999999, // Duración muy grande para simular permanencia en pantalla
        close: true,
      });

      // Mostrar la notificación
      myToast.showToast();
    } else {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (!cart.includes(product)) {
        cart.push(product);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      router.push("/cart");
    }
  };

  // Efecto para obtener datos de localStorage al montar el componente
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedUserSession = localStorage.getItem("userSession");
        if (storedUserSession) {
          setUserSession(JSON.parse(storedUserSession));
        }
      }
    } catch (error) {
      console.error("Error al leer del localStorage:", error);
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const product = await getProductById(params.id);
        setProduct(product);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    };
    getData();
  }, [params.id]);

  return (
    <>
      {product ? (
        <div className="flex flex-row flex-wrap mobile:justify-center desktop:justify-start">
          <div className="desktop:flex-1 desktop:flex justify-center">
            <Image
              className="w-96"
              src={product.image}
              layout="responsive"
              alt={`${product.name}`}
            />
          </div>
          <div className="desktop:flex-1 p-10 bg-[#f5f5f5] rounded-lg border-[#f5f5f5] border">
            <h2 className="font-bold text-2xl text-[#454545]">
              {product.name}
            </h2>
            <span className="text-slate-500">Iphones</span>
            <div className="flex mt-4 text-yellow-500 text-lg gap-1">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <CiStar />
            </div>
            <span className="text-slate-500 mr-4">3 reviews</span>
            <span className="text-slate-700">Add your review</span>
            <p className="mt-8 line-through text-slate-400">$1,800.00</p>
            <span className="text-3xl text-[#031A6B] font-semibold">
              ${product.price}
            </span>
            <p className="my-3.5 text-slate-500">{product.description}</p>
            <div className="flex gap-8 mt-8">
              <select
                className={`${styles.button} shadow w-36 border-white bg-white transition duration-300 font-medium text-sm p-2 pl-6 rounded border-2`}
              >
                <option value="">Select color</option>
                <option value="">Option 2</option>
                <option value="">Option 3</option>
              </select>
              <button
                className={`${styles.button} shadow w-36 border-white bg-white transition duration-300 font-medium text-sm p-2 rounded border-2 flex justify-between`}
              >
                <span>-</span>Quantity<span>+</span>
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`${styles.button} flex justify-center items-center gap-4 shadow-md w-56 border-slate-800 bg-[#1A1A1A] text-white text-sm font-medium mt-8 hover:-translate-y-1 transition p-3 duration-300 rounded border-2`}
            >
              <CiShoppingCart style={{ fontSize: 18 }} /> Add to cart
            </button>
          </div>
        </div>
      ) : (
        // Skeleton de carga
        <div className="flex flex-row flex-wrap mobile:justify-center desktop:justify-start">
          <div className="desktop:flex-1 desktop:flex justify-center">
            <div className="w-[500px] bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="desktop:flex-1 p-10 bg-[#f5f5f5] rounded-lg border-[#f5f5f5] border">
            <div className="h-8 w-2/3 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="h-5 w-1/4 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="h-6 w-1/3 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="h-5 w-1/4 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="h-8 w-1/4 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="h-10 w-1/2 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="h-16 w-full bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="flex gap-8 mt-8">
              <div className="h-10 w-36 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-10 w-36 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="h-12 w-56 bg-gray-200 animate-pulse rounded mt-8"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
