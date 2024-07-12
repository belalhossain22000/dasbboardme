"use client"
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
import { useAddProjectMutation } from '@/redux/api/projectApi';

type Anchor = 'bottom';

// zod validation schema based on projectSchema
const validationSchema = z.object({
  projectName: z.string().nonempty("Project Name is required"),
  usedTechnologies: z.string().nonempty("Technologies used are required"),
  liveLink: z.string().url("Please enter a valid URL").nonempty("Live Link is required"),
  imageLink: z.string().url("Please enter a valid URL").nonempty("Live Link is required"),
  githubCodeLink: z.string().url("Please enter a valid URL").nonempty("GitHub Link is required"),
  description: z.string().nonempty("Description is required"),
});

const AddProject = () => {

  const [addProject,{isLoading}]=useAddProjectMutation()

  const [state, setState] = React.useState({
    bottom: false,
  });



  const handleAddProject = async (values: FieldValues) => {
    const res = await addProject(values).unwrap()
    if(res.success){
      alert('project added successfully')
    }else{
      alert("project not added")
    }

    console.log(values);
    // todo: handle add project
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
      sx={{ height: '90vh', padding: 2 }}
      role="presentation"
    >
      <h2>Add Project</h2>
      <Divider />
      <BForm
        onSubmit={handleAddProject}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          projectName: "",
          usedTechnologies: "",
          liveLink: "",
          githubCodeLink: "",
          description: "",
          imageLink: "",
        }}
      >
        <Grid container spacing={2} my={1}>
          <Grid item md={6}>
            <BInput
              name="projectName"
              label="Project Name"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={6}>
            <BInput
              name="usedTechnologies"
              label="Technologies Used"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={12}>
            <BInput
              name="imageLink"
              label="Image Link"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={12}>
            <BInput
              name="liveLink"
              label="Live Link"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={12}>
            <BInput
              name="githubCodeLink"
              label="GitHub Link"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={12}>
            <BInput
              name="description"
              label="Description"
              fullWidth={true}
              multiline
              rows={4}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          sx={{
            margin: "10px 0px",
            padding: "15px",
          }}
          fullWidth={true}
          type="submit"
        >
          {isLoading ? "Loading..." : "Add Project"}
        </Button>
      </BForm>
    </Box>
  );

  return (
    <div className='h-full'>
      {(['bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant='contained' onClick={toggleDrawer(anchor, true)}>{`Add Project`}</Button>
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

export default AddProject;
