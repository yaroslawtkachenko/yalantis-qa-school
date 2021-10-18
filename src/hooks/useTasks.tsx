import { createContext, useState, useCallback, useEffect, useMemo } from 'react';

import { Status } from '../constants/taskStatus';

export const TaskContext = createContext<TaskContextInterface>({
    handleSetCurrentFilter: () => {},
    handleCreateTask: () => {},
    handleUpdateTask: () => {},
    handleDeleteTask: () => {},
    handleResetState: () => {},
    handleSortTask: () => {},
    setFilterBy: () => {},
    currentFilter: '',
    filterBy: '',
    sortBy: '',
    tasks: [],
});

const updateTasksInLocalStorage = (newTasks: Task[] | []) =>
    window.localStorage.setItem('tasks', JSON.stringify(newTasks));

type SortType = 'priority' | 'estimate' | '';

const useTasks: () => TaskContextInterface = () => {
    const [tasks, setTasks] = useState<Task[] | []>([]);
    const [sortBy, setSortBy] = useState<SortType>('');
    const [filterBy, setFilterBy] = useState('');
    const [currentFilter, setCurrentFilter] = useState('');

    const handleSetDefaultTasks = () => {
        const tasksInStorage = window.localStorage.getItem('tasks') || '[]';
        const parsedTask = JSON.parse(tasksInStorage);
        setTasks(parsedTask);
    };

    useEffect(() => {
        handleSetDefaultTasks();
    }, []);

    const handleCreateTask = useCallback((task) => {
        setTasks((prevState) => {
            const newTasks = [...prevState, task];
            updateTasksInLocalStorage(newTasks);
            return newTasks;
        });
    }, []);

    const handleUpdateTask = useCallback((task) => {
        setTasks((prevState) => {
            const newTasks = prevState.map((t) => (t?.id === task?.id ? task : t));
            updateTasksInLocalStorage(newTasks);
            return newTasks;
        });
    }, []);

    const handleDeleteTask = useCallback((taskId: string) => {
        setTasks((prevState) => {
            const newTasks = prevState.map((task) => (task?.id === taskId ? { ...task, status: Status.done } : task));
            updateTasksInLocalStorage(newTasks);
            return newTasks;
        });
    }, []);

    const handleResetState = useCallback(() => {
        handleSetDefaultTasks();
        setSortBy('');
        setFilterBy('');
        setCurrentFilter('');
    }, []);

    const handleSortTask = useCallback((sortBy: SortType) => {
        setSortBy(sortBy);
    }, []);

    const handleSetCurrentFilter = useCallback(
        (newCurrentFilter: string) => {
            setTasks((prevState) => {
                return prevState.filter((task) => task[filterBy as keyof Task] === newCurrentFilter);
            });
            setCurrentFilter(newCurrentFilter);
        },
        [filterBy],
    );

    return useMemo(
        () => ({
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
        }),
        [
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
        ],
    );
};

export default useTasks;
