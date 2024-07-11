"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { FieldValues } from 'react-hook-form';
import BForm from '@/Form/BForm/BForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Typography } from '@mui/material';
import BInput from '@/Form/BInput/BInput';
import { z } from 'zod';

type Anchor = 'bottom';

// zod validation schema
const validationSchema = z.object({
    title: z.string().nonempty("Title is required"),
    company: z.string().nonempty("Company is required"),
    location: z.string().nonempty("Location is required"),
    startDate: z.string().nonempty("Start date is required"),
    endDate: z.string().nonempty("End date is required"),
    description: z.string().nonempty("Description is required"),
});

const AddExperience = () => {
    const [state, setState] = React.useState({
        bottom: false,
    });

    const isLoading = false;
    const handleAddExperience = async (values: FieldValues) => {
        console.log(values)
        // todo: handle add experience
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
            sx={{ height: '70vh', padding: 15  }}
            role="presentation"
        >
            <h2 className='text-center font-bold  pb-5 text-4xl'>Add Experience</h2>
            <Divider />
            <BForm
                onSubmit={handleAddExperience}
                resolver={zodResolver(validationSchema)}
                defaultValues={{
                    title: "",
                    company: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                }}
            >
                <Grid container spacing={4} my={1}>
                    <Grid item md={6}>
                        <BInput
                            name="title"
                            label="Title"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <BInput
                            name="company"
                            label="Company"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <BInput
                            name="location"
                            label="Location"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <BInput
                            name="startDate"
                            label="Start Date"
                            type="date"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <BInput
                            name="endDate"
                            label="End Date"
                            type="date"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <BInput
                            name="description"
                            label="Description"
                            
                           fullWidth={true}
                            type="text"
                        />
                    </Grid>
                </Grid>

                <Button
                className='bg-orange-600 hover:bg-orange-500'
                    variant="contained"
                    size='medium'
                    sx={{
                        margin: "10px 0px",
                        padding: "15px",
                    
                    }}
                    fullWidth={true}
                    type="submit"
                >
                    {isLoading ? "Loading..." : "Add Experience"}
                </Button>
            </BForm>
        </Box>
    );

    return (
        <div className='h-full'>
            {(['bottom'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button variant='contained' onClick={toggleDrawer(anchor, true)}>{`Add Experience`}</Button>
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

export default AddExperience;
