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
                <TaskStatusColumn status={Status.toDo} tasks={[]} />
            </Grid>
            <Grid item xs>
                <TaskStatusColumn status={Status.inProgress} tasks={[]} />
            </Grid>
            <Grid item xs>
                <TaskStatusColumn status={Status.testing} tasks={[]} />
            </Grid>
            <Grid item xs>
                <TaskStatusColumn status={Status.reopened} tasks={[]} />
            </Grid>
            <Grid item xs>
                <TaskStatusColumn status={Status.done} tasks={[]} />
            </Grid>
        </Grid>
    );
};

export default Board;
