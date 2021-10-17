import React, { createContext } from 'react';

export const TASKS_CONTEXT: React.Context<any> = createContext({});

const useTasks: () => void = () => {
    return <div></div>;
};

export default useTasks;
