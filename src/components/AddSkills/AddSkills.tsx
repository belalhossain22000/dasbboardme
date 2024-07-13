"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { FieldValues } from 'react-hook-form';
import BForm from '@/Form/BForm/BForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid } from '@mui/material';
import BInput from '@/Form/BInput/BInput';
import { z } from 'zod';
import { useAddSkillMutation } from '@/redux/api/skillsApi';

type Anchor = 'bottom';

// zod validation schema
const validationSchema = z.object({
  name: z.string().nonempty("Skill Name is required"),
  proficiency: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert'], {
    required_error: "Proficiency level is required"
  }),
  category: z.string().nonempty("Category is required"),
  experienceYears: z.string().min(0, "Experience years must be at least 0")
});

const AddSkill = () => {

  const [addSkill,{isLoading}]=useAddSkillMutation()
  const [state, setState] = React.useState({
    bottom: false,
  });

 

  const handleAddSkill = async (values: FieldValues) => {
    console.log(values);
   const res= await addSkill(values).unwrap()
   if(res.success){
    alert('skill added successfully')
   }
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const form = (anchor: Anchor) => (
    <Box
      component="div"
      sx={{ height: '60vh', padding: 2 }}
      role="presentation"
    >
      <h2>Add Skill</h2>
      <Divider />
      <BForm
        onSubmit={handleAddSkill}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          skillName: "",
          proficiency: "",
          category: "",
          experienceYears: 0,
        }}
      >
        <Grid container spacing={2} my={1}>
          <Grid item md={12}>
            <BInput
              name="name"
              label="Skill Name"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={12}>
            <BInput
              name="proficiency"
              label="Proficiency Level"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={12}>
            <BInput
              name="category"
              label="Category"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={12}>
            <BInput
              name="experienceYears"
              label="Experience Years"
              type="number"
              fullWidth={true}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          sx={{
            margin: "10px 0px",
          }}
          fullWidth={true}
          type="submit"
        >
          {isLoading ? "Loading..." : "Add Skill"}
        </Button>
      </BForm>
    </Box>
  );

  return (
    <div className='h-full'>
      {(['bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant='contained' onClick={toggleDrawer(anchor, true)}>{`Add Skill`}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {form(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default AddSkill;
