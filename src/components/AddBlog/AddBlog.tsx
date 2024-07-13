"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, TextField } from '@mui/material';
import { z } from 'zod';
import { useAddBlogMutation } from '@/redux/api/blogApi';

type Anchor = 'bottom';

// zod validation schema
const validationSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  content: z.string().nonempty("Content is required"),
  date: z.string().nonempty("Date is required"),
  imageLink: z.string().nonempty("Image Link is required"),
  category: z.string().nonempty("Category is required"),
  readingTime: z.string().nonempty("Reading Time is required"),
});

const AddBlog = () => {

  const [addBlog, { isLoading }] = useAddBlogMutation()
  const [state, setState] = React.useState({
    bottom: false,
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      date: "",
      imageLink: "",
      category: "",
      readingTime: "",
    }
  });



  const handleAddBlog = async (values: FieldValues) => {
    console.log(values);
    const res = await addBlog(values).unwrap();
    if (res?.success) {
      alert("Blog added successfully")
    } else {
      alert("Blog not created")
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
      sx={{ height: '90vh', padding: 2 }}
      role="presentation"
    >
      <h2>Add Blog</h2>
      <Divider />
      <form onSubmit={handleSubmit(handleAddBlog)}>
        <Grid container spacing={2} my={1}>
          <Grid item md={12}>
            <TextField
              {...register("title")}
              label="Title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ""}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              {...register("description")}
              label="Description"
              fullWidth
              multiline
              rows={2}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              {...register("date")}
              label="Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.date}
              helperText={errors.date ? errors.date.message : ""}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              {...register("content")}
              label="Content"
              fullWidth
              multiline
              rows={4}
              error={!!errors.content}
              helperText={errors.content ? errors.content.message : ""}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              {...register("imageLink")}
              label="Image Link"
              fullWidth
              error={!!errors.imageLink}
              helperText={errors.imageLink ? errors.imageLink.message : ""}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              {...register("category")}
              label="Category"
              fullWidth
              error={!!errors.category}
              helperText={errors.category ? errors.category.message : ""}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              {...register("readingTime")}
              label="Reading Time"
              fullWidth
              error={!!errors.readingTime}
              helperText={errors.readingTime ? errors.readingTime.message : ""}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          sx={{
            margin: "10px 0px",
          }}
          fullWidth
          type="submit"
        >
          {isLoading ? "Loading..." : "Add Blog"}
        </Button>
      </form>
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
