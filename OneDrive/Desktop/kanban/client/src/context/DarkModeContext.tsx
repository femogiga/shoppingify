import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

interface IDarkModeProvider {
  children: React.ReactNode;
}

interface IDarkModeContext {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  handleModeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleModeChangeOnToggle: () => void;
}
export const DarkModeContext = createContext<IDarkModeContext | null>(null);
export const DarkModeProvider: React.FC<IDarkModeProvider> = ({ children }) => {
  const [mode, setMode] = useState<string>('dark');

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && e.target.id === 'dark') {
      //   console.log(e.target);
      setMode('light');
      console.log(e.target);
    }

    if (e.target.checked && e.target.id === 'light') {
      console.log(e.target);
      setMode('dark');
      //   console.log(e.target);
    }
  };

  const handleModeChangeOnToggle = () => {
    {
      if (mode === 'dark') {
        setMode('light');
      } else {
        setMode('dark');
      }
    }
  };

  useEffect(() => {}, [mode]);
  return (
    <DarkModeContext.Provider
      value={{ mode, setMode, handleModeChange, handleModeChangeOnToggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext) as IDarkModeContext;
};
