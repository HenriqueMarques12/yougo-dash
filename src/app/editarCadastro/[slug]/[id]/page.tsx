"use client";

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import API from '../../../../service/api';
import { estados, planos } from '@/app/lib/SelectItems';
import { useForm, SubmitHandler } from 'react-hook-form';


import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { FormDataEditSchema, FormDataAdminParceiroEditSchema, FormDataVendedorEditSchema, UserType } from '@/app/lib/schema';
import InputMask from 'react-input-mask-next';
import api from '../../../../service/api';

interface PageProps {
  params: { id: number };
}


type Inputs = 
  | z.infer<typeof FormDataEditSchema>
  | z.infer<typeof FormDataAdminParceiroEditSchema>
  | z.infer<typeof FormDataVendedorEditSchema>;



export default function SobreUsuario({ params }: PageProps) {
  const { id } = params;
  const [userData, setUserData] = useState<UserType>()
  const [cidades, setCidades] = useState<string[]>([])
  const [parceiros, setParceiros] = useState<{id:string, nome:string}[]>([])
  const [showPassword, setShowPassword] = useState<Boolean>()
  const [load, setLoad] = useState<Boolean>(false)
  const [alertStatusSuccess, setAlertStatusSuccess] = useState<Boolean>()
  const [alertStatusFail, setAlertStatusFail] = useState<Boolean>()
  const [alertText, setAlertText] = useState<String>()

  const handleForm = (role: string | undefined) => {
    switch (role) {
      case 'admin':
        return zodResolver(FormDataAdminParceiroEditSchema);
        break
      case 'parceiro':
        return zodResolver(FormDataAdminParceiroEditSchema);
        break
      case 'vendedor':
        return zodResolver(FormDataVendedorEditSchema);
        break
      case 'cliente':
        return zodResolver(FormDataEditSchema);
        break
    }
  };
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors}
  } = useForm<Inputs>({
    defaultValues: {},
    resolver:  handleForm(userData?.role),
  });

  const handleCidade = async (estado:string) => {

    const [
      cidades,
    ] = await Promise.all([
      await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.toLowerCase()}/municipios`, {
          method: "GET",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
      })
    
    ])

    let c = await cidades.json()

    let arr:string[] = []

    c.map((i:any) => arr.push(i.nome))


    //console.log({arr})

    setCidades(arr)
  }

  const handleCidades_Parceiros = async (estado:string) => {

    const [
      cidades,
      parceiros,
    ] = await Promise.all([
      handleCidade(estado),
      await fetch(`${api.baseApi}/auth/users/role/parceiro`, {
          method: "GET",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
      })
    
    ])

    let p =  await parceiros.json()

    let arr:string[] = []
    let arrParceiros:{id:string, nome:string}[] = []

    p.map((i:any) => arrParceiros.push(i))


    //console.log({arr})

    setParceiros(arrParceiros)
  }


 


  const estado = watch("estado")
  const cidade = watch("cidade")

 /*  const fetchData = async () => {
    setLoad(true)
    const response = await fetch(`${API.baseApi}/auth/${id}`);
    const u = await response.json();
    console.log({u})
  
    setUserData(u);
    await handleCidades_Parceiros(u.estado)
    setLoad(false)
  };

  */
  
  const fetchData = async () => { 
    setLoad(true);
    const response = await fetch(`${API.baseApi}/auth/${id}`);
    const u = await response.json();
    setUserData(u);
    await handleCidades_Parceiros(u.estado);
    reset({ 
      password: u.password,
      nome: u.nome,
      cpf: u.cpf,
      dataNascimento: u.dataNascimento,
      email: u.email,
      telefone: u.telefone, 
      plano: u.plano, 
      parceiro: u.parceiro,
      estado: u.estado,
      cidade: u.cidade,
    });
      setLoad(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (userData) {
      reset({
        password: userData?.password,
        nome: userData?.nome,
        cpf: userData?.cpf,
        dataNascimento: userData?.dataNascimento,
        email: userData?.email,
        telefone: userData?.telefone,
        plano: userData?.plano,
        parceiro: userData?.parceiro,
        estado: userData?.estado,
        cidade: userData?.cidade,
        
      });
    }
  }, [userData, reset]);

  useEffect(() => {
    if(estado) {
      handleCidade(estado)
    }
  }, [estado]);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    // console.log("Dados enviados:", data); // Verificar se os dados estão chegando
     setAlertStatusFail(false)
     setAlertStatusSuccess(false)
     setLoad(true);
     try {
       const result = await fetch(`${api.baseApi}/auth/${id}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ ...data, id: id.toString() }),
       }).then((response) => response.json());
       //console.log("Resposta do servidor:", result); // Verificar a resposta do servidor
       fetchData(); // Atualizar dados após o envio
       // Scroll para o topo da página
       window.scrollTo({ top: 0, behavior: 'smooth' });
     } catch (error) {
       //console.error("Erro ao enviar dados:", error); // Exibir erro no console
       setAlertStatusFail(true)
       setAlertText(`Erro ao enviar dados: ${error}`)
       // Scroll para o topo da página
       window.scrollTo({ top: 0, behavior: 'smooth' });
     } finally {
       setLoad(false);
       setAlertStatusSuccess(true)
       // Scroll para o topo da página
       window.scrollTo({ top: 0, behavior: 'smooth' });
     }
   };


 
  return (
    <main className="font-hogfish">
      <div className="max-w-sm mx-auto text-white px-1 py-6">
        <h1 className="text-center text-secondary">Editar</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Formulário enviado!");
            handleSubmit(processForm)(e);
          }}
        >

          {alertStatusSuccess &&
            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
              Dodos atualizados com sucesso.
            </div>
          
          }

          {alertStatusFail &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {alertText}
            </div>
          }

          <div className="mb-5">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
            <input defaultValue={userData?.nome || ""}  {...register("nome")} type="text" id="usuario" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Seu nome"  />
            {errors.nome?.message && (
              <div className="p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {errors.nome?.message}
              </div>
            )}
          </div>
          <div className="mb-5">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input defaultValue={userData?.email || ""}   {...register("email")}  type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com"  />
            {errors.email?.message && (
              <div className="p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {errors.email?.message}
              </div>
            )}
          </div>

            {/* Data de Nascimento */}
            <div className="mb-5">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data de Nascimento</label>
            <InputMask
              defaultValue={userData?.dataNascimento || ""}
              {...register("dataNascimento")}
              mask="99/99/9999"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="DD/MM/AAAA"
            />
            {errors.dataNascimento?.message && 
              <div className="p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {errors.dataNascimento?.message}
              </div>
            }
          </div>

          {/* CPF */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
            <InputMask
              defaultValue={userData?.cpf || ""}
              {...register("cpf")}
              mask="999.999.999-99"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="000.000.000-00"
            />
            {errors.cpf?.message && 
              <div className="p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {errors.cpf?.message}
              </div>
            }
          </div>

          {/* Telefone */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
            <InputMask
              defaultValue={userData?.telefone || ""}
              {...register("telefone")}
              mask="(99) 99999-9999"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="(00) 00000-0000"
            />
            {errors.telefone?.message && 
              <div className="p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {errors.telefone?.message}
              </div>
            }
          </div>
          
          {userData?.role === "admin" &&
             <div className="flex justify-between mb-5">
                <div className="w-[45%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                  <select   {...register("estado")}   id="estado" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {estados.map((i) =>  <option  key={i} value={`${i}`}>{i}</option> )}
                  </select>
                  
                </div>

                <div className="w-[45%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                  <select   {...register("cidade")}   id="cidade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {cidades.map((i) =>  <option  key={i} value={`${i}`}>{i}</option> )}
                  </select>
                  
                </div>
              </div>
          }

          {userData?.role === "parceiro"  &&
             <div className="flex justify-between mb-5">
                <div className="w-[45%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                  <select   {...register("estado")}   id="estado" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {estados.map((i) =>  <option  key={i} value={`${i}`}>{i}</option> )}
                  </select>
                  
                </div>

                <div className="w-[45%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                  <select   {...register("cidade")}   id="cidade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {cidades.map((i) =>  <option  key={i} value={`${i}`}>{i}</option> )}
                  </select>
                  
                </div>
              </div>
          }

          {userData?.role === "vendedor" &&
            <>
              <div className="flex justify-between mb-5">
                <div className="w-[45%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                  <select   {...register("estado")}   id="estado" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {estados.map((i) =>  <option  key={i} value={`${i}`}>{i}</option> )}
                  </select>
                  
                </div>

                <div className="w-[45%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                  <select   {...register("cidade")}   id="cidade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {cidades.map((i) =>  <option  key={i} value={`${i}`}>{i}</option> )}
                  </select>
                  
                </div>
              </div>

              {parceiros.length > 0 &&
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parceiro</label>
                  <select   {...register("parceiro")}   id="parceiro" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {parceiros.map((i) => {
                      return  <option  key={`${i.id}`} value={`${i.id}`}>{i.nome}</option>
                    })}
                  </select>
                </div>
              }

            </>
             
          }

           


          <div className="mb-5 relative">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>

            <div className="relative">
              <input
                defaultValue={userData?.password || ""}
                {...register("password")}
                type={!showPassword ? "password" : "text"}
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
              />

              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400"
              >
                  {!showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye-slash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                      <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                    </svg>
                  )}
              </div>
            </div>

            {errors.password?.message && (
              <div className="p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {errors.password.message}
              </div>
            )}
          </div>
          
          {userData?.role === "cliente" &&
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plano</label>
              <select   {...register("plano")}   id="planos" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {planos.map((i) =>  <option  key={i} value={`${i}`}>{i}</option> )}
              </select>
             
            </div>
          }
         

          {load &&
            <div className="flex justify-center items-center py-6" role="status">

                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-secondary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only text-secondary">Autenticando...</span>
            </div>
          }

          {!load &&
            <button type="submit" className="md:w-full text-white bg-secondary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-secondary dark:hover:bg-secondary dark:focus:ring-secondary">Salvar</button>
          }
          
        </form>
      </div>
    </main>
  );
}
