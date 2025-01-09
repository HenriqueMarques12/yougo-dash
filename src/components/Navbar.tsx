"use client"
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';

import { CiMenuBurger } from "react-icons/ci";
import { checkIsPublicRoute } from '@/app/functions/check-is-public-route';

const Navbar = () => {
  const [menuShow, setMenuShow] = useState(false)
  const router = useRouter();
  const pathName = usePathname()
  const isPublicPage = checkIsPublicRoute(pathName)

  const handleMobileMenu = () => {
    console.log({menuShow})
    setMenuShow(!menuShow)
  }

  const handleLogout = () => {
    localStorage.removeItem('userId');
    router.push('/login')
  }

  const handleVoltar = () => {
    router.back();
  }

  return (
    <div className='w-full bg-secondary'>
       <div
          className='container py-6 '
        >
          <div
            className='flex justify-between items-center'
          >
            <Image
              src="/logo-joao-dos-doces.png"
              width={50}
              height={50}
              alt="logo-joao-dos-doces"

            />
           {/*  <ul
              className='md:flex hidden gap-8 items-center font-semibold text-[14px] text-white'
            >
              <li>
                <Link href="#home">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#destaque">
                  Destaques
                </Link>
              </li>
              <li>
                <Link href="#servico">
                  Serviços
                </Link>
              </li>
              <li >
                <Link href="#cardapioAtracao" className='text-green-600'>
                  Guirlandas Natalinas
                </Link>
              </li>
              <li>
                <Link href="#cardapio">
                  Cardápio
                </Link>
              </li>
              <li>
                <Link href="#historia">
                  História
                </Link>
              </li>
              <li>
                <Link href="#sobre">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="#sobre">
                  Contatos
                </Link>
              </li>
            </ul> */}
     {/*        <button
                className='cursor:pointer md:hidden'
                type='button'
                onClick={
                    () => handleMobileMenu()
                }
            >
                 <CiMenuBurger className="md:hidden text-fontLight" size={30} />
            </button> */}

            <div className='w-30 gap-6'>
                {!isPublicPage &&
                  <div>
                      {pathName != "/painel" &&
                        <button type="button" onClick={()=> handleVoltar()} className="text-secondary bg-white border border-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Voltar</button>
                      }
                      <button type="button" onClick={()=> handleLogout()} className="text-secondary bg-white border border-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Sair</button>
                  </div>
                  
                }
            </div>
           

          </div>
        </div>
        {menuShow &&
              <>
                <div
                  className="md:hidden text-secondary w-full bg-secondary"
                >
                 {/*  <ul
                    className='md:hidden gap-8 p-10 items-center font-semibold text-[18px] text-white text-center'
                  >
                    <li className='p-3  border-b-[1px] border-fontLight'>
                      <Link href="#home">
                        Home
                      </Link>
                    </li>
                    <li className='p-3  border-b-[1px] border-fontLight'>
                      <Link href="#destaque">
                        Destaques
                      </Link>
                    </li>
                    <li className='p-3  border-b-[1px] border-fontLight'>
                      <Link href="#servico">
                        Serviços
                      </Link>
                    </li>
                    <li className='p-3  border-b-[1px] border-fontLight'>
                      <Link href="#cardapioAtracao" className='text-green-600'>
                        Guirlandas Natalinas
                      </Link>
                    </li>
                    <li className='p-3  border-b-[1px] border-fontLight'>
                      <Link href="#cardapio">
                        Cardápio
                      </Link>
                    </li>
                    <li className='p-3  border-b-[1px] border-fontLight'>
                      <Link href="#historia">
                        História
                      </Link>
                    </li>
                    <li className='p-3  border-b-[1px] border-fontLight'>
                      <Link href="#sobre">
                        Sobre
                      </Link>
                    </li>
                    <li className='p-3'>
                      <Link href="#sobre">
                        Contatos
                      </Link>
                    </li>
                  </ul> */}
                   
                   {!isPublicPage &&
                      <div className='gap-6'>
                          {pathName != "/painel" &&
                            <button type="button" onClick={()=> handleVoltar()} className="text-secondary bg-white border border-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Voltar</button>
                          }
                          <button type="button" onClick={()=> handleLogout()} className="text-secondary bg-white border border-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Sair</button>
                      </div>
                      
                    }
                </div>
              </>

            }
    </div>
   
  )
}

export default Navbar