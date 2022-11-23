import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { BsPiggyBank, BsCreditCard2Front } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";

const Benefit = () => {
  const benefits = [
    {
      title: "Fast Delivery",
      description: "Start from $10",
      icon: <TbTruckDelivery />,
    },
    {
      title: "Money Guarantee",
      description: "7 Days Back",
      icon: <BsPiggyBank />,
    },
    {
      title: "365 Days",
      description: "For free return",
      icon: <AiOutlineFieldTime />,
    },
    {
      title: "Payment",
      description: "Secure system",
      icon: <BsCreditCard2Front />,
    },
  ];

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-5 sm:px-0 my-10 gap-5 bg-white">
      {benefits.map((benefit, index) => {
        return (
          <div
            key={index}
            className="flex items-center gap-5 pb-5 border-b-2 sm:border-b-0 sm:odd:border-r-2 lg:border-r-2 lg:last:border-0"
          >
            <i className=" text-5xl mx-5">{benefit.icon}</i>
            <div>
              <p className="font-semibold text-lg ">{benefit.title}</p>
              <p className=" text-neutral-500">{benefit.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Benefit;
