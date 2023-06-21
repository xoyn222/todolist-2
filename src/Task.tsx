import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {changeTaskStatusAC, changeTasksTitleAC, removeTaskAC} from "./state/tasks-reducers";
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./TodolistWithRedux";
import {useDispatch} from "react-redux";

type TaskTypes = {
    task: TaskType
    todolistId: string
}

export const Task: FC<TaskTypes> = memo(({task,todolistId}) => {

    const dipsatch = useDispatch();
    const changeTasksStatus = (event: ChangeEvent<HTMLInputElement>) =>
        dipsatch(changeTaskStatusAC(task.id, event.currentTarget.checked, todolistId));
    const onClickButtonHandler = () => dipsatch(removeTaskAC(task.id, todolistId));
    const changeTaskTitle = useCallback((title: string) => dipsatch(changeTasksTitleAC(task.id, title, todolistId)), [todolistId, task.id]);

    return <li className={task.isDone ? 'done' : 'is'}>
            <Checkbox checked={task.isDone}
                      onChange={changeTasksStatus}
                      size={'medium'}
            />
            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
            <IconButton size={'small'}
                        color={'primary'}
                        onClick={onClickButtonHandler}
                        sx={{m: '5px 0 5px 15px'}}
            >
                <DeleteIcon/>
            </IconButton>
        </li>
})

// import type {ComponentMeta, ComponentStory, Meta, StoryObj} from '@storybook/react';
// import {Task} from "../Task";
// import React from "react";
// import {Provider} from "react-redux";
// import {store} from "../state/store";
//
// const meta: Meta<typeof Task> = {
//     title: 'Todolist/Task',
//     component: Task,
//     tags: ['autodocs'],
// }
//
// export default meta;
//
// type Story = StoryObj<typeof Task>;
//
// export const TaskIsNotDone = {
//     args: {
//         task: {id: 'asdfasdfasdf', title: 'JS', isDone: false},
//         todolistId: 'asdfwqerqwerqwer'
//     },
// };
//
// export const TaskIsDone: Story = {
//     args: {
//         task: {id: 'uiopcv', title: 'TS', isDone: false},
//         todolistId: 'tyuityui'
//     },
// };
//
//
// /*
// import type { Meta, StoryObj } from '@storybook/react';
// import {Task} from "../Task";
//
//
// const meta: Meta<typeof Task> = {
//   title: 'Example/Button',
//   component: Task,
//   tags: ['autodocs'],
//   argTypes: {
//
//   },
// };
//
// export default meta;
//
// type Story = StoryObj<typeof Task>;
//
// export const TaskStory: Story = {
//   args: {
//
//   },
// };
//
//  */