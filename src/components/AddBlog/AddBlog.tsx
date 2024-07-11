"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { FieldValues } from 'react-hook-form';
import BForm from '@/Form/BForm/BForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, TextField } from '@mui/material';
import BInput from '@/Form/BInput/BInput';
import { z } from 'zod';

type Anchor = 'bottom';

// zod validation schema
const validationSchema = z.object({
  title: z.string().nonempty("Title is required"),
  author: z.string().nonempty("Author name is required"),
  date: z.string().nonempty("Date is required"),
  content: z.string().nonempty("Content is required"),
});

const AddBlog = () => {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const isLoading = false;

  const handleAddBlog = async (values: FieldValues) => {
    console.log(values);
    // todo: handle add blog
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
      <h2>Add Blog</h2>
      <Divider />
      <BForm
        onSubmit={handleAddBlog}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          title: "",
          author: "",
          date: "",
          content: "",
        }}
      >
        <Grid container spacing={2} my={1}>
          <Grid item md={12}>
            <BInput
              name="title"
              label="Title"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={12}>
            <BInput
              name="author"
              label="Author"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              name="date"
              label="Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={12}>
            <BInput
              name="content"
              label="Content"
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
          }}
          fullWidth={true}
          type="submit"
        >
          {isLoading ? "Loading..." : "Add Blog"}
        </Button>
      </BForm>
    </Box>
  );

  return (
    <div className='h-full'>
      {(['bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant='contained' onClick={toggleDrawer(anchor, true)}>{`Add Blog`}</Button>
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

export default AddBlog;
