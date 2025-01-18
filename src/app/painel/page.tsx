"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Painel() {
  const [role, setRole] = useState<string | null>()
  useEffect(()=> {
    let role =  localStorage.getItem('userRole');
    setRole(role)
  },[])

  const menu = [
    {
      id:1,
      btnTitle: "Cadastrar perfil",
      linkUrl: "cadastrarPerfil"
    },
    {
      id:2,
      btnTitle: "Editar cadastro",
      linkUrl: "editarCadastro",
      svg: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#5ce65c" className="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
           </svg>
    },
    {
      id:3,
      btnTitle: "Cadastrar cliente",
      linkUrl: "cadastrarCliente"
    },
    {
      id:4,
      btnTitle: "Ativar vendas pendentes",
      linkUrl: "ativarVendas"
    },
    {
      id:5,
      btnTitle: "Cadastrar PDV",
      linkUrl: "cadastrarPDV"
    },
    {
      id:6,
      btnTitle: "Cadastrar PDV",
      linkUrl: "cadastrarPDV"
    },
    {
      id:7,
      btnTitle: "Cadastrar produto fisico",
      linkUrl: "cadastrarProdutoFisico"
    },
    {
      id:8,
      btnTitle: "Cadastrar oferta",
      linkUrl: "cadastrarOferta"
    },
    {
      id:9,
      btnTitle: "Visualizar ofertas",
      linkUrl: "visualizarOfertas"
    },
    {
      id:10,
      btnTitle: "Visualizar relatorios",
      linkUrl: "relatorios",
      svg: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#5ce65c" className="bi bi-database-fill" viewBox="0 0 16 16">
      <path d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223"/>
      <path d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972"/>
      <path d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972"/>
      <path d="M2 12.161V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972"/>
    </svg>
    },
  ]

  return (
   <main id="home" className='font-hogfish'>
    <div className="text-white px-4 py-6">
      <h1 className='text-center text-secondary'>
        Painel
      </h1>
      <div className="flex flex-col space-y-4 items-center">
        <>
          {role === "parceiro" &&
              <>
                {menu
                .filter((v) => v.id === 10)
                .map((i) => {
                  return (
                    <Link
                      key={i.id}
                      href={i.linkUrl}
                      className="flex w-full md:w-[40%] text-fontDark p-4 rounded shadow-md hover:shadow-lg transition-shadow justify-between items-center"
                    >
                      <p>{i.btnTitle}</p>
                      <span>{i.svg}</span>
                    </Link>
                  );
                })}
              </>
          }

          {role === "admin" &&
            <>
              {menu
                .filter((v) => v.id === 2 || v.id === 10)
                .map((i) => {
                  return (
                    <Link
                      key={i.id}
                      href={i.linkUrl}
                      className="flex w-full md:w-[40%] text-fontDark p-4 rounded shadow-md hover:shadow-lg transition-shadow justify-between items-center"
                    >
                      <p>{i.btnTitle}</p>
                      <span>{i.svg}</span>
                    </Link>
                  );
                })}
            </>
          }
        </>
      </div>
    </div>
   </main>
  )
}
