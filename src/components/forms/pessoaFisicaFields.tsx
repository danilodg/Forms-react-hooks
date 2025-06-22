import React from 'react'
import { Grid, TextField, FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

// Componente para máscara com IMask integrado ao TextField do MUI
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props: any, ref: any) {
  const { onChange, mask, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask={mask}
      unmask={false}
      inputRef={ref}
      onAccept={(value: any) => onChange(value)}
      overwrite
    />
  )
})

export default function PessoaFisicaFields() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Nome completo"
          fullWidth
          {...register('nome', { required: 'Nome é obrigatório' })}
          error={!!errors.nome}
          helperText={errors.nome?.message as string}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="cpf"
          control={control}
          rules={{ required: 'CPF obrigatório' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="CPF"
              fullWidth
              error={!!errors.cpf}
              helperText={errors.cpf?.message as string}
              InputProps={{
                inputComponent: TextMaskCustom as any,
                inputProps: { mask: '000.000.000-00' },
              }}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Data de nascimento"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          {...register('dataNascimento', { required: 'Data de nascimento é obrigatória' })}
          error={!!errors.dataNascimento}
          helperText={errors.dataNascimento?.message as string}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
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
          <FormHelperText>{errors.sexo?.message as string}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
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
          <FormHelperText>{errors.estadoCivil?.message as string}</FormHelperText>
        </FormControl>
      </Grid>
    </>
  )
}
