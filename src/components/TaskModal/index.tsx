import React, { useCallback, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuItem from '@material-ui/core/MenuItem';
import { v1 as uuidv1 } from 'uuid';

import defaultUsers from '../../constants/defaultUsers';
import { TaskTypeEnum } from '../../constants/taskType';
import { Priority, PriorityNames } from '../../constants/taskPriority';
import { Status } from '../../constants/taskStatus';
import initialModalValues from './initialModalValues';
import { TaskContext } from '../../hooks/useTasks';

interface Props {
    children: React.ReactNode;
    handleClose: () => void;
    isOpen: boolean;
    initialValues?: {
        name: string;
        type: TaskType;
        user: string;
        priority: TaskPriority;
        status: TaskStatus;
        estimate: number | undefined;
        id: string;
    };
    isEdit?: boolean;
}

const validationSchema = yup.object({
    type: yup.string().required('Type is required'),
    name: yup.string().max(300, 'Task name should be less or equal 300 characters').required('Task name is required'),
    user: yup.string().required('User is required'),
    priority: yup.string().required('Priority is required'),
    status: yup.string().required('Status is required'),
    estimate: yup
        .number()
        .max(100, 'Estimate should be less or equal 100')
        .test('maxDigitsAfterDecimal', 'Estimate field must have 1 digits after decimal or less', (estimate) => {
            if (!estimate) {
                return true;
            }
            return /^\d+(\.\d{1,1})?$/.test(String(estimate));
        }),
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            borderRadius: '16px',
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonWrap: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
        },
        submitBtn: {
            color: '#FFF',
        },
        closeBtn: {
            color: theme.palette.secondary.main,
        },
        field: {
            width: '100%',
            marginBottom: '20px',
        },
    }),
);

const TaskModal: React.FC<Props> = ({
    initialValues = initialModalValues,
    isEdit = false,
    handleClose,
    children,
    isOpen,
}) => {
    const classes = useStyles();

    const { handleCreateTask, handleUpdateTask } = useContext(TaskContext);

    const formik = useFormik({
        validateOnChange: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const task = {
                ...values,
                estimate: values?.estimate || 100,
                id: isEdit ? initialValues?.id : uuidv1(),
            };
            if (isEdit) {
                handleUpdateTask(task);
            } else {
                handleCreateTask(task);
            }
            handleClose();
            resetForm();
        },
    });

    const handleCloseModal = useCallback(() => {
        handleClose();
        formik.resetForm();
    }, [formik, handleClose]);

    return (
        <div>
            {children}
            {isOpen && (
                <Modal
                    open={isOpen}
                    onClose={handleCloseModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.modal}
                >
                    <div className={classes.paper}>
                        <h2 id="simple-modal-title">Create issue</h2>
                        <div>
                            <form onSubmit={formik.handleSubmit}>
                                {isEdit && (
                                    <TextField
                                        fullWidth
                                        id="status"
                                        name="status"
                                        label="Status"
                                        select
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true,
                                        }}
                                        value={formik.values.status}
                                        onChange={formik.handleChange}
                                        error={formik.touched.status && Boolean(formik.errors.status)}
                                        helperText={formik.touched.status && formik.errors.status}
                                        className={classes.field}
                                    >
                                        <MenuItem value={Status.toDo}>{Status.toDo}</MenuItem>
                                        <MenuItem value={Status.inProgress}>{Status.inProgress}</MenuItem>
                                        <MenuItem value={Status.testing}>{Status.testing}</MenuItem>
                                        <MenuItem value={Status.reopened}>{Status.reopened}</MenuItem>
                                        <MenuItem value={Status.done}>{Status.done}</MenuItem>
                                    </TextField>
                                )}
                                <TextField
                                    fullWidth
                                    id="type"
                                    name="type"
                                    label="Type"
                                    select
                                    InputLabelProps={{
                                        shrink: true,
                                        required: true,
                                    }}
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    error={formik.touched.type && Boolean(formik.errors.type)}
                                    helperText={formik.touched.type && formik.errors.type}
                                    className={classes.field}
                                    disabled={isEdit}
                                >
                                    <MenuItem value={TaskTypeEnum.task}>{TaskTypeEnum.task}</MenuItem>
                                    <MenuItem value={TaskTypeEnum.bug}>{TaskTypeEnum.bug}</MenuItem>
                                    <MenuItem value={TaskTypeEnum.improvement}>{TaskTypeEnum.improvement}</MenuItem>
                                </TextField>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"
                                    placeholder="Enter issue name"
                                    InputLabelProps={{
                                        shrink: true,
                                        required: true,
                                    }}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    className={classes.field}
                                    disabled={isEdit}
                                />
                                <TextField
                                    fullWidth
                                    id="user"
                                    name="user"
                                    label="User"
                                    select
                                    InputLabelProps={{
                                        shrink: true,
                                        required: true,
                                    }}
                                    value={formik.values.user}
                                    onChange={formik.handleChange}
                                    error={formik.touched.user && Boolean(formik.errors.user)}
                                    helperText={formik.touched.user && formik.errors.user}
                                    className={classes.field}
                                    disabled={isEdit}
                                >
                                    <MenuItem value={defaultUsers.UserOne}>{defaultUsers.UserOne}</MenuItem>
                                    <MenuItem value={defaultUsers.UserTwo}>{defaultUsers.UserTwo}</MenuItem>
                                </TextField>
                                <TextField
                                    fullWidth
                                    id="estimate"
                                    name="estimate"
                                    label="Estimate"
                                    placeholder="Enter estimate value"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formik.values.estimate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.estimate && Boolean(formik.errors.estimate)}
                                    helperText={formik.touched.estimate && formik.errors.estimate}
                                    className={classes.field}
                                    disabled={isEdit}
                                />
                                <TextField
                                    fullWidth
                                    id="priority"
                                    name="priority"
                                    label="Priority"
                                    select
                                    InputLabelProps={{
                                        shrink: true,
                                        required: true,
                                    }}
                                    value={formik.values.priority}
                                    onChange={formik.handleChange}
                                    error={formik.touched.priority && Boolean(formik.errors.priority)}
                                    helperText={formik.touched.priority && formik.errors.priority}
                                    className={classes.field}
                                    disabled={isEdit}
                                >
                                    <MenuItem value={Priority.low}>{PriorityNames[Priority.low]}</MenuItem>
                                    <MenuItem value={Priority.medium}>{PriorityNames[Priority.medium]}</MenuItem>
                                    <MenuItem value={Priority.high}>{PriorityNames[Priority.high]}</MenuItem>
                                    <MenuItem value={Priority.critical}>{PriorityNames[Priority.critical]}</MenuItem>
                                </TextField>
                                <div className={classes.buttonWrap}>
                                    <Button
                                        className={classes.submitBtn}
                                        disabled={!formik.isValid}
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                    <ButtonBase
                                        className={classes.closeBtn}
                                        color="secondary"
                                        onClick={handleCloseModal}
                                    >
                                        Cancel
                                    </ButtonBase>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TaskModal;
