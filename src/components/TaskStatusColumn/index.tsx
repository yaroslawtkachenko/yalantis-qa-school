import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import cn from 'classnames';

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
    }),
);

interface Props {
    status: TaskStatus;
    tasks: Task[] | [];
}

const TaskStatusColumn: React.FC<Props> = ({ status, tasks }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={cn(classes.block, classes.text)}>
                {status.toUpperCase()}
            </Paper>
            <Paper elevation={3} className={classes.block} />
        </div>
    );
};

export default TaskStatusColumn;
