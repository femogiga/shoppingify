import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../apis/authData';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

interface IAuthModal {
  showAuthModal: boolean;
  onShowAuthModal: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  setShowAuthModal: Dispatch<SetStateAction<boolean>>;
}

export const AuthAvatarButton: React.FC<IAuthModal> = ({
  showAuthModal,
  onShowAuthModal,
  setShowAuthModal,
}) => {
  const [formType, setFormType] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [photoUrl, setphotoUrl] = useState<string>('');

  const { loginMutate, isLoggingIn, error, isError, isSuccess, reset } =
        useLoginMutation();
    const {
      registerMutate,
      isRegistering,

    } = useRegisterMutation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /*
   * @param formType and @Handler setFormtype are used to
   * set the visibility of inputs depending on whether
   * the link clicked  is either Sign in or register
   * formType is set in @handlers handleLoginFormType and handleRegisterFormType
   */
  const handleLoginFormType = (e) => {
    e.preventDefault();
    setFormType(false);
  };

  const handleRegisterFormType = (e) => {
    e.preventDefault();
    setFormType(true);
  };

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const loginData = { email: email.trim(), password: password.trim() };

    loginMutate(loginData, {
      onSuccess: (data) => {
        localStorage.setItem('auth', JSON.stringify(data));
        setEmail('');
        setPassword('');
        setShowAuthModal(false);
        navigate('/projects');
        window.location.reload();
      },
      onError: (error) => console.error(error),
    });
  };

  const handleRegister = (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (password !== repeatPassword) {
          console.log("Password is not the same")
      }
    const registerData = {
      email: email.trim(),
      password: password.trim(),
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      photoUrl: photoUrl.trim(),
    };

    registerMutate(registerData, {
      onSuccess: (data) => {
        setEmail('');
        setPassword('');
        setShowAuthModal(false);
        navigate('/projects');
        window.location.reload();
      },
      onError: (error) => console.error(error),
    });
  };

  const handleLogout = (e: React.FormEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem('auth');
    setEmail('');
    setPassword('');
    setShowAuthModal(false);
    queryClient.invalidateQueries({ queryKey: ['allProjects'] });
    queryClient.invalidateQueries({ queryKey: ['projectById'] });
    navigate('/projects');
    window.location.reload();
  };
    const photo = localStorage.getItem('auth')
    const photoUrlString = photo?.photoUrl
  return (
    <div className='relative'>
      <Link onClick={onShowAuthModal}>
        <img
                  style={{ width: '2.4rem', aspectRatio: 1, borderRadius: '50%' }}
                  src={ 'https://images.pexels.com/photos/34123077/pexels-photo-34123077.jpeg'}
        />
      </Link>
      {showAuthModal && (
        <div
          style={{
            color: 'white',
            border: '1px solid white',
            display: 'grid',
            width: '14rem',
            paddingBlock: '.5rem',
            paddingInline: '.4rem',
            position: 'absolute',
            zIndex: '10',
            rowGap: '.4rem',
          }}>
          <Link onClick={handleLogout}>Sign out</Link>
          <div className='flex justify-between'>
            <Link onClick={handleLoginFormType}>Sign in</Link>
            <Link onClick={handleRegisterFormType}>Register</Link>
          </div>
          <input
            type='email'
            style={{
              maxWidth: '100%',
              display: 'block',
              paddingBlock: '.4rem',
            }}
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            style={{
              maxWidth: '100%',
              display: 'block',
              paddingBlock: '.4rem',
            }}
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formType && (
            <div className='grid ' style={{ rowGap: '.4rem' }}>
              <input
                type='password'
                style={{
                  width: '100%',
                  display: 'block',
                  paddingBlock: '.4rem',
                }}
                placeholder='repeat password'
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <input
                type='text'
                style={{
                  width: '100%',
                  display: 'block',
                  paddingBlock: '.4rem',
                }}
                name='firstname'
                placeholder='firstname'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                type='text'
                style={{
                  width: '100%',
                  display: 'block',
                  paddingBlock: '.4rem',
                }}
                name='lastname'
                placeholder='lastname'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <input
                type='text'
                style={{
                  width: '100%',
                  display: 'block',
                  paddingBlock: '.4rem',
                }}
                name='imgUrl'
                placeholder='photo'
                value={photoUrl}
                onChange={(e) => setphotoUrl(e.target.value)}
              />
            </div>
          )}
          <div style={{ display: 'grid', rowGap: '.4rem' }}>
            {!formType && (
              <button
                type='button'
                style={{ width: '100%' }}
                onClick={handleLogin}>
                Login
              </button>
            )}
            {formType && (
              <button
                type='button'
                style={{ width: '100%' }}
                onClick={handleRegister}>
                Register
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
