import React, { useContext, useCallback } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import cn from 'classnames';

import TaskModal from '../TaskModal';
import useModal from '../../hooks/useModal';
import { TaskContext } from '../../hooks/useTasks';
import { PriorityNames } from '../../constants/taskPriority';

interface Props {
    task: Task;
}

const useStyles = makeStyles(() =>
    createStyles({
        wrap: {
            display: 'flex',
            flexDirection: 'column',
            color: '#FFF',
            padding: '10px',
            height: 'auto',
            backgroundColor: 'rgb(80 82 90)',
            cursor: 'pointer',
        },
        block: {
            marginBottom: '20px',
        },
        icon: {
            cursor: 'pointer',
        },
        nameBlock: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        name: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
    }),
);

const Card: React.FC<Props> = ({ task }) => {
    const classes = useStyles();

    const { handleDeleteTask } = useContext(TaskContext);

    const { isOpen, handleOpenModal, handleCloseModal } = useModal();

    const deleteTask = useCallback(
        (e) => {
            e.stopPropagation();
            handleDeleteTask(task?.id);
        },
        [task, handleDeleteTask],
    );

    return (
        <TaskModal isEdit initialValues={task} isOpen={isOpen} handleClose={handleCloseModal}>
            <Paper onClick={handleOpenModal} elevation={3} className={classes.wrap}>
                <div className={cn(classes.block, classes.nameBlock)}>
                    <div className={classes.name} title={task.name}>
                        {task.name}
                    </div>
                    <DeleteIcon className={classes.icon} onClick={deleteTask} />
                </div>
                <div className={classes.block}>
                    <b>Estimate: </b>
                    {task.estimate}
                </div>
                <div className={classes.block}>
                    <b>Priority: </b>
                    {PriorityNames[task.priority]}
                </div>
                <div className={classes.block}>
                    <b>Assigned on: </b>
                    <div className={classes.name} title={task.user}>
                        {task.user}
                    </div>
                </div>
            </Paper>
        </TaskModal>
    );
};

export default Card;
