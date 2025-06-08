import { useState } from 'react'
import { useForm, type SubmitHandler, Controller } from 'react-hook-form'
import {
  TextField,
  Button,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormHelperText,
} from '@mui/material'

type FormInputs = {
  isPessoaFisica: boolean
  nome?: string
  cpf?: string
  dataNascimento?: string
  sexo?: string
  estadoCivil?: string
  razaoSocial?: string
  nomeFantasia?: string
  cnpj?: string
  inscricaoEstadual?: string
  dataAbertura?: string
  email: string
  telefone?: string
  celular?: string
  enderecoRua?: string
  enderecoNumero?: string
  enderecoComplemento?: string
  enderecoBairro?: string
  enderecoCidade?: string
  enderecoEstado?: string
  enderecoCEP?: string
  aceitaTermos: boolean
}

export function Forms() {
  const [isPessoaFisica, setIsPessoaFisica] = useState(true)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      isPessoaFisica: true,
      aceitaTermos: false,
    },
  })

  const onSubmit: SubmitHandler<FormInputs> = data => {
    alert('Form enviado com sucesso!\n\n' + JSON.stringify(data, null, 2))
    reset()
  }

  // Para reatividade do checkbox aceitaTermos
  const aceitaTermos = watch('aceitaTermos')

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 700,
        mx: 'auto',
        mt: 5,
        p: 4,
        boxShadow: 4,
        borderRadius: 3,
        bgcolor: 'background.paper',
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" mb={4} textAlign="center">
        Cadastro de Pessoa Física / Jurídica
      </Typography>

      <FormControlLabel
        control={
          <Controller
            name="isPessoaFisica"
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                checked={field.value}
                onChange={e => {
                  field.onChange(e.target.checked)
                  setIsPessoaFisica(e.target.checked)
                }}
                color="primary"
              />
            )}
          />
        }
        label={isPessoaFisica ? 'Pessoa Física' : 'Pessoa Jurídica'}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        {/* Campos para Pessoa Física */}
        {isPessoaFisica ? (
          <>
            <Grid size={{ xs:12, sm:6 }}>
              <TextField
                label="Nome completo"
                fullWidth
                {...register('nome', { required: 'Nome é obrigatório' })}
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
            </Grid>

            <Grid size={{ xs:12, sm:6 }}>
              <TextField
                label="CPF"
                fullWidth
                {...register('cpf', {
                  required: 'CPF obrigatório',
                  pattern: {
                    value: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
                    message: 'CPF inválido',
                  },
                })}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                placeholder="000.000.000-00"
              />
            </Grid>

            <Grid size={{ xs:12, sm:6 }}>
              <TextField
                label="Data de nascimento"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('dataNascimento', { required: 'Data de nascimento é obrigatória' })}
                error={!!errors.dataNascimento}
                helperText={errors.dataNascimento?.message}
              />
            </Grid>

            <Grid size={{ xs:12, sm:3 }}>
              <FormControl fullWidth error={!!errors.sexo}>
                <InputLabel id="sexo-label">Sexo</InputLabel>
                <Controller
                  name="sexo"
                  control={control}
                  rules={{ required: 'Sexo é obrigatório' }}
                  render={({ field }) => (
                    <Select labelId="sexo-label" label="Sexo" {...field}>
                      <MenuItem value="masculino">Masculino</MenuItem>
                      <MenuItem value="feminino">Feminino</MenuItem>
                      <MenuItem value="outro">Outro</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors.sexo?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={{ xs:12, sm:3 }}>
              <FormControl fullWidth error={!!errors.estadoCivil}>
                <InputLabel id="estado-civil-label">Estado Civil</InputLabel>
                <Controller
                  name="estadoCivil"
                  control={control}
                  rules={{ required: 'Estado civil é obrigatório' }}
                  render={({ field }) => (
                    <Select labelId="estado-civil-label" label="Estado Civil" {...field}>
                      <MenuItem value="solteiro">Solteiro(a)</MenuItem>
                      <MenuItem value="casado">Casado(a)</MenuItem>
                      <MenuItem value="divorciado">Divorciado(a)</MenuItem>
                      <MenuItem value="viuvo">Viúvo(a)</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors.estadoCivil?.message}</FormHelperText>
              </FormControl>
            </Grid>
          </>
        ) : (
          // Campos para Pessoa Jurídica
          <>
            <Grid size={{ xs:12, sm:6 }}>
              <TextField
                label="Razão Social"
                fullWidth
                {...register('razaoSocial', { required: 'Razão social é obrigatória' })}
                error={!!errors.razaoSocial}
                helperText={errors.razaoSocial?.message}
              />
            </Grid>

            <Grid size={{ xs:12, sm:6 }}>
              <TextField
                label="Nome Fantasia"
                fullWidth
                {...register('nomeFantasia', { required: 'Nome fantasia é obrigatório' })}
                error={!!errors.nomeFantasia}
                helperText={errors.nomeFantasia?.message}
              />
            </Grid>

            <Grid size={{ xs:12, sm:6 }}>
              <TextField
                label="CNPJ"
                fullWidth
                {...register('cnpj', {
                  required: 'CNPJ obrigatório',
                  pattern: {
                    value: /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/,
                    message: 'CNPJ inválido',
                  },
                })}
                error={!!errors.cnpj}
                helperText={errors.cnpj?.message}
                placeholder="00.000.000/0000-00"
              />
            </Grid>

            <Grid size={{ xs:12, sm:6 }}>
              <TextField
                label="Inscrição Estadual"
                fullWidth
                {...register('inscricaoEstadual')}
                error={!!errors.inscricaoEstadual}
                helperText={errors.inscricaoEstadual?.message}
              />
            </Grid>

            <Grid size={{ xs:12, sm:6 }}>
              <TextField
                label="Data de abertura"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('dataAbertura', { required: 'Data de abertura é obrigatória' })}
                error={!!errors.dataAbertura}
                helperText={errors.dataAbertura?.message}
              />
            </Grid>
          </>
        )}

        {/* Campos comuns */}
        <Grid size={{ xs:12, sm:6 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Email inválido',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid size={{ xs:12, sm:3 }}>
          <TextField
            label="Telefone"
            fullWidth
            {...register('telefone', {
              pattern: {
                value: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
                message: 'Telefone inválido',
              },
            })}
            error={!!errors.telefone}
            helperText={errors.telefone?.message}
            placeholder="(00) 0000-0000"
          />
        </Grid>

        <Grid size={{ xs:12, sm:3 }}>
          <TextField
            label="Celular"
            fullWidth
            {...register('celular', {
              required: 'Celular é obrigatório',
              pattern: {
                value: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
                message: 'Celular inválido',
              },
            })}
            error={!!errors.celular}
            helperText={errors.celular?.message}
            placeholder="(00) 90000-0000"
          />
        </Grid>

        {/* Endereço */}
        <Grid size={{ xs:12, sm:8 }}>
          <TextField
            label="Rua"
            fullWidth
            {...register('enderecoRua', { required: 'Rua é obrigatória' })}
            error={!!errors.enderecoRua}
            helperText={errors.enderecoRua?.message}
          />
        </Grid>

        <Grid size={{ xs:12, sm:4 }}>
          <TextField
            label="Número"
            fullWidth
            {...register('enderecoNumero', { required: 'Número é obrigatório' })}
            error={!!errors.enderecoNumero}
            helperText={errors.enderecoNumero?.message}
          />
        </Grid>

        <Grid size={{ xs:12, sm:6 }}>
          <TextField
            label="Complemento"
            fullWidth
            {...register('enderecoComplemento')}
          />
        </Grid>

        <Grid size={{ xs:12, sm:6 }}>
          <TextField
            label="Bairro"
            fullWidth
            {...register('enderecoBairro', { required: 'Bairro é obrigatório' })}
            error={!!errors.enderecoBairro}
            helperText={errors.enderecoBairro?.message}
          />
        </Grid>

        <Grid size={{ xs:12, sm:6 }}>
          <TextField
            label="Cidade"
            fullWidth
            {...register('enderecoCidade', { required: 'Cidade é obrigatória' })}
            error={!!errors.enderecoCidade}
            helperText={errors.enderecoCidade?.message}
          />
        </Grid>

        <Grid size={{ xs:12, sm:3 }}>
          <FormControl fullWidth error={!!errors.enderecoEstado}>
            <InputLabel id="estado-label">Estado</InputLabel>
            <Controller
              name="enderecoEstado"
              control={control}
              rules={{ required: 'Estado é obrigatório' }}
              render={({ field }) => (
                <Select labelId="estado-label" label="Estado" {...field}>
                  {/* Lista resumida de estados */}
                  <MenuItem value="SP">São Paulo</MenuItem>
                  <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                  <MenuItem value="MG">Minas Gerais</MenuItem>
                  <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                  {/* Acrescente mais conforme precisar */}
                </Select>
              )}
            />
            <FormHelperText>{errors.enderecoEstado?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid size={{ xs:12, sm:3 }}>
          <TextField
            label="CEP"
            fullWidth
            {...register('enderecoCEP', {
              required: 'CEP é obrigatório',
              pattern: {
                value: /^\d{5}-?\d{3}$/,
                message: 'CEP inválido',
              },
            })}
            error={!!errors.enderecoCEP}
            helperText={errors.enderecoCEP?.message}
            placeholder="00000-000"
          />
        </Grid>

        {/* Checkbox aceitar termos */}
        <Grid size={12}>
          <FormControlLabel
            control={
              <Controller
                name="aceitaTermos"
                control={control}
                rules={{ required: 'Você deve aceitar os termos' }}
                render={({ field }) => <Checkbox {...field} checked={field.value} />}
              />
            }
            label="Aceito os termos e condições"
          />
          {errors.aceitaTermos && (
            <Typography variant="caption" color="error">
              {errors.aceitaTermos.message}
            </Typography>
          )}
        </Grid>

        {/* Botões */}
        <Grid size={12} display="flex" justifyContent="space-between" mt={3}>
          <Button variant="outlined" color="secondary" onClick={() => reset()}>
            Limpar
          </Button>
          <Button type="submit" variant="contained" disabled={!aceitaTermos}>
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
