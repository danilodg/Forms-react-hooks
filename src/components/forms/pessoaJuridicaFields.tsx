import { Grid, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export default function PessoaJuridicaFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <Grid size={{ xs:12, sm:6 }}>
        <TextField
          label="Razão Social"
          fullWidth
          {...register('razaoSocial', { required: 'Razão social é obrigatória' })}
          error={!!errors.razaoSocial}
          helperText={errors.razaoSocial?.message as string}
        />
      </Grid>

      <Grid size={{ xs:12, sm:6 }}>
        <TextField
          label="Nome Fantasia"
          fullWidth
          {...register('nomeFantasia', { required: 'Nome fantasia é obrigatório' })}
          error={!!errors.nomeFantasia}
          helperText={errors.nomeFantasia?.message as string}
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
            onChange: e => {
              e.target.value = e.target.value.replace(/[^0-9./-]/g, '')
            },
          })}
          error={!!errors.cnpj}
          helperText={errors.cnpj?.message as string}
          placeholder="00.000.000/0000-00"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
      </Grid>

      <Grid size={{ xs:12, sm:6 }}>
        <TextField
          label="Inscrição Estadual"
          fullWidth
          {...register('inscricaoEstadual')}
          error={!!errors.inscricaoEstadual}
          helperText={errors.inscricaoEstadual?.message as string}
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
          helperText={errors.dataAbertura?.message as string}
        />
      </Grid>
    </>
  )
}
