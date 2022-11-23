import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

import slider1 from "../public/images/6238b7a4b377396532bad8e6_nike-unveils-innovative-designs-2016-olympics-rio-de-janeiro-01 1.jpeg";
import slider2 from "../public/images/Bax-Towner-PF-Fitness-Nike-Studio-7876.jpg";
import slider3 from "../public/images/better-not-younger-vicki-archer-nike.jpg";

const Slider = [
  {
    title: "test",
    description: "test",
    image: slider3,
  },
  {
    title: "test",
    description: "test",
    image: slider2,
  },
  {
    title: "test",
    description: "test",
    image: slider1,
  },
];

function Sliders() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Autoplay]}
      className="container m-auto h-[400px] md:h-[600px] !z-[-1]"
    >
      {Slider.map((slider, index) => {
        return (
          <SwiperSlide
            key={index}
            className="relative flex justify-center items-center "
          >
            <div className="absolute z-10 left-12 md:left-24 lg:left-56">
              <h1 className=" text-3xl font-medium">{slider.title}</h1>
              <p className="mb-5 mt-2">{slider.description}</p>
              <button className=" bg-black rounded-md w-32 text-white px-4 py-2 hover:opacity-80 ">
                SHOP NOW
              </button>
            </div>
            <Image
              src={slider.image}
              alt=""
              className="w-[100%] h-[100%] object-cover opacity-70"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Sliders;
