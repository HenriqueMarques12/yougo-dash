import React from 'react'
import Dash from './Dash'
import ServiceCard from './ServiceCard'


const serviceData = [
    {
        id:1,
        img:"/Fruits.svg",
        title:"Ingredientes naturais",
        desc: "Frutas e legumes sempre frescos"
    },

    {
        id:2,
        img:"/bowl.svg",
        title:"Sem massa pronta",
        desc: "Garantia de sabor e aroma."
    },

    {
        id:3,
        img:"/baker.svg",
        title:"Produção artesal",
        desc: "Bolos sempre fresquinhos."
    },

    {
        id:4,
        img:"/Waitress.svg",
        title:"Encomendas",
        desc: "Devem ser feitas com no minimo 12 horas de antecedencia."
    },

]

const Services = () => {
  return (
    <div
        id="servico"
        className='container pt-40'
    >
        <div
            className='space-y-4 w-fit mx-auto text-center'
        >
            <h2 className='text-4xl md:text-6xl font-bold'>
                Escolha o melhor <span className='text-accent'>Serviço</span>
            </h2>
           <p className='text-gray-700'>
                O diferencial de nossos produtos, é a garantia de ingredientes de excelente qualidade e receitas unicas
                <br/>
                "Enquanto nos bolos caseiros tradicionalmente fabricados, a massa costuma ser unica para todos os sabores, mudando apenas a essência, na <span className='text-accent'>Joao dos Doces</span>, cada bolo possui uma massa especifica. Tudo e feito de forma artesanal".
            </p> 
            <div
                className='w-fit mx-auto'
            >
                <Dash />
            </div>
        </div>

        <div className='grid gap-10 md:grid-cols-4 md:gap-4 pt-8'>
            {serviceData.map((item, index)=><ServiceCard key={index} img={item.img} title={item.title} desc={item.desc}/>)}
        </div>
        
        

    </div>
  )
}

export default Services