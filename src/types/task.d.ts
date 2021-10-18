type TaskType = TaskTypeEnum.task | TaskTypeEnum.bug | TaskTypeEnum.improvement;

type TaskStatus = Status.toDo | Status.inProgress | Status.testing | Status.reopened | Status.done;

type TaskPriority = Priority.low | Priority.medium | Priority.high | Priority.critical;

interface Task {
    id: string;
    name: string;
    priority: TaskPriority;
    user: string;
    estimate: number;
    type: TaskType;
    status: TaskStatus;
}
