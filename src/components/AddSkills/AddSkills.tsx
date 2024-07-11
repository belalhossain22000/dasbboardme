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

type Anchor = 'bottom';

// zod validation schema
const validationSchema = z.object({
  skillName: z.string().nonempty("Skill Name is required"),
  proficiency: z.string().nonempty("Proficiency level is required"),
});

const AddSkill = () => {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const isLoading = false;

  const handleAddSkill = async (values: FieldValues) => {
    console.log(values);
    // todo: handle add skill
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
        }}
      >
        <Grid container spacing={2} my={1}>
          <Grid item md={12}>
            <BInput
              name="skillName"
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
