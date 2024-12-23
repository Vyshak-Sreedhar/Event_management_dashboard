import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store token in local storage
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 2000,
      });
      history.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred during login.',
        status: 'error',
        duration: 2000,
      });
    }
  };

  return (
    <Container maxW="lg" py={10}>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
        <Heading size="lg" mb={5}>Login</Heading>
        <form onSubmit={handleLogin}>
          <FormControl id="email" mb={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl id="password" mb={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" width="full">
            Login
          </Button>
        </form>
        <Text mt={4}>
          Don't have an account? <a href="/register">Sign Up</a>
        </Text>
      </Box>
    </Container>
  );
};

export default Auth;
