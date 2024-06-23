import React, { createContext, useState, useContext } from 'react';

const Theme = createContext();

export const useTheme = () => useContext(Theme);

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <Theme.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </Theme.Provider>
  );
};
