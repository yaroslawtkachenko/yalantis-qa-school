interface TaskContextInterface {
    handleSetCurrentFilter: (currentFilter: string) => void;
    handleDeleteTask: (taskId: string) => void;
    handleSortTask: (sortBy: SortType) => void;
    setFilterBy: (filterBy: string) => void;
    handleCreateTask: (task: Task) => void;
    handleUpdateTask: (task: Task) => void;
    handleResetState: () => void;
    currentFilter: string;
    filterBy: string;
    sortBy: SortType;
    tasks: Task[];
}
