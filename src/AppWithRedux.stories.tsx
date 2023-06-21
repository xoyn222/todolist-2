import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";

const meta: Meta<typeof AppWithRedux> = {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
}

export default meta

type Story = StoryObj<typeof AppWithRedux>

export const AppWithReduxStory: Story = {
    render: () => <AppWithRedux/>
}



// type TaskTypes = {
//     task: TaskType
//     todolistId: string
// }
//
// export const Task: FC<TaskTypes> = memo(({task,todolistId}) => {
//
//     const dipsatch = useDispatch();
//     const changeTasksStatus = (event: ChangeEvent<HTMLInputElement>) =>
//         dipsatch(changeTaskStatusAC(task.id, event.currentTarget.checked, todolistId));
//     const onClickButtonHandler = () => dipsatch(removeTaskAC(task.id, todolistId));
//     const changeTaskTitle = useCallback((title: string) => dipsatch(changeTasksTitleAC(task.id, title, todolistId)), [todolistId, task.id]);
//
//     return <li className={task.isDone ? 'done' : 'is'}>
//             <Checkbox checked={task.isDone}
//                       onChange={changeTasksStatus}
//                       size={'medium'}
//             />
//             <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
//             <IconButton size={'small'}
//                         color={'primary'}
//                         onClick={onClickButtonHandler}
//                         sx={{m: '5px 0 5px 15px'}}
//             >
//                 <DeleteIcon/>
//             </IconButton>
//         </li>
// })

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