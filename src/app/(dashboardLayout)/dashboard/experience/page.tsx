import AddExperience from '@/components/AddExperience/AddExperience'
import { Button, Stack, Typography } from '@mui/material'
import React from 'react'

const Experience = () => {
    return (
        <div>
            <Stack className='flex items-center justify-between flex-row'>
                <Typography>Experience</Typography>
                
                <AddExperience/>
            </Stack>
        </div>
    )
}

export default Experience