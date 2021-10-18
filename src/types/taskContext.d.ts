interface TaskContext {
    handleCreateTask: (task: Task) => void;
    handleChangeStatus: (id: string, status: Status) => void;
    handleFilterTask: (filterBy: string) => void;
    handleSortTask: (sortBy: string) => void;
    handleDeleteTask: (id: string) => void;
    tasks: Task[];
}
