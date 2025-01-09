"use client"
import Image from 'next/image'
import React from 'react'
import Navbar from './Navbar'

const Hero = () => {
  const handleViewMore = () => {
    let divVerBolo:any = document.getElementById("destaque");
    divVerBolo.scrollIntoView()
  }
  return (
    <div
        className='relative min-h-screen'
    >
    <Image 
        className='lg:w-[780px] xl:w-[820px] h-auto absolute right-0 top-0 -z-10'
        src="/triplo.png"
        width={1000}
        height={600}
        alt="hero bg"
    />
    <Navbar/>
    <div 
      className='container h-[calc(100vh-120px)] grid items-center'
    >
      <div
        className='space-y-4 bg-[#ffffff98] w-fit p-4'
      >
        <p className='uppercase font-medium'>Amplas opções de escolha</p>
        <h2 className='text-4xl sm:text-6xl font-bold'>Bolos <span className='text-accent'>Deliciosos</span></h2>
        <p className='text-gray-700 text-[14px] sm:text-[16px]'>
          Bolos coloridos deliciosos, <br /> aroma e sabor. O que você está esperando?
        </p>
        <button
          onClick={() => handleViewMore()}
          className='bg-accent text-white px-6 py-2 rounded-3xl text-[14px] sm:text-[16px]'
        >
          Veja Mais
        </button>
      </div>
    </div>
    </div>
  )
}

export default Hero