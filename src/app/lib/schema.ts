import {z} from "zod";

export interface UserType {
    id: number,
    username: string,
    password: string,
    role: string,
    nome: string,
    cpf: string,
    dataNascimento: string,
    email: string,
    telefone: string,
    estado: string,
    cidade: string,
    regra: string,
    plano: string,
    planoStart: string | null,
    planoFinish: string | null,
    status: string | null,
    statusVenda: string,
    parceiro: string,
    createdAt: string,
    updatedAt: string,
    pdvs: []
  } 

  export interface CidadeType {
    id: number,
    nome: string,
  }

export const FormDataEditSchema = z.object({
    nome: z.string().nonempty("Nome é obrigatorio"),
    email: z.string().nonempty("Email é obrigatorio"),
    password: z.string().nonempty("Senha é obrigatorio").min(6, {message: "Senha deve conter no minimo 6 caracteres"}),
    cpf: z.string().nonempty("CPF é obrigatorio").min(14, {message: "Deve conter 14 caracteres"}),
    dataNascimento: z.string().nonempty("Data Nascimento é obrigatorio").min(10, {message: "Deve conter 10 caracteres"}),
    telefone: z.string().nonempty("Telefone é obrigatorio").min(15, {message: "Deve conter 15 caracteres"}),
    plano: z.string().nonempty("Plano é obrigatorio"),
})

export const FormDataVendedorEditSchema = z.object({
    nome: z.string().nonempty("Nome é obrigatorio"),
    email: z.string().nonempty("Email é obrigatorio"),
    password: z.string().nonempty("Senha é obrigatorio").min(6, {message: "Senha deve conter no minimo 6 caracteres"}),
    cpf: z.string().nonempty("CPF é obrigatorio").min(14, {message: "Deve conter 14 caracteres"}),
    dataNascimento: z.string().nonempty("Data Nascimento é obrigatorio").min(10, {message: "Deve conter 10 caracteres"}),
    telefone: z.string().nonempty("Telefone é obrigatorio").min(15, {message: "Deve conter 15 caracteres"}),
    estado: z.string(),
    cidade: z.string(),
    parceiro: z.string(),
})


export const FormDataAdminParceiroEditSchema = z.object({
    nome: z.string().nonempty("Nome é obrigatorio"),
    email: z.string().nonempty("Email é obrigatorio"),
    password: z.string().nonempty("Senha é obrigatorio").min(6, {message: "Senha deve conter no minimo 6 caracteres"}),
    cpf: z.string().nonempty("CPF é obrigatorio").min(14, {message: "Deve conter 14 caracteres"}),
    dataNascimento: z.string().nonempty("Data Nascimento é obrigatorio").min(10, {message: "Deve conter 10 caracteres"}),
    telefone: z.string().nonempty("Telefone é obrigatorio").min(15, {message: "Deve conter 15 caracteres"}),
    estado: z.string(),
    cidade: z.string(),
})




export const FormDataLoginSchema = z.object({
    email: z.string().nonempty("Nome é obrigatorio"),
    password: z.string().nonempty("Senha é obrigatorio"),
})