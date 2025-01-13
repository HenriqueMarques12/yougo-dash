import Feature from '@/components/Feature'
import Hero from '@/components/Hero'
import Menu from '@/components/Menu'
import Services from '@/components/Services'
import Survey from '@/components/Survey'
import MenuAtracao from '@/components/MenuAtracao'
import Image from 'next/image'
import Link from 'next/link'




export default function EditarCadastro() {

  const menu = [
    {
      id:1,
      btnTitle: "Perfil Administrador",
      linkUrl: "perfilAdministrador"
    },
    {
      id:2,
      btnTitle: "Perfil Parceiro",
      linkUrl: "perfilParceiro"
     
    },
    {
      id:3,
      btnTitle: "Perfil Vendedor",
      linkUrl: "perfilVendedor"
    },
    {
      id:4,
      btnTitle: "Perfil Cliente",
      linkUrl: "perfilCliente"
    },
    {
      id:5,
      btnTitle: "PDV",
      linkUrl: "pdv"
    },
    {
      id:6,
      btnTitle: "Produtos Fisicos",
      linkUrl: "produtosFisicos"
    },
    {
      id:7,
      btnTitle: "Ofertas",
      linkUrl: "ofertas"
    }
    
  ]

  return (
   <main id="home" className='font-hogfish'>
  
    {/* <Hero />
    <Feature />
    <Services />
    <MenuAtracao />
    <Menu />
    <Survey />  */}
    <div className="text-white px-4 py-6">
      <h1 className='text-center text-secondary'>
      Editar cadastro
      </h1>
      <div className="flex flex-col space-y-4 items-center">
        {menu
          .filter((v) => v.id === 1 || v.id === 2 || v.id === 3 || v.id === 4)
          .map((i) => {
            return (
              <Link
                key={i.id}
                href={`editarCadastro/${i.linkUrl}`}
                className="flex w-full md:w-[40%] text-fontDark p-4 rounded shadow-md hover:shadow-lg transition-shadow justify-between items-center"
              >
                <p>{i.btnTitle}</p>
           {/*      <span>{i.svg}</span> */}
              </Link>
            );
          })}
      </div>
    </div>
   </main>
  )
}
