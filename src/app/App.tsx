import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import Board from '../containers/Board';
import Header from '../containers/Header';
import Filters from '../containers/Filters';
import useTasks, { TaskContext } from '../hooks/useTasks';

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
    const {
        handleSetCurrentFilter,
        handleDeleteTask,
        handleUpdateTask,
        handleResetState,
        handleCreateTask,
        handleSortTask,
        currentFilter,
        setFilterBy,
        filterBy,
        sortBy,
        tasks,
    } = useTasks();

    return (
        <ThemeProvider theme={theme}>
            <TaskContext.Provider
                value={{
                    handleSetCurrentFilter,
                    handleDeleteTask,
                    handleUpdateTask,
                    handleResetState,
                    handleCreateTask,
                    handleSortTask,
                    currentFilter,
                    setFilterBy,
                    filterBy,
                    sortBy,
                    tasks,
                }}
            >
                <div className="App">
                    <Header />
                    <Filters />
                    <Board />
                </div>
            </TaskContext.Provider>
        </ThemeProvider>
    );
};

export default App;
