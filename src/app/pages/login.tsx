import { useState } from 'react';
import { PrimaryButton, TextField } from '@fluentui/react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (event: any) => {
    event.preventDefault();

    // Add your authentication logic here.
    // call login API endpoint with the username and password.
     fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // If the login is successful, redirect the user to another page.
          router.push('/dashboard');
        } else {
          // If the login is not successful, display an error message.
          alert(data.message);
        }
      })
      .catch((error) => {
        // If there is an error with the request, display an error message.
        alert('An error occurred');
      }); 
   
  };

  return (
    <form onSubmit={handleLogin}>
      <TextField
        label="Username"
        value={username}
        onChange={(event, newValue) => setUsername(newValue || '')} // Add null check to handle undefined value
      />
      <TextField
        label="Password"
        type="password"
        canRevealPassword
        value={password}
        onChange={(event, newValue) => setPassword(newValue || '')} // Add null check to handle undefined value
      />
      <PrimaryButton type="submit">Log in</PrimaryButton>
    </form>
  );
};

export default LoginPage;
