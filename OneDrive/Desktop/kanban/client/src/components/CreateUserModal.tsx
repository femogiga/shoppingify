import React, { useState } from 'react';
import useModalStore from '../statemanagment/modalStore';
import { useCreateUserMutation } from '../apis/userData';
import { useDarkMode } from '../context/DarkModeContext';

const CreateUserModal = () => {
  const {mode} = useDarkMode()
  const { hideCreateUserModal } = useModalStore();
  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    repeatpassword: '',
  };
  const [user, setUser] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const { createUserMutation, isCreating } = useCreateUserMutation();

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setMessage('File size should be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setMessage('');

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === 'string') {
        setPreviewUrl(reader.result);
      }
      else {
        setPreviewUrl(null)
      }

    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setMessage('');
  };

  const handleCreateNewUser = async (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validation
    if (!user.firstname || !user.lastname || !user.email || !user.password) {
      setMessage('Please fill in all required fields');
      return;
    }

    if (user.password !== user.repeatpassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (user.password.length < 4) {
      setMessage('Password must be at least 4 characters');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('firstname', user.firstname);
      formData.append('lastname', user.lastname);
      formData.append('email', user.email);
      formData.append('password', user.password);

      if (selectedFile) {
        formData.append('photo', selectedFile);
      }

      createUserMutation(formData, {
        onSuccess: () => {
          console.log('User successfully created');
          setUser(initialState);
          setSelectedFile(null);
          setPreviewUrl('');
          hideCreateUserModal();
        },
        onError: (error) => {
          console.error('Error creating user:', error);
          setMessage(error.message || 'Failed to create user');
        },
      });
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while creating user');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUser(initialState);
    setSelectedFile(null);
    setPreviewUrl('');
    setMessage('');
    hideCreateUserModal();
  };



  return (
    <article
      className={`sub-task-modal ${
        mode === 'light' ? 'bg-white font-black' : 'bg-dark'
      }`}>
      <div className='grid gap-y-1 p-y-2 p-x-2'>
        <form>
          <p className='mbe-1 bold'>Add User to Board</p>

          {message && (
            <div
              className='mbe-1 p-y-05 p-x-1'
              style={{
                backgroundColor: '#ffebee',
                color: '#c62828',
                borderRadius: '0.5rem',
                border: '1px solid #ffcdd2',
              }}>
              {message}
            </div>
          )}

          <fieldset className='grid mbe-1' style={{ rowGap: '0.5rem' }}>
            <input
              type='email'
              placeholder='Email'
              style={{
                display: 'block',
                width: '100%',
                paddingInline: '0.4rem',
              }}
              className={`p-y-05 ${
                mode === 'light' ? 'bg-blue-sm' : 'bg-darker '
              }`}
              value={user.email}
              name='email'
              onChange={handleInputChange}
              required
              disabled={uploading}
            />
            <input
              type='text'
              placeholder='First Name'
              style={{
                display: 'block',
                width: '100%',
                paddingInline: '0.4rem',
              }}
              className={`p-y-05 ${
                mode === 'light' ? 'bg-blue-sm' : 'bg-darker '
              }`}
              value={user.firstname}
              name='firstname'
              onChange={handleInputChange}
              required
              disabled={uploading}
            />
            <input
              type='text'
              placeholder='Last Name'
              style={{
                display: 'block',
                width: '100%',
                paddingInline: '0.4rem',
              }}
              className={`p-y-05 ${
                mode === 'light' ? 'bg-blue-sm' : 'bg-darker '
              }`}
              value={user.lastname}
              name='lastname'
              onChange={handleInputChange}
              required
              disabled={uploading}
            />
            <input
              type='password'
              placeholder='Password'
              style={{
                display: 'block',
                width: '100%',
                paddingInline: '0.4rem',
              }}
              className={`p-y-05 ${
                mode === 'light' ? 'bg-blue-sm' : 'bg-darker '
              }`}
              value={user.password}
              name='password'
              onChange={handleInputChange}
              required
              disabled={uploading}
            />
            <input
              type='password'
              placeholder='Repeat Password'
              style={{
                display: 'block',
                width: '100%',
                paddingInline: '0.4rem',
              }}
              className={`p-y-05 ${
                mode === 'light' ? 'bg-blue-sm' : 'bg-darker '
              }`}
              value={user.repeatpassword}
              name='repeatpassword'
              onChange={handleInputChange}
              required
              disabled={uploading}
            />

            {/* File Upload Section */}
            <div className='mbe-1'>
              <label className='block mbe-05'>Profile Photo</label>

              <input
                type='file'
                id='photo-upload'
                accept='image/*'
                onChange={handleFileSelect}
                disabled={uploading}
                style={{ display: 'none' }}
              />

              <label
                htmlFor='photo-upload'
                className='p-y-05 p-x-1'
                style={{
                  display: 'inline-block',
                  border: '2px dashed #ccc',
                  borderRadius: '0.5rem',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  backgroundColor: uploading ? '#f5f5f5' : 'transparent',
                  textAlign: 'center',
                  width: '100%',
                  opacity: uploading ? 0.6 : 1,
                }}>
                {uploading
                  ? 'Uploading...'
                  : previewUrl
                  ? 'Change Photo'
                  : '📷 Upload Profile Photo'}
              </label>

              {/* Image Preview */}
              {previewUrl && (
                <div
                  className='mts-1'
                  style={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={previewUrl}
                    alt='Profile preview'
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #e0e0e0',
                    }}
                  />
                  <button
                    type='button'
                    onClick={removeImage}
                    disabled={uploading}
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-5px',
                      background: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      cursor: uploading ? 'not-allowed' : 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: uploading ? 0.5 : 1,
                    }}>
                    ×
                  </button>
                </div>
              )}
            </div>
          </fieldset>

          <div className='flex justify-between'>
            <button
              type='button'
              onClick={handleCreateNewUser}
              disabled={uploading || isCreating}
              className='p-y-05 p-x-05'
              style={{
                width: '46%',
                borderRadius: '1rem',
                backgroundColor: uploading || isCreating ? '#ccc' : '#077443ff',
                border: 'none',
                outline: 'none',
                color: '#ffff',
                cursor: uploading || isCreating ? 'not-allowed' : 'pointer',
              }}>
              {uploading
                ? 'Creating...'
                : isCreating
                ? 'Creating...'
                : 'Create User'}
            </button>
            <button
              type='button'
              onClick={handleCancel}
              disabled={uploading}
              className='p-y-05 p-x-05 font-white'
              style={{
                width: '46%',
                borderRadius: '1rem',
                border: 'none',
                outline: 'none',
                cursor: uploading ? 'not-allowed' : 'pointer',
                backgroundColor: uploading ? '#f5f5f5' : '#d40438ff',
              }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default CreateUserModal;
