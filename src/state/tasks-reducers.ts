import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolist-reducer";

export type ActionsTypes = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTasksTitleAC>
    | AddTodolistAT
    | RemoveTodolistAT

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsTypes): TasksStateType => {
        switch (action.type) {
            case 'REMOVE_TASK':
                return {...state, [action.todolistId]: state[action.todolistId]
                        .filter(task => task.id !== action.taskId)}
            case 'ADD_TASK':
                return  {...state, [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]}
            case 'CHANGE_TASK_STATUS':
                return  {...state, [action.todolistId]: state[action.todolistId]
                        .map(t => t.id === action.taskId ? {...t, isDone: action.newIsDone} : t)}
            case 'CHANGE_TASK_TITLE':
                return  {...state, [action.todolistId]: state[action.todolistId]
                        .map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
            case 'ADD_TODOLIST':
                return {...state, [action.todolistId] : []}
            case 'REMOVE_TODOLIST':
                let stateCopy = {...state}
                delete stateCopy[action.todolistId]
                return stateCopy
            default:
                return state
        }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({
        type: 'REMOVE_TASK',
        taskId,
        todolistId
    }) as const

export const addTaskAC = (title: string, todolistId: string) => ({
        type: 'ADD_TASK',
        title,
        todolistId
    }) as const

export const changeTaskStatusAC = (taskId: string, newIsDone: boolean, todolistId: string) => ({
        type: 'CHANGE_TASK_STATUS',
        taskId,
        newIsDone,
        todolistId
    }) as const

export const changeTasksTitleAC = (taskId: string, title: string, todolistId: string) => ({
        type: "CHANGE_TASK_TITLE",
        taskId,
        title,
        todolistId
    }) as const

/*

 */
/*
RemoveTodolistAT - AT - Action Type

Тип действия и набор данных формируют совокупную сущность
Каждому типу действия соответствует определенный набор данных которые необходимы для преобразования исходного стейта

Тип преобразования и необходимые данные мы упакуем в один объект
этот объект поскольку он описывает тип действия называют action
 */