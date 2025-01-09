import React from 'react'
import Dash from './Dash'
import Image from 'next/image'

const Feature = () => {
  return (
    <div
        id="destaque"
        className='container pt-40'
    >
        <h2
            className='text-6xl font-bold'
        >
            Nossos
        </h2> 
        <h2
            className='text-6xl font-bold pt-2'
        >
        <span className='text-accent'>Destaques</span>
        </h2> 
        <p 
            className='max-w-[550px] pt-10 text-gray-700'
        >
            Nossos queridinhos, os mais pedidos por nossos clientes

        </p>

        <Dash />

        <div
            className='grid md:grid-cols-[1fr,37%,1fr] gap-16 mt-10'
        >
            <div className='w-fit max-auto self-end'>
                <Image 
                    className='w-[100%] max-w-[400px] sm:max-w-full h-auton shadow-2xl'
                    src="/chocolate-morango.jpeg" 
                    width={300} 
                    height={600}
                    alt="grid image"
                />
                <div
                    className='space-y-4'
                >
                    <Dash />
                    <h2 className='font-medium text-xl'>Bolo de Chocolate</h2>
                    <p
                        className='text-gray-700 text-[14px] xl:text-[16px]'
                    >
                        Massa amanteigada de chocolate(cacau 100%), Cobertura de chocolate(cacau 100%) e  morangos.
                    </p>
                </div>

            </div>


        {/*     <div className='w-fit max-auto'>
                <Image 
                    className='w-[100%] max-w-[400px] sm:max-w-full h-auton shadow-2xl'
                    src="/laranja-limao.png" 
                    width={500} 
                    height={900}
                    alt="grid image"
                />
                <div
                    className='space-y-4'
                >
                    <Dash />
                    <h2 className='font-medium text-xl'>Bolo de Laranja</h2>
                    <p
                        className='text-gray-700 text-[14px] xl:text-[16px]'
                    >
                      Massa com suco laranja e leite em pó e cobertura de mousse  de Limão.
                    </p>
                </div>

            </div> */}

            <div className='w-fit max-auto'>
                <Image 
                    className='w-[100%] max-w-[400px] sm:max-w-full h-auton shadow-2xl'
                    src="/destaque.jpeg" 
                    width={500} 
                    height={900}
                    alt="grid image"
                />
                <div
                    className='space-y-4'
                >
                    <Dash />
                    <h2 className='font-medium text-xl'>Guirlandas Natalinas</h2>
                    <p
                        className='text-gray-700 text-[14px] xl:text-[16px]'
                    >
                      O Natal está chegando e junto com ele a chance de sermos luz na vida de alguem. Para esse momento tao especial, que tal presentear quem voce ama, como uma de nossas guirlandas natalinas.
                    </p>
                </div>

            </div>

            <div className='w-fit max-auto self-end'>
                <Image 
                    className='w-[100%] max-w-[400px] sm:max-w-full h-auton shadow-2xl'
                    src="/redvelvet.jpeg" 
                    width={300} 
                    height={600}
                    alt="grid image"
                />
                <div
                    className='space-y-4'
                >
                    <Dash />
                    <h2 className='font-medium text-xl'>Bolo de Red Velvet</h2>
                    <p
                        className='text-gray-700 text-[14px] xl:text-[16px]'
                    >
                        Massa com iogurte natural em tom avermelhado com discreto sabor de chocolate(cacau 100%).
                    </p>
                </div>

            </div>

        </div>

    </div>
  )
}

export default Feature