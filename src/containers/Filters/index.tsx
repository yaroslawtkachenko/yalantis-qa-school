import React, { useContext } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { TaskContext } from '../../hooks/useTasks';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import { Status } from '../../constants/taskStatus';
import { TaskTypeEnum } from '../../constants/taskType';
import defaultUsers from '../../constants/defaultUsers';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrap: {
            display: 'flex',
            padding: '20px',
        },
        button: {
            color: theme.palette.secondary.main,
            fontWeight: 600,
            height: '36px',
            letterSpacing: '1px',
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
            },
        },
        select: {
            width: '100%',
        },
        selectLabel: {
            color: theme.palette.secondary.main,
        },
        block: {
            padding: '10px',
            width: '200px',
            height: 'auto',
            backgroundColor: theme.palette.primary.main,
            marginRight: '20px',
        },
    }),
);

const Filters: React.FC = () => {
    const classes = useStyles();

    const {
        handleSetCurrentFilter,
        handleResetState,
        handleSortTask,
        currentFilter,
        setFilterBy,
        filterBy,
        sortBy,
    } = useContext(TaskContext);

    const handleChangeSort = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        handleSortTask(value);
    };

    const handleChangeFilterBy = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        setFilterBy(value);
    };

    const handleChangeCurrentFilter = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        handleSetCurrentFilter(value);
    };

    const getFilterByType = () => {
        if (filterBy === 'type') {
            return (
                <FormControl className={classes.select}>
                    <InputLabel className={classes.selectLabel} shrink id="demo-simple-select-label">
                        Type
                    </InputLabel>
                    <Select
                        onChange={handleChangeCurrentFilter}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentFilter}
                    >
                        <MenuItem value={TaskTypeEnum.task}>{TaskTypeEnum.task}</MenuItem>
                        <MenuItem value={TaskTypeEnum.bug}>{TaskTypeEnum.bug}</MenuItem>
                        <MenuItem value={TaskTypeEnum.improvement}>{TaskTypeEnum.improvement}</MenuItem>
                    </Select>
                </FormControl>
            );
        } else if (filterBy === 'status') {
            return (
                <FormControl className={classes.select}>
                    <InputLabel className={classes.selectLabel} shrink id="demo-simple-select-label">
                        Status
                    </InputLabel>
                    <Select
                        onChange={handleChangeCurrentFilter}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentFilter}
                    >
                        <MenuItem value={Status.toDo}>{Status.toDo}</MenuItem>
                        <MenuItem value={Status.inProgress}>{Status.inProgress}</MenuItem>
                        <MenuItem value={Status.testing}>{Status.testing}</MenuItem>
                        <MenuItem value={Status.reopened}>{Status.reopened}</MenuItem>
                        <MenuItem value={Status.done}>{Status.done}</MenuItem>
                    </Select>
                </FormControl>
            );
        } else if (filterBy === 'user') {
            return (
                <FormControl className={classes.select}>
                    <InputLabel className={classes.selectLabel} shrink id="demo-simple-select-label">
                        User
                    </InputLabel>
                    <Select
                        onChange={handleChangeCurrentFilter}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentFilter}
                    >
                        <MenuItem value={defaultUsers.UserOne}>{defaultUsers.UserOne}</MenuItem>
                        <MenuItem value={defaultUsers.UserTwo}>{defaultUsers.UserTwo}</MenuItem>
                    </Select>
                </FormControl>
            );
        }
    };

    return (
        <div className={classes.wrap}>
            <Paper elevation={3} className={classes.block}>
                <FormControl className={classes.select}>
                    <InputLabel className={classes.selectLabel} shrink id="demo-simple-select-label">
                        Filter By
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        onChange={handleChangeFilterBy}
                        id="demo-simple-select"
                        value={filterBy}
                    >
                        <MenuItem value="type">Type</MenuItem>
                        <MenuItem value="status">Status</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                    </Select>
                </FormControl>
            </Paper>
            {filterBy && (
                <Paper elevation={3} className={classes.block}>
                    {getFilterByType()}
                </Paper>
            )}
            <Paper elevation={3} className={classes.block}>
                <FormControl className={classes.select}>
                    <InputLabel className={classes.selectLabel} shrink id="demo-simple-select-label">
                        Sort by
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        onChange={handleChangeSort}
                        id="demo-simple-select"
                        value={sortBy}
                    >
                        <MenuItem value="priority">Priority</MenuItem>
                        <MenuItem value="estimate">Estimate</MenuItem>
                    </Select>
                </FormControl>
            </Paper>
            <Button
                startIcon={<ClearIcon />}
                className={classes.button}
                onClick={handleResetState}
                variant="contained"
                color="primary"
            >
                Reset filters
            </Button>
        </div>
    );
};

export default Filters;
