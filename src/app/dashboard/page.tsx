"use client";

import { useEffect, useState } from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { getEnvVariables } from "@/helpers/getEnvVariables";
import { Purchase } from "@/types/types";

const envVars = getEnvVariables();

const Dashboard = () => {
  const [userSession, setUserSession] = useState<any>(null);

  useEffect(() => {
    try {
      const storedUserSession = localStorage.getItem("userSession");
      if (storedUserSession) {
        setUserSession(JSON.parse(storedUserSession));
      }
    } catch (error) {
      console.error("Error al leer del localStorage:", error);
    }
  }, []);

  const [userPurchaseData, setUserPurchaseData] = useState<Purchase[]>([]);

  const userData = userSession?.userData;

  useEffect(() => {
    const getPurchaseData = async (token: string) => {
      const config = {
        headers: {
          Authorization: token, // Establecer el token en el encabezado de autorización
        },
      };

      console.log(config);
      const purchaseData = await axios.get(
        `${envVars.NEXT_PUBLIC_BACK_URL}/users/orders`,
        config,
      );
      const data = purchaseData.data;

      setUserPurchaseData(data);
    };

    if (userSession?.token) {
      getPurchaseData(userSession.token);
    }
  }, [userSession]);

  return (
    <AuthLayout>
      <div>
        {userData && (
          <>
            <h2 className="text-2xl font-bold text-[#454545] mb-10">
              Hi,{" "}
              <span className="text-sky-800">
                {userData.name.split(" ")[0]}
              </span>
            </h2>
            <div className="flex justify-between flex-wrap mobile:gap-4">
              <div className="bg-[#ffffff] p-10 text-[#454545] flex flex-col gap-6 desktop:w-6/12 mobile:w-full rounded-lg border-[#ffffff] shadow-md border">
                <h3 className="text-xl font-semibold">Client data</h3>
                <span className="flex justify-between font-semibold">
                  Name: <span className="font-normal">{userData.name}</span>
                </span>
                <span className="flex justify-between font-semibold">
                  Address:{" "}
                  <span className="font-normal">{userData.address}</span>
                </span>
                <span className="flex justify-between font-semibold">
                  Phone: <span className="font-normal">{userData.phone}</span>
                </span>
                <span className="flex justify-between font-semibold">
                  Email: <span className="font-normal">{userData.email}</span>
                </span>
              </div>

              <div
                className={`${userPurchaseData && userPurchaseData.length < 1 && "justify-between"} bg-[#ffffff] p-10 text-[#454545] flex flex-col gap-6 desktop:w-45percent mobile:w-full rounded-lg border-[#ffffff] shadow-md border`}
              >
                {userPurchaseData && userPurchaseData.length > 0 ? (
                  <>
                    <div className="flex flex-col gap-6">
                      <h3 className="text-xl font-semibold text-[#454545]">
                        My purchases
                      </h3>
                      {userPurchaseData.slice(0, 2).map((purchase, index) => (
                        <div key={index}>
                          {purchase.products.map((product, index) => (
                            <div key={index} className="text-sm flex gap-4">
                              <Image
                                className="w-20"
                                src={product.image}
                                alt={product.name}
                              />
                              <div>
                                <h3 className="font-semibold">
                                  {product.name}
                                </h3>
                                <p>${product.price}</p>
                                <p>
                                  Date:{" "}
                                  {new Date(purchase.date)
                                    .toLocaleDateString("es-ES", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })
                                    .replace(/\//g, "/")}
                                </p>
                                <p>
                                  Status:{" "}
                                  <span className="text-green-500">
                                    {purchase.status}
                                  </span>
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-[#454545]">
                      My purchases
                    </h3>
                    <span>
                      You have not made any purchases with this account
                    </span>
                  </>
                )}
                <Link href="/purchases" className="underline text-sm self-end">
                  View My Purchases
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default Dashboard;
