import {FilteredTasksType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: 'REMOVE_TODOLIST'
    todolistId: string
}
export type AddTodolistAT = {
    type: 'ADD_TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE_TODOLIST_TITLE'
    todolistId: string
    title: string
}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE_TODOLIST_FILTER'
    todolistId: string
    filter: FilteredTasksType
}
export type ActionsTypes = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

const initialState: Array<TodolistType> = []

export const todolistReducer = (state = initialState, action: ActionsTypes): Array<TodolistType> => {
        switch (action.type) {
            case 'REMOVE_TODOLIST':
                return state.filter((todolist) => todolist.id !== action.todolistId)
            case 'ADD_TODOLIST':
                return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state];
            case 'CHANGE_TODOLIST_TITLE':
                return state.map((todolist) =>
                    todolist.id === action.todolistId ? {...todolist, title: action.title} : todolist)
            case "CHANGE_TODOLIST_FILTER":
                return state.map((todolist) =>
                    todolist.id === action.todolistId ? {...todolist, filter: action.filter} : todolist)
            default:
                return state
        }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {
        type: "REMOVE_TODOLIST",
        todolistId
    }
}
export const addTodolistAC = (newTodolistTitle: string, todolistId: string): AddTodolistAT => {
    return {
        type: 'ADD_TODOLIST',
        title: newTodolistTitle,
        todolistId: todolistId
    }
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleAT => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        todolistId,
        title
    }
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilteredTasksType): ChangeTodolistFilterAT => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        todolistId: todolistId,
        filter
    }
}
/*

 */
/*
RemoveTodolistAT - AT - Action Type

Тип действия и набор данных формируют совокупную сущность
Каждому типу действия соответствует определенный набор данных которые необходимы для преобразования исходного стейта

Тип преобразования и необходимые данные мы упакуем в один объект
этот объект поскольку он описывает тип действия называют action
 */