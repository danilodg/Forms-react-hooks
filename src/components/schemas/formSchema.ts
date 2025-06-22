// schemas/formSchema.ts
import { z } from 'zod'

// Remove tudo que não for dígito
function cleanNumber(value: string) {
  return value.replace(/\D/g, '')
}

// Validação CPF
function validarCPF(cpf: string) {
  cpf = cleanNumber(cpf)
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false
  let soma = 0
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i)
  let resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.charAt(9))) return false
  soma = 0
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i)
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  return resto === parseInt(cpf.charAt(10))
}

// Validação CNPJ
function validarCNPJ(cnpj: string) {
  cnpj = cleanNumber(cnpj)
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false
  let t = cnpj.length - 2
  let d = cnpj.substring(t)
  let d1 = parseInt(d.charAt(0))
  let d2 = parseInt(d.charAt(1))
  let calc = (x: number) => {
    let n = cnpj.substring(0, x)
    let y = x - 7
    let s = 0
    let r = 0
    for (let i = x; i >= 1; i--) {
      s += parseInt(n.charAt(x - i)) * y--
      if (y < 2) y = 9
    }
    r = 11 - (s % 11)
    return r > 9 ? 0 : r
  }
  return calc(t) === d1 && calc(t + 1) === d2
}

export const formSchema = z.object({
  isPessoaFisica: z.boolean(),

  // Pessoa Física
  nome: z.string().optional(),
  cpf: z
    .string()
    .optional()
    .transform(val => val ? cleanNumber(val) : val)
    .refine(val => !val || validarCPF(val), { message: 'CPF inválido' }),

  dataNascimento: z.string().optional(),
  sexo: z.string().optional(),
  estadoCivil: z.string().optional(),

  // Pessoa Jurídica
  razaoSocial: z.string().optional(),
  nomeFantasia: z.string().optional(),
  cnpj: z
    .string()
    .optional()
    .transform(val => val ? cleanNumber(val) : val)
    .refine(val => !val || validarCNPJ(val), { message: 'CNPJ inválido' }),

  inscricaoEstadual: z.string().optional(),
  dataAbertura: z.string().optional(),

  // Contato
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),

  telefone: z
    .string()
    .optional()
    .transform(val => val ? cleanNumber(val) : val)
    .refine(
      val => !val || /^\d{10,11}$/.test(val),
      { message: 'Telefone inválido' }
    ),

  celular: z
    .string()
    .min(1, 'Celular é obrigatório')
    .transform(val => cleanNumber(val))
    .refine(val => /^\d{10,11}$/.test(val), { message: 'Celular inválido' }),

  // Endereço
  enderecoRua: z.string().min(1, 'Rua é obrigatória'),
  enderecoNumero: z.string().min(1, 'Número é obrigatório'),
  enderecoComplemento: z.string().optional(),
  enderecoBairro: z.string().min(1, 'Bairro é obrigatório'),
  enderecoCidade: z.string().min(1, 'Cidade é obrigatória'),
  enderecoEstado: z.string().min(1, 'Estado é obrigatório'),
  enderecoCEP: z
    .string()
    .min(1, 'CEP é obrigatório')
    .regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),

  // Termos
  aceitaTermos: z.boolean().refine(val => val === true, {
    message: 'Você deve aceitar os termos',
  }),
})
