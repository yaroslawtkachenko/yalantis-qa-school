import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { ReactComponent as YalantisLogo } from '../../assets/yalantisIcon.svg';
import useModal from '../../hooks/useModal';
import TaskModal from '../../components/TaskModal';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrap: {
            display: 'flex',
            padding: '20px',
            justifyContent: 'space-between',
        },
        button: {
            color: theme.palette.secondary.main,
            fontWeight: 600,
            letterSpacing: '1px',
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
            },
        },
    }),
);

const Header: React.FC = () => {
    const classes = useStyles();

    const { isOpen, handleCloseModal, handleOpenModal } = useModal();

    return (
        <div className={classes.wrap}>
            <TaskModal isOpen={isOpen} handleClose={handleCloseModal}>
                <Button
                    startIcon={<AddIcon />}
                    className={classes.button}
                    onClick={handleOpenModal}
                    variant="contained"
                    color="primary"
                >
                    Create issue
                </Button>
            </TaskModal>
            <YalantisLogo />
        </div>
    );
};

export default Header;
