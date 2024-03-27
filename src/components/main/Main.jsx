import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Typography } from '@mui/material';
import Atomo from '../atomo/atomo';
import style from '../main/main.css';

const Main = ({ userData }) => {
  
  const navigate = useNavigate();

  const handleNavigateToForm = () => {
        navigate('/form');
};


  return (
    <>
    <Header userData={userData} />
    <main className='main-form'>
        <Box
        display='flex'
        justifyContent='center'
        flexDirection='column'
        height={200}
        width='auto'
        gap={2}
        >
        <Typography
        variant='h1'
        component='h1'
        color='grey'
        >
        Hola {userData && userData.given_name}!
        </Typography>
        <Typography
        variant='h3'
        component='h3'
        color='grey'
        >
        {userData && userData.email}
        </Typography>
        <Button
        variant='contained'
        color='secondary'
        size='small'
        fullWidth={false}
        endIcon={<SendIcon />}
        onClick={handleNavigateToForm}
        >
        Completar Form</Button>
        </Box>
        <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height={200}
        width='auto'>
        <Atomo />
        </Box>
    </main>
    </>
    )
}

export default Main