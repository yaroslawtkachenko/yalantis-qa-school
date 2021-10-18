import React, { useContext, useMemo } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import cn from 'classnames';
import orderBy from 'lodash/orderBy';

import Card from '../Card';
import { TaskContext } from '../../hooks/useTasks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(16),
                height: theme.spacing(16),
            },
        },
        block: {
            padding: '10px',
            width: '340px',
            height: 'auto',
            backgroundColor: theme.palette.primary.main,
        },
        text: {
            color: theme.palette.secondary.main,
            fontWeight: 600,
            textAlign: 'left',
            letterSpacing: '1px',
        },
        cardWrap: {
            marginBottom: '20px',
            '&:last-child': {
                marginBottom: '0',
            },
        },
    }),
);

interface Props {
    status: TaskStatus;
}

const TaskStatusColumn: React.FC<Props> = ({ status }) => {
    const classes = useStyles();

    const { tasks, sortBy } = useContext(TaskContext);

    const tasksByStatus = useMemo((): Task[] | [] => {
        const filteredTask = tasks.filter((task) => task.status === status);
        return orderBy(filteredTask, sortBy, ['desc']);
    }, [status, tasks, sortBy]);

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={cn(classes.block, classes.text)}>
                {status.toUpperCase()}
            </Paper>
            <Paper elevation={3} className={classes.block}>
                {tasksByStatus.map((task) => (
                    <div className={classes.cardWrap} key={task?.id}>
                        <Card task={task} />
                    </div>
                ))}
            </Paper>
        </div>
    );
};

export default TaskStatusColumn;
