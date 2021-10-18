import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import TaskStatusColumn from '../../components/TaskStatusColumn';
import { Status } from '../../constants/taskStatus';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            padding: '0 10px',
        },
    }),
);

const Board: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid justifyContent="center" container spacing={0} classes={{ container: classes.container }}>
            <Grid item xs>
                <TaskStatusColumn status={Status.toDo} />
            </Grid>
            <Grid item xs>
                <TaskStatusColumn status={Status.inProgress} />
            </Grid>
            <Grid item xs>
                <TaskStatusColumn status={Status.testing} />
            </Grid>
            <Grid item xs>
                <TaskStatusColumn status={Status.reopened} />
            </Grid>
            <Grid item xs>
                <TaskStatusColumn status={Status.done} />
            </Grid>
        </Grid>
    );
};

export default Board;
