'use client'
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react";
import axios from "axios";
import SplitText from "@/components/SplitText";
export default function Home() {
const [bannerImages, setbannerImages] = useState([])
  const fetchBannerImage = async () => {
    try {
      const resp = await axios.get('/api/landingpage/getallbannerimage')
      if(resp?.data?.getAllBannerImage){
        setbannerImages(resp?.data?.getAllBannerImage)
      }
    } catch (error) {
      console.log('Server error')
    }
  }
  // useEffect(() => {
  //   fetchBannerImage()
  // }, [])
  
  return (
   <div className="bggrad" >
<div className="w-full z-40 sticky top-0">
  <Navbar />
</div>
<div className="w-full flex items-center justify-center ">

<div className="mt-6  text-center">
  <SplitText
  text="One Platform for All Your Internship & NOC Needs."
  className="text-3xl font-semibold text-center text-white text-balance"
  delay={50}
  duration={0.2}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"

/>
  <SplitText
  text="Submit internships, upload offer letters, request NOCs, and track approvals — simple and secure."
  className="text-xl font-semibold text-center text-white text-balance"
  delay={50}
  duration={0.2}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"

/>
</div>
 {/* <div className="w-[90%] my-2">
   <Carousel  
   opts={{
    align: "start",
    loop: true,
  }}
   plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}>
  <CarouselContent className='text-white'>
    {
      bannerImages?.map((e)=>(
       
          <CarouselItem  key={e?._id} className="relative w-full h-72" ><Image src={e?.bannerimage}  alt="Banner Image" fill  className="object-contain maskim rounded-lg"  /></CarouselItem>

      
      ))
    }
   
  </CarouselContent>

</Carousel>
 </div> */}
</div>

   </div>
  );
}
  {/* <CarouselPrevious />
  <CarouselNext /> */}