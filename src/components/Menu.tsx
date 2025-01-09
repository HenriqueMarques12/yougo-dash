'use client'
import React, { useEffect, useState } from 'react'
import Dash from './Dash'
import Image from 'next/image'
import MenuCard from './MenuCard'

import redVelvet from "/redvelvet.jpeg"

interface Bolo {
    img: string;
    title: string;
    desc: string;
    price: string;
  }
  
const Menu: React.FC = () => {
     
    const menuData: Bolo[] = [
        {
            img: "redvelvet.jpeg" ,
            title: "Bolo de Red Velvet",
            desc: "Massa com iogurte natural em tom avermelhado com discreto sabor de chocolate, cobertura de leite e morangos, 22cm. 12 a 15 fatias.",
            price: "R$69,00",
        },

        {
           img: "laranja.jpeg" ,
           title: "Bolo de Laranja",
           desc: "Massa com suco laranja e leite em pó e cobertura de mousse  de Limão, 22cm. 12 a 15 fatias.",
           price: "R$59,00",
        },
       /*  {
            img: "/laranja.jpeg" ,
            title: "Bolo de Laranja",
            desc: "Cobertura de chocolate(cacau 100%), com morangos com raspas ou  granulados de chocolate ao leite, 22cm. 12 a 15 fatias.",
            price: "R$55,00",
        }, */
      /*   {
            img: "/laranja.jpeg" ,
            title: "Bolo de Laranja",
            desc: "Cobertura de chocolate(cacau 100%), com brigadeiros com raspas ou  granulados de chocolate ao leite, 22cm. 12 a 15 fatias.",
            price: "R$55,00",
        }, */
       /*  {
            img: "/laranja.jpeg" ,
            title: "Bolo de Laranja",
            desc: "Cobertura de chocolate(cacau 100%), com brigadeiros e morangos e com raspas ou  granulados de chocolate ao leite, 22cm. 12 a 15 fatias.",
            price: "R$60,00",
        }, */
        
        {
            img: "chocolate-brigadeiro.jpeg" ,
            title: "Bolo de Chocolate",
            desc: "Massa amanteigada de chocolate(cacau 100%), Cobertura de chocolate(cacau 100%), com brigadeiros e com raspas ou  granulados de chocolate ao leite, 22cm. 12 a 15 fatias.",
            price: "R$69,00",
        },

        {
            img: "chocolate-morango1.jpeg" ,
            title: "Bolo de Chocolate",
            desc: "Massa amanteigada de chocolate(cacau 100%), Cobertura de chocolate(cacau 100%), com morango e com raspas ou  granulados de chocolate ao leite, 22cm. 12 a 15 fatias.",
            price: "R$69,00",
        },

        {
            img: "chocolate-brigadeiro-morango.jpeg" ,
            title: "Bolo de Chocolate",
            desc: "Massa amanteigada de chocolate(cacau 100%), Cobertura de chocolate(cacau 100%), com brigadeiros e morangos e com raspas ou  granulados de chocolate ao leite, 22cm. 12 a 15 fatias.",
            price: "R$75,00",
        },


      /*   {
            img: "beijinho.jpeg" ,
            title: "Bolo Prestígio",
            desc: "Massa amanteigada de chocolate(cacau 100%), Cobertura de doce de coco e chocolate(cacau 100%), com brigadeiros e com raspas de coco ralado, 22cm. 12 a 15 fatias.",
            price: "R$65,00",
        }, */

        {
            img: "cenoura.jpg" ,
            title: "Bolo de Cenoura",
            desc: "Cobertura chocolate(cacau 100%), com granulado de chocolate ao leite, 22cm. 12 a 15 fatias.",
            price: "R$65,00",
        },

       /*  {
            img: "vanilla-yogurt.jpeg" ,
            title: "Bolo de Baunilha",
            desc: "Massa de baunilha e iogurte natural, cobertura de chocolate(cacau 100%), com raspas ou  granulados de chocolate ao leite, 22cm. 12 a 15 fatias.",
            price: "R$45,00",
        },
 */
        
    ]

   
        const [verBolo, setVerBolo] = useState<Bolo>(menuData[0]);
      
        const handleVerBolo = (item: Bolo) => {
            setVerBolo(item);
            let divVerBolo:any = document.getElementById("cardapio");
            divVerBolo.scrollIntoView()
        };
      
        useEffect(() => {
          setVerBolo(menuData[0]);
        }, []);
   
  return (
    <div
       
        className='container pt-40'
    >
        <div  id="cardapio"  className='space-y-4 w-fit mx-auto text-center'>
            <h2 className='text-4xl md:text-6xl font-bold'>
                Nosso <span className='text-accent'> Cardápio</span>
            </h2>
          {/*   <p className='text-gray-700'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin, urna eleifend scelerisque sodales, enim velit ornare tortor, nec malesuada diam dui a est.
                <br/>
                Lorem ipsum dolor sit amet?
            </p> */}
            <div
                className='w-fit mx-auto'
            >
                <Dash />
            </div>
        </div>

       {/*  <ul className='mt-40 hidden sm:flex gap-6 md:gap-10 lg:gap-20 w-fit mx-auto'>
            <li className='bg-accent text-white rounded-full p-1 px-3'>Bolos</li>
            <li>Coberturas</li>
            <li>Decoração</li>
        </ul>
 */}
        <div  className='grid lg:grid-cols-[35%,1fr] gap-10 pt-10'>
            <div className='w-fit mx-auto'>
                <Image 
                   
                    className='w-[100%] max-w-[400px] h-auto'
                    src={`/${verBolo.img}`}
                    width={500}
                    height={500}
                    alt={`/${verBolo.title}`}
                />
                <h2>{verBolo.title}</h2>
                <p className='text-[14px] text-gray-600 pt-1 whitespace-pre-line'>{verBolo.desc}</p>
            </div>
            <div className='grid w-fit max-auto sm:grid-cols-2 gap-4'>
                {menuData.map((item,index)=> {
                     return (
                        <button
                            key={index.toString()}
                            className='cursor:pointer'
                            type='button'
                            onClick={
                                () => handleVerBolo(item)
                            }
                        >
                            <MenuCard  key={index} img={item.img} title={item.title} desc={item.desc} price={item.price}/>
                        </button>
                        
                     )
                })}
            </div>
        </div>

    </div>
  )
}

export default Menu