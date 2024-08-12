import Link from "next/link";
import React from "react";

interface PurchasedProductCardProps {
  id: string;
  status: string;
  date: string;
  image: string;
  name: string;
  price: number;
}

const PurchasedProductCard: React.FC<PurchasedProductCardProps> = ({
  id,
  status,
  date,
  image,
  name,
  price,
}) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden p-4 h-22rem w-[14rem]">
      <Link href={`/product/${id}`} className="flex justify-center">
        <img src={image} alt={name} className="w-[150px] object-contain" />
      </Link>

      <div className="p-4 flex flex-col  mobile:gap-1">
        <h3 className="desktop:text-[15px] font-semibold mb-2 mobile:text-sm">
          {name}
        </h3>
        <div className="flex justify-between flex-col gap-[6px]">
          <div className="flex items-center gap-1">
            <p className="text-gray-400 text-sm">Price:</p>
            <p className="text-[12px]">${price}</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-gray-400 text-sm">Status:</p>
            <p className="text-[12px] text-green-500">{status}</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-gray-400 text-sm">Date:</p>
            <p className="text-[12px]">
              {" "}
              {new Date(date)
                .toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, "/")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedProductCard;
