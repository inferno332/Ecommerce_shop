import { createContext, useState, useMemo, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

// color design tokens
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
              grey: {
                  100: '#ffffffe4',
                  200: '#c2c2c2',
                  300: '#a3a3a3',
                  400: '#858585',
                  500: '#666666',
                  600: '#525252',
                  700: '#3d3d3d',
                  800: '#292929',
                  900: '#141414',
              },
              primary: {
                  100: '#d0d1d5',
                  200: '#a1a4ab',
                  300: '#727681',
                  400: '#1f2a40',
                  500: '#141b2d',
                  600: '#101624',
                  700: '#0c101b',
                  800: '#080b12',
                  900: '#1f2a40',
              },
              greenAccent: {
                  100: '#e3faf8',
                  200: '#c8f5f0',
                  300: '#acf0e9',
                  400: '#91ebe1',
                  500: '#75e6da',
                  600: '#5eb8ae',
                  700: '#468a83',
                  800: '#2f5c57',
                  900: '#172e2c',
              },
              redAccent: {
                  100: '#f8dcdb',
                  200: '#f1b9b7',
                  300: '#e99592',
                  400: '#e2726e',
                  500: '#db4f4a',
                  600: '#af3f3b',
                  700: '#832f2c',
                  800: '#58201e',
                  900: '#2c100f',
              },
              blueAccent: {
                  100: '#d1ebf0',
                  200: '#a3d7e1',
                  300: '#74c2d2',
                  400: '#46aec3',
                  500: '#189ab4',
                  600: '#137b90',
                  700: '#0e5c6c',
                  800: '#0a3e48',
                  900: '#051f24',
              },
          }
        : {
              grey: {
                  100: '#141414',
                  200: '#292929',
                  300: '#3d3d3d',
                  400: '#525252',
                  500: '#666666',
                  600: '#858585',
                  700: '#a3a3a3',
                  800: '#c2c2c2',
                  900: '#e0e0e0',
              },
              primary: {
                  100: '#040509',
                  200: '#080b12',
                  300: '#0c101b',
                  400: '#f2f0f0',
                  500: '#141b2d',
                  600: '#434957',
                  700: '#727681',
                  800: '#a1a4ab',
                  900: '#d0d1d5',
              },
              greenAccent: {
                  900: '#e3faf8',
                  800: '#c8f5f0',
                  700: '#acf0e9',
                  600: '#91ebe1',
                  500: '#75e6da',
                  400: '#468a83',
                  300: '#468a83',
                  200: '#2f5c57',
                  100: '#172e2c',
              },
              redAccent: {
                  100: '#2c100f',
                  200: '#58201e',
                  300: '#832f2c',
                  400: '#af3f3b',
                  500: '#db4f4a',
                  600: '#e2726e',
                  700: '#e99592',
                  800: '#f1b9b7',
                  900: '#f8dcdb',
              },
              blueAccent: {
                  900: '#d1ebf0',
                  800: '#a3d7e1',
                  700: '#74c2d2',
                  600: '#46aec3',
                  500: '#189ab4',
                  400: '#137b90',
                  300: '#0e5c6c',
                  200: '#0a3e48',
                  100: '#051f24',
              },
          }),
});

// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                      primary: {
                          main: colors.primary[500],
                      },
                      secondary: {
                          main: colors.greenAccent[500],
                      },
                      info: {
                          main: colors.blueAccent[500],
                      },
                      neutral: {
                          dark: colors.grey[700],
                          main: colors.grey[500],
                          light: colors.grey[100],
                      },
                      background: {
                          default: colors.primary[500],
                      },
                  }
                : {
                      primary: {
                          main: colors.primary[100],
                      },
                      secondary: {
                          main: colors.greenAccent[500],
                      },
                      info: {
                          main: colors.blueAccent[500],
                      },
                      neutral: {
                          dark: colors.grey[700],
                          main: colors.grey[500],
                          light: colors.grey[100],
                      },
                      background: {
                          default: '#fcfcfc',
                      },
                  }),
        },
        typography: {
            fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
            fontSize: 13,
            h1: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 40,
            },
            h2: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 32,
            },
            h3: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 24,
            },
            h4: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 20,
            },
            h5: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 16,
            },
            h6: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 14,
            },
        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export const useMode = () => {
    const [mode, setMode] = useState('dark');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setMode(window.localStorage.getItem('theme') || 'light');
        }
    }, []);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                const newMode = mode === 'light' ? 'dark' : 'light';
                setMode(newMode);
                window.localStorage.setItem('theme', newMode);
            },
        }),
        [mode],
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
};
