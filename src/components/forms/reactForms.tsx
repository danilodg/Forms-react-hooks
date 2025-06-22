import React, { useState } from 'react'
import {
  useForm,
  type SubmitHandler,
  FormProvider,
  Controller,
} from 'react-hook-form'
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
import PessoaFisicaFields from './pessoaFisicaFields'
import PessoaJuridicaFields from './pessoaJuridicaFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from '../schemas/formSchema'
import { z } from 'zod'

export function Forms() {
  const [isPessoaFisica, setIsPessoaFisica] = useState(true)

  type FormInputs = z.infer<typeof formSchema>

  const methods = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isPessoaFisica: true,
      aceitaTermos: undefined,
      sexo: '',
      estadoCivil: '',
      enderecoEstado: '',
    }
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    register,
  } = methods

  const aceitaTermos = watch('aceitaTermos')

  // Função para permitir só números e algumas teclas úteis (backspace, setas, etc)
  function handleOnlyNumberKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Home',
      'End',
      '-', // para CEP com hífen, se desejar manter
    ]
    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault()
    }
  }

  const onSubmit: SubmitHandler<FormInputs> = data => {
    alert('Form enviado com sucesso!\n\n' + JSON.stringify(data, null, 2))
    reset()
  }

  return (
    <FormProvider {...methods}>
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
          {isPessoaFisica ? <PessoaFisicaFields /> : <PessoaJuridicaFields />}

          {/* Campos comuns */}

          <Grid size={{ xs: 12, sm: 6 }}>
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

          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              label="Telefone"
              fullWidth
              {...register('telefone')}
              error={!!errors.telefone}
              helperText={errors.telefone?.message}
              onKeyDown={handleOnlyNumberKeyDown}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              label="Celular"
              fullWidth
              {...register('celular', { required: 'Celular é obrigatório' })}
              error={!!errors.celular}
              helperText={errors.celular?.message}
              onKeyDown={handleOnlyNumberKeyDown}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 8 }}>
            <TextField
              label="Rua"
              fullWidth
              {...register('enderecoRua', { required: 'Rua é obrigatória' })}
              error={!!errors.enderecoRua}
              helperText={errors.enderecoRua?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Número"
              fullWidth
              {...register('enderecoNumero', {
                required: 'Número é obrigatório',
              })}
              error={!!errors.enderecoNumero}
              helperText={errors.enderecoNumero?.message}
              inputProps={{ inputMode: 'numeric' }}
              onKeyDown={handleOnlyNumberKeyDown}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Complemento"
              fullWidth
              {...register('enderecoComplemento')}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Bairro"
              fullWidth
              {...register('enderecoBairro', {
                required: 'Bairro é obrigatório',
              })}
              error={!!errors.enderecoBairro}
              helperText={errors.enderecoBairro?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Cidade"
              fullWidth
              {...register('enderecoCidade', {
                required: 'Cidade é obrigatória',
              })}
              error={!!errors.enderecoCidade}
              helperText={errors.enderecoCidade?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <FormControl fullWidth error={!!errors.enderecoEstado}>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Controller
                name="enderecoEstado"
                control={control}
                rules={{ required: 'Estado é obrigatório' }}
                render={({ field }) => (
                  <Select labelId="estado-label" label="Estado" {...field}>
                    <MenuItem value="SP">São Paulo</MenuItem>
                    <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                    <MenuItem value="MG">Minas Gerais</MenuItem>
                    <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>{errors.enderecoEstado?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              label="CEP"
              fullWidth
              placeholder="00000-000"
              {...register('enderecoCEP', {
                required: 'CEP é obrigatório',
                pattern: {
                  value: /^\d{5}-\d{3}$/,
                  message: 'CEP inválido',
                },
              })}
              error={!!errors.enderecoCEP}
              helperText={errors.enderecoCEP?.message}
              onKeyDown={handleOnlyNumberKeyDown}
            />
          </Grid>

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
    </FormProvider>
  )
}
