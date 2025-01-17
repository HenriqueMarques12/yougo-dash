"use client";

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';


import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { FormDataLoginSchema } from '@/app/lib/schema';
import api from '@/service/api';

type Inputs = z.infer<typeof FormDataLoginSchema>


export default function Login() {
  const [data, setData] = useState<Inputs>()
  const [showPassword, setShowPassword] = useState<Boolean>()
  const [load, setLoad] = useState<Boolean>()
  const [alertStatus, setAlertStatus] = useState<Boolean>()
  const [alertText, setAlertText] = useState<String>()
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors}
  } = useForm<Inputs>({
     resolver: zodResolver(FormDataLoginSchema)  
  })

/*   const processForm: SubmitHandler<Inputs> = async data => {
    setLoad(true)
    let obj = data

    const rawResponse = await fetch(`${api.baseApi}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    
    const content = await rawResponse.json();
    console.log({ content });
    
    // Verificar se content é um objeto e possui a propriedade id
    if (content && typeof content === 'object' && 'user' in content && 'id' in content.user) {
      console.log('content.user é um objeto e possui a propriedade id:');
      setData(content.user);
      setLoad(false);
    } else {
      console.log('Content não é válido.');
      setLoad(false);
      return
    }
  }
 */

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setAlertStatus(false);
    setLoad(true);
    let obj = data;
  
    try {
      const rawResponse = await fetch(`${api.baseApi}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
  
      const content = await rawResponse.json();
     // console.log({ content });
  
      // Verificar se content é válido e possui o ID do usuário
      if (content && typeof content === 'object' && 'user' in content && 'id' in content.user) {
        //console.log('Usuário autenticado com ID:', content.user.id);
        setData(content.user);

        if(content.user.role === 'vendedor') {
          setAlertText("Ops, Credencial invalida.")
          setAlertStatus(true)
          setLoad(false);
          return
        }

        // Salvar o ID do usuário no localStorage
        localStorage.setItem('userId', content.user.id);
        localStorage.setItem('userRole', content.user.role);

        // Redirecionar para a página de painel
        router.push('/painel');
  
        setLoad(false);
      } else {
        //console.log('Dados inválidos retornados do login.');
        setAlertText("Ops, Dados inválidos.")
        setAlertStatus(true)
        setLoad(false);
        return;
      }
    } catch (error) {
      //console.error('Erro ao processar o login:', error);
      setAlertText(`Erro ao processar o login: ${error}`)
      setAlertStatus(true)
      setLoad(false);
    }
  };

  useEffect(()=>{
    const u =  localStorage.getItem('userId');
    if(u!="" && u != null && u != undefined) {
      router.push("/painel")
    } else {
      return;
    }
  },[])
  
 
  return (
    <main className="font-hogfish">
      <div className="max-w-sm mx-auto text-white px-1 py-6">
        <h1 className="text-center text-secondary">Login</h1>
        <form className="" onSubmit={handleSubmit(processForm)}>
          {alertStatus &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {alertText}
            </div>
          }
          <div className="mb-5">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input {...register("email")} type="email" id="usuario" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
            {errors.email?.message && (
              <p className='text-sm text-red-460'>{errors.email.message}</p>
            )}
          </div>
         
          <div className="mb-5 relative">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>

            <div className="relative">
              <input
                {...register("password")}
                type={!showPassword ? "password" : "text"}
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />

              <button
                type="button"
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
              </button>
            </div>

            {errors.password?.message && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          
          {load &&
            <div className="flex justify-center items-center py-6" role="status">

                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-secondary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Autenticando...</span>
            </div>
          }

          {!load &&
            <button type="submit" className="md:w-full text-white bg-secondary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-secondary dark:hover:bg-secondary dark:focus:ring-secondary">ENTRAR</button>
          }
          
        </form>
      </div>
    </main>
  );
}
