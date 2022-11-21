import React from "react";

const Benefit = () => {
  const benefits = [
    {
      title: "Fast Delivery",
      description: "Start from $10",
    },
    {
      title: "Money Guarantee",
      description: "7 Days Back",
    },
    {
      title: "365 Days",
      description: "For free return",
    },
    {
      title: "Payment",
      description: "Secure system",
    },
  ];

  return (
    <div className="grid grid-cols-4">
      {benefits.map((benefit) => {
        return (
          <div className="">
            <p>{benefit.title}</p>
            <p>{benefit.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Benefit;
