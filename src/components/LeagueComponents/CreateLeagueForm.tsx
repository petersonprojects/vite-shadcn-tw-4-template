/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

// Define the form values interface
interface FormValues {
  description: string | undefined;
  city: string | undefined;
  sport: string | undefined;
  title: string | undefined;
  leagueType: string | undefined;
  isMixed: boolean | undefined;
  startRegistrationDate: Date | undefined;
  endRegistrationDate: Date | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const CreateLeagueForm: React.FC = () => {

  const { register, handleSubmit, formState: { errors }, control } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      description: '',
      city: '',
      sport: '',
      title: '',
      leagueType: '',
      isMixed: false,
      startRegistrationDate: new Date(),
      endRegistrationDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('description', { 
          required: 'Description is required', 
          maxLength: { value: 200, message: 'Description should not exceed 200 characters' }
        })}
        label="Description"
        margin="normal"
        fullWidth
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <TextField
        {...register('city', { 
          required: 'City is required',
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'City should only contain letters and spaces'
          }
        })}
        label="City"
        margin="normal"
        fullWidth
        error={!!errors.city}
        helperText={errors.city?.message}
      />

      <TextField
        {...register('sport', { 
          required: 'Sport is required',
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'Sport should only contain letters and spaces'
          }
        })}
        label="Sport"
        margin="normal"
        fullWidth
        error={!!errors.sport}
        helperText={errors.sport?.message}
      />

      <TextField
        {...register('title', { 
          required: 'Title is required', 
          maxLength: { value: 100, message: 'Title should not exceed 100 characters' }
        })}
        label="Title"
        margin="normal"
        fullWidth
        error={!!errors.title}
        helperText={errors.title?.message}
      />


      <FormControl fullWidth error={!!errors.leagueType}>
        <InputLabel id="leagueType">League Type</InputLabel>
        <Controller
          name="leagueType"
          control={control}
          render={({ field }: any) =>  <Select
            {...field}
            labelId="leagueType"
            id="selectLeagueType"
            label="League Type"
          >
            <MenuItem value="League A">League A</MenuItem>
            <MenuItem value="League B">League B</MenuItem>
            <MenuItem value="League C">League C</MenuItem>
          </Select>}
        />
        {errors.leagueType && <span>{errors.leagueType.message}</span>}
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            {...register('isMixed')}
          />
        }
        label="Is Mixed"
      />

      <TextField
        {...register('startRegistrationDate', { 
          required: 'Start Registration Date is required',
          validate: (value) => (value && !isNaN(new Date(value).getTime())) || 'Invalid date format'
        })}
        label="Start Registration Date"
        type="date"
        margin="normal"
        fullWidth
        InputLabelProps={{ shrink: true }}
        error={!!errors.startRegistrationDate}
        helperText={errors.startRegistrationDate?.message}
      />

      <TextField
        {...register('endRegistrationDate', { 
          required: 'End Registration Date is required',
          validate: (value) => (value && !isNaN(new Date(value).getTime())) || 'Invalid date format'
        })}
        label="End Registration Date"
        type="date"
        margin="normal"
        fullWidth
        InputLabelProps={{ shrink: true }}
        error={!!errors.endRegistrationDate}
        helperText={errors.endRegistrationDate?.message}
      />

      <TextField
        {...register('startDate', { 
          required: 'Start Date is required',
          validate: (value) => (value && !isNaN(new Date(value).getTime())) || 'Invalid date format'
        })}
        label="Start Date"
        type="date"
        margin="normal"
        fullWidth
        InputLabelProps={{ shrink: true }}
        error={!!errors.startDate}
        helperText={errors.startDate?.message}
      />

      <TextField
        {...register('endDate', { 
          required: 'End Date is required',
          validate: (value) => (value && !isNaN(new Date(value).getTime())) || 'Invalid date format'
        })}
        label="End Date"
        type="date"
        margin="normal"
        fullWidth
        InputLabelProps={{ shrink: true }}
        error={!!errors.endDate}
        helperText={errors.endDate?.message}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default CreateLeagueForm;

