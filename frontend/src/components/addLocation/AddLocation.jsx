import React from 'react';
import {useForm} from '@mantine/form';
import {validateString} from '../../utils/common';
import { Button, Group, Select, TextInput } from '@mantine/core';
import useCountries from '../../hooks/useCountries';

const AddLocation = ({propertyDetails, setPropertyDetails, nextStep}) => {
  const form = useForm({
    initialValues:{
        country: propertyDetails?.country,
        city: propertyDetails?.city,
        address: propertyDetails?.address
    },
    validate:{
        country: (value)=>validateString(value),
        city: (value)=>validateString(value),
        address: (value)=>validateString(value),
    }
  });
  const handleSubmit = ()=>{
   const {hasErrors} = form.validate()
   if(!hasErrors){
    setPropertyDetails((prev)=>({
        ...prev, city, address,country
    }))
    nextStep();
   }
  }
  const {getAll} =  useCountries();
  const {country, city, address} = form.values;
  return (
    <form onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit()
    }}>
        <div className='flexCenter' style={{
            marginTop: "4rem",
            gap: "2rem"
        }}>
            <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {
                ...form.getInputProps("country", {type: "input"})
            }/>
            <TextInput
             w={"100%"}
             withAsterisk
             label="City"
             {
                ...form.getInputProps("city", {type: "input"})
            }/>
            <TextInput
             w={"100%"}
             withAsterisk
             label="Address"
             {
                ...form.getInputProps("address", {type: "input"})
            }/>
        </div>
        <Group justify="center" mt={"xl"} >
            <Button type='submit'>Next Step</Button>
        </Group>
    </form>
  )
}

export default AddLocation;
