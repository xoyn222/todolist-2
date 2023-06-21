import {TasksStateType, TodolistType} from "../App";
import {tasksReducer} from "./tasks-reducers";
import {addTodolistAC, todolistReducer} from "./todolist-reducer";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []
    let newTodolistId = v1()

    const action = addTodolistAC('new todolist', newTodolistId)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)

    expect(keys[0]).toBe(action.todolistId)
    expect(endTodolistsState[0].id).toBe(action.todolistId)
})

