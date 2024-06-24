import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useAuthState } from '../contexts/AuthContext';
import { TextField, Button, Typography, CircularProgress, Snackbar } from '@mui/material';

const Profile = () => {
  const { user } = useAuthState();
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); 
  const [profilePictureFile, setProfilePictureFile] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
       
        const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
          
        });
        const profileData = response.data; 
        setPhone(profileData.phone_number || '');
        
      } catch (error) {
        setError('Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const profileData = { phone_number: phone };

      
      await axios.put('http://127.0.0.1:8000/api/profile/', profileData, {
       
      });

      setSuccessMessage('Profile updated successfully.');
    } catch (error) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('profile_picture', profilePictureFile);

    
      await axios.post('http://127.0.0.1:8000/api/upload-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
         
        },
      });

      setSuccessMessage('Profile picture updated successfully.');
     
    } catch (error) {
      setError('Failed to upload profile picture.');
    } finally {
      setLoading(false);
      setProfilePictureFile(null); 
    }
  };

  const handleSnackbarClose = () => {
    setSuccessMessage(null);
    setError(null);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome, {user.username}
      </Typography>
      <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
        <TextField
          label="Phone Number"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ alignSelf: 'flex-start', width: '150px' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Update Profile'}
        </Button>
      </form>

   
      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept="image/*"
          id="profile-picture"
          onChange={handleProfilePictureChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="profile-picture">
          <Button
            variant="contained"
            component="span"
            color="secondary"
            disabled={loading}
            style={{ width: '150px' }}
          >
            Upload Picture
          </Button>
        </label>
        {profilePicture && (
          <div style={{ marginTop: '10px' }}>
            <img src={profilePicture} alt="Profile" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleProfilePictureUpload}
              disabled={loading}
              style={{ marginLeft: '10px' }}
            >
              Confirm Upload
            </Button>
          </div>
        )}
      </div>

    
      <Snackbar
        open={!!error || !!successMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={error || successMessage}
      />
    </div>
  );
};

export default Profile;
