import { TaskTypeEnum } from '../../constants/taskType';
import defaultUsers from '../../constants/defaultUsers';
import { Priority } from '../../constants/taskPriority';
import { Status } from '../../constants/taskStatus';

const initialModalValues = {
    name: '',
    type: TaskTypeEnum.task,
    user: defaultUsers.UserOne,
    priority: Priority.medium,
    status: Status.toDo,
    estimate: undefined,
    id: '',
};

export default initialModalValues;
