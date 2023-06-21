import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import React from "react";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./TodolistWithRedux";


const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
    args: {
        todolistId: 'todolistId1',
        task: {id: 'sdfgsadfasdf23', title: 'JS', isDone: true},
    },
}

export default meta;

type Story = StoryObj<typeof Task>;

const TaskCopy = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    return <Task task={task} todolistId={'todolistId1'}/>
}

export const TaskWithRedux: Story = {
    render: () => <TaskCopy/>
}























/*
import type { Meta, StoryObj } from '@storybook/react';
import {Task} from "../Task";


const meta: Meta<typeof Task> = {
  title: 'Example/Button',
  component: Task,
  tags: ['autodocs'],
  argTypes: {

  },
};

export default meta;

type Story = StoryObj<typeof Task>;

export const TaskStory: Story = {
  args: {

  },
};


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