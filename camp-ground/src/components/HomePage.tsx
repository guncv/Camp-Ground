'use client'
import Image from "next/image";
import styles from "@/styles/FontPage.module.css"
import { useEffect, useState } from "react";

export default function HomePage(){
    const[index,setIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIndex(index+1);
        }, 4000);

        return () => clearTimeout(timer);
      }, [index]);

    const covers = [
        "/images/banner.jpg",
        "/images/banner2.jpg",
        "/images/banner3.jpg",
        "/images/banner4.jpg",
        "/images/banner5.jpg"
    ];

    return (
        <div className={`${styles.allFont} flex justify-center items-center 
        relative w-screen h-screen text-white block`}>
            <Image src="/images/homeBg.jpg" 
            className="saturate-100 opacity-60"
            alt="Error For Load Home Background" 
            fill={true}/>
            <div className="relative">
                <div className=" flex flex-row justify-center"> 
                    <h1 className="text-[86px]">CAMP GROUND</h1> 
                </div> 
                <div className={`${styles.allFont} flex flex-row justify-center text-[28px] 
                mt-[-20px] items-center`}>
                    <span className="mb-[22px] mr-[10px]">__</span>
                    <span>Your Gateway to Nature's Playground</span>
                    <span className="mb-[22px] ml-[10px]">__</span>
                </div>
                <div className="mt-[25px] flex flex-row items-center">
                    <Image src="/images/left_arrow.png"
                        className="w-[30px] h-[47px] transition-transform transform 
                        hover:scale-[1.155] duration-300"
                        onClick={() => {setIndex(index+4);}}
                        alt="left_arrow"
                        width={1000}
                        height={100}/>
                
                    <Image src={covers[index%5]}
                    alt="Banner"
                    className="w-[1009px] h-[381px] rounded-[30px] flex flex-row ml-[10px]"
                    width={1000}
                    height={1000}/>

                    <Image src="/images/right_arrow.png"
                        className="w-[30px] h-[47px] ml-[10px] transition-transform transform 
                        hover:scale-[1.155] duration-300"
                        onClick={() => {setIndex(index+1);}}
                        alt="left_arrow"
                        width={1000}
                        height={100}/>
                </div>
            </div>
        </div>
    )
}