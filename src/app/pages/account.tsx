import { useState, useEffect } from 'react';
import { TextField, PrimaryButton } from '@fluentui/react';
import { useSession } from 'next-auth/react'; // For session management
import { useRouter } from 'next/router'; // For redirection

const AccountPage = () => {
  const { data: session } = useSession({ required: true }); // Get the user's session
  const [user, setUser] = useState({ id: '', name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch the user's account information from the API
    const fetchUser = async () => {
      if (session && session.user) {
        const res = await fetch(`/api/user/${session.user.email}`);//cant recall how to resolve id check again later
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          // Handle error
          console.error('Error updating user account:', res.status);
        }
      }
    };

    fetchUser();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleUpdate = async () => {
    // Handle user update logic here
        // Update the user's account information via the API
        const res = await fetch(`/api/user/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              // Include other fields that need to be updated
            }),
          });
      
          if (res.ok) {
            // Redirect to a success page or show a success message

            router.push('/success');
          } else {
            // Handle error
            console.error('Error updating user account:', res.status);
          }
  };

  return (
    <div>
      <TextField
        label="Name"
        value={user.name}
        onChange={(e, newValue) => setUser({ ...user, name: newValue ?? '' })}
      />
      <TextField
        label="Email"
        value={user.email}
        onChange={(e, newValue) => setUser({ ...user, email: newValue ?? '' })}
      />
      {/* Add other fields as necessary */}
      <PrimaryButton text="Update" onClick={handleUpdate} />
    </div>
  );
};

export default AccountPage;