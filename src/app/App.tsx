import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import Board from '../containers/Board';
import Header from '../containers/Header';

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(58 59 64)',
        },
        secondary: {
            main: 'rgb(255, 99, 0)',
        },
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Header />
                <Board />
            </div>
        </ThemeProvider>
    );
};

export default App;
