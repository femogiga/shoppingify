import React, {
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../apis/authData';
import {  useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../statemanagment/AuthStore';
import { useFetchProjects } from '../apis/projectData';
import { User } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import type { Credentials, RegisterType } from '../types/apiTypes';

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
  const { mode } = useDarkMode();
  const { loginMutate, isLoggingIn, error, isError, isSuccess, reset } =
    useLoginMutation();
  const { registerMutate, isRegistering } = useRegisterMutation();
  // const { data } = useFetchProjects();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  console.log(user?.photoUrl);
  /*
   * @param formType and @Handler setFormtype are used to
   * set the visibility of inputs depending on whether
   * the link clicked  is either Sign in or register
   * formType is set in @handlers handleLoginFormType and handleRegisterFormType
   */
  const handleLoginFormType = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormType(false);
  };

  const handleRegisterFormType = (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormType(true);
  };

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const loginData:Credentials = { email: email.trim(), password: password.trim() };

    loginMutate(loginData, {
      onSuccess: () => {
        // localStorage.setItem('auth', JSON.stringify(data));
        setEmail('');
        setPassword('');
        setShowAuthModal(false);
        navigate('/projects');
        //window.location.reload();
      },
      onError: (error) => console.error(error),
    });
  };

  const handleRegister = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      console.log('Password is not the same');
    }
    const registerData:RegisterType = {
      email: email.trim(),
      password: password.trim(),
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      photoUrl: photoUrl.trim(),
    };

    registerMutate(registerData, {
      onSuccess: () => {
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

  return (
    <div
      className={`auth-modal relative flex item-center `}
      style={{ zIndex: 12, boxShadow: 'o 2px 4 rgba(0,0,0,0.5)' }}>
      <Link to="#" onClick={onShowAuthModal}>
        {isAuthenticated ? (
          <img
            style={{
              width: '2.4rem',
              aspectRatio: 1,
              borderRadius: '50%',
              objectFit: 'cover',
              overflowClipMargin: 'unset',
            }}
            src={
              user?.photoUrl ||
              'https://images.pexels.com/photos/34123077/pexels-photo-34123077.jpeg'
            }
          />
        ) : (
          <div>
            <User
              color={mode === 'light' ? 'black' : 'white'}
              size='36'
              style={{
                borderRadius: '50%',
                border: '1px solid white',
                padding: '.1rem',
                borderColor: mode === 'light' ? 'black' : 'white',
              }}
            />
          </div>
        )}
      </Link>
      {showAuthModal && (
        <div
          className={mode === 'light' ? 'bg-blue-sm' : 'bg-dark'}
          style={{
            color: 'white',
            // border: '1px solid white',
            display: 'grid',
            width: '20rem',
            paddingBlock: '.5rem',
            paddingInline: '.4rem',
            position: 'absolute',
            zIndex: '10',
            rowGap: '.4rem',
            top: '3rem',
            borderRadius: '.8rem',
            boxShadow: '0 2px 2px  rgba(0,0,0,.1)',
            minHeight:'5rem'
            // border:'1px solid black'
          }}>
          {isAuthenticated && (
            <Link to="#" style={{ color: 'red' }} onClick={handleLogout}>
              Sign out
            </Link>
          )}
          <div
            className='flex justify-between'
            style={{ color: mode === 'light' ? 'black' : 'white' }}>
            {!isAuthenticated && (
              <Link to="#" onClick={handleLoginFormType}>Sign in</Link>
            )}
            {!isAuthenticated && (
              <Link to="#" onClick={handleRegisterFormType}>Register</Link>
            )}
          </div>
          {!isAuthenticated && (
            <>
              {' '}
              <input
                type='email'
                style={{
                  maxWidth: '100%',
                  display: 'block',
                  paddingBlock: '.4rem',
                  paddingInline: '.4rem',
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
                  paddingInline: '.4rem',
                }}
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}
          {formType && (
            <div className='grid mbe-1' style={{ rowGap: '.8rem' }}>
              <input
                type='password'
                style={{
                  width: '100%',
                  display: 'block',
                  paddingBlock: '.4rem',
                  paddingInline: '.4rem',
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
                  paddingInline: '.4rem',
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
                  paddingInline: '.4rem',
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
                  paddingInline: '.4rem',
                }}
                name='imgUrl'
                placeholder='photo'
                value={photoUrl}
                onChange={(e) => setphotoUrl(e.target.value)}
              />
            </div>
          )}
          <div style={{ display: 'grid', rowGap: '.4rem' }}>
            {!formType && !isAuthenticated && (
              <button
                className={` ${
                  mode === 'light'
                    ? 'bg-blue-md font-black'
                    : 'bg-darker font-white'
                }`}
                type='button'
                style={{ width: '100%', marginBlockStart: '1rem' }}
                onClick={handleLogin}>
                Login
              </button>
            )}
            {formType && (
              <button
                type='button'
                className={
                  mode === 'light'
                    ? 'bg-dark font-black'
                    : 'bg-darker font-white'
                }
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
