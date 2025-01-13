"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import API from '../../../service/api';

interface PageProps {
  params: { slug: string };
}

type DataProps = {
  id: number;
  nome: string;
  [key: string]: any;
};

export default function ListaCadastro({ params }: PageProps) {
  const { slug } = params;

  const [data, setData] = useState<DataProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<DataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let regra = '';
      switch (slug) {
        case 'perfilAdministrador':
          regra = 'admin';
          break;
        case 'perfilParceiro':
          regra = 'parceiro';
          break;
        case 'perfilVendedor':
          regra = 'vendedor';
          break;
        case 'perfilCliente':
          regra = 'cliente';
          break;
      }

      const response = await fetch(`${API.baseApi}/auth/users/role/${regra}`);
      const list = await response.json();
      setData(list);
      setFilteredData(list);
    };

    fetchData();
  }, [slug]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = searchTerm.toLowerCase();
    const results = data.filter((item) =>
      item.nome.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.cpf.replace(/[\.-]/g, '').toLowerCase().includes(term)
    );
    setFilteredData(results);
  };

  const handleTitle = (slug:string) => {
    switch (slug) {
      case 'perfilAdministrador':
        return 'Administradores';
        break;
      case 'perfilParceiro':
        return 'Parceiros';
        break;
      case 'perfilVendedor':
        return 'Vendedores';
        break;
      case 'perfilCliente':
        return 'Clientes';
        break;
    }
  }

  useEffect(()=> {
    if(searchTerm.length===0){
      setFilteredData([])
    }
  },[searchTerm])

  return (
    <main className="font-hogfish">
      <div className="text-white px-4 py-6">
        <h1 className="text-center text-secondary">{handleTitle(slug)}</h1>

        <form onSubmit={handleSearch} className="max-w-md mx-auto py-6">   
            <label  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // Previne o comportamento padrão de recarregar a página
                      handleSearch(e as unknown as React.FormEvent<HTMLFormElement>);
                    }
                  }}
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Pesquisa..."
                  required
                />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-secondary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-4 py-2 dark:bg-secondary dark:hover:bg-secondary dark:focus:ring-secondary">Pesquisar</button>
            </div>
        </form>

{/* 
        <form onSubmit={handleSearch} className="max-w-md mx-auto my-5">
          <div className="relative">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Pesquisa..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-secondary hover:bg-secondary-800"
            >
              Pesquisar
            </button>
          </div>
        </form> */}

        {filteredData.length>0 &&
          <div className="flex flex-col space-y-4 items-center my-3">
            {filteredData.map((item) => (
              <Link
                key={item.id}
                href={`${slug}/${item?.id}`}
                className="flex w-full md:w-[40%] text-fontDark p-4 rounded shadow-md hover:shadow-lg"
              >
                <p>{item.nome}</p>
              </Link>
            ))}
          </div>
        }
        
        {filteredData.length===0 &&
          <div className="flex flex-col space-y-4 items-center">
            {data.map((item) => (
              <Link
                key={item.id}
                href={`${slug}/${item?.id}`}
                className="flex w-full md:w-[40%] text-fontDark p-4 rounded shadow-md hover:shadow-lg"
              >
                <p>{item.nome}</p>
              </Link>
            ))}
          </div>
        }
      </div>
    </main>
  );
}
