'use client'
import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from '../../components/CardHome/CardHome.module.css'
import Link from 'next/link';
import { getEnvVariables } from '@/helpers/getEnvVariables';

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
}

interface Purchase {
  products: Product[];
}

interface UserSession {
  token: string;
}

const Purchases = () => {
  const storedUserSession = localStorage.getItem("userSession");
  const [userSession, setUserSession] = useState<UserSession | null>(storedUserSession ? JSON.parse(storedUserSession) : null);

  const [userPurchaseData, setUserPurchaseData] = useState<Purchase[]>([])

  const envVars = getEnvVariables();

  useEffect(() => {
    const getPurchaseData = async () => {
      if (!userSession?.token) return;
  
      const config = {
        headers: {
          'Authorization': userSession.token
        }
      };
  
      try {
        const purchaseData: AxiosResponse = await axios.get(`${envVars.NEXT_PUBLIC_BACK_URL}/users/orders`, config);
        setUserPurchaseData(purchaseData.data);
      } catch (error) {
        console.error("Error fetching purchase data:", error);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    };
  
    getPurchaseData();
  }, [userSession, userSession?.token, envVars.NEXT_PUBLIC_BACK_URL]);
  
  return (
    <div>
        <h2 className='text-2xl font-bold text-[#454545] mb-4 mt-10'>My purchases</h2>
        <div>
            {
                userPurchaseData.length > 0 ? (
                    <div className='flex gap-8 my-12 flex-wrap desktop:justify-start mobile:justify-center'>
                        {
                            userPurchaseData.map((purchase, index) => (
                                <div key={index}>
                                    {
                                        purchase.products.map(product => (
                                            <ProductCard key={product.id} id={product.id} image={product.image} name={product.name} price={product.price} />
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                ) : (
                  <div className='flex gap-8 my-12 justify-center'>
                    <div className="flex flex-col items-center" style={{height: '23rem'}}>
                      <p className="text-lg">You have not yet made a purchase 💔</p>
                      <button className={`${styles.button} flex justify-center items-center gap-4 shadow-sm w-72 border-slate-800 bg-[#1A1A1A] text-white text-sm font-medium mt-4 hover:-translate-y-1 transition p-3 duration-300 rounded border-2`}><Link href="/">Ver productos</Link></button>
                    </div>
                  </div>
                )
            }
        </div>
    </div>
  )
}

export default Purchases