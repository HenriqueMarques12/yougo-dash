import Image from 'next/image'
import React from 'react'

const Survey = () => {
  return (
    <div id="historia" className='container pt-40'>
        <div className='grid lg:grid-cols-[50%,1fr] gap-20'>
            <div>
                <Image 
                    className='w-100% h-auto lg:w-auto lg:h-[90vh]'
                    src="/lenne-luz.jpeg"
                    width={1000}
                    height={600}
                    alt="Chefe Lenne Luz"
                />

            </div>
            <div className='self-center'>
                
                <h2 className='text-4xl md:text-6xl font-bold pt-3'>
                    Como tudo <span className='text-accent'>começou</span>
                </h2>

                <p className='text-gray-700 pt-16'>
                    Muito além do bolo caseiro: Produto único e artesanal
                </p>
                <p className='text-gray-700 pt-8'>
                    Depois de decidir largar o emprego, em uma franquia francesa de cosmeticos, a paraense Lene Borges decide investir na produção de bolos artesanais e com uma pegada gourmet. E, mesmo sem nunca ter entrado em uma cozinha profissional antes, ela transforma-se em uma confeiteira de mão cheia.
                </p>
                <p className='text-gray-700 pt-8'>
                    Passou a usar a internet a seu favor. Fez cursos com renomadas confeiteiras. Aos poucos, seus bolos foram ganhando identidade propria. Foram diversos testes e estudos ate  surgir a <span className='text-accent'>Joao dos Doces</span>.
                </p>
                <p className='text-gray-700 pt-8'>
                    E tudo começou na cozinha de sua casa em 17 de Junho de 2023.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Survey