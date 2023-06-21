import {
    addTaskAC,
    changeTaskStatusAC,
    changeTasksTitleAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducers'
import { TasksStateType } from '../App'
import {removeTodolistAC} from "./todolist-reducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC('juice', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('2', false, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId1'][1].isDone).toBe(true)
})

test('status of specified task should be changed', () => {

    const action = changeTasksTitleAC('2', 'whiskey', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('whiskey')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

/*

внутри проекта который мы устанавливаем когда пишем create react app typescript
в числе модулей которые устанавливаются есть специальная программа которая умеет запускать тесты
тесты (спец функции в спец файлах) мы указываем обращение к такому модулю когда пишем test в имени файла

когда мы запустим тест yarn test функция побежит по всему проекту и будет искать файлы с расширением test
потом этот модуль начнет внутри test файлов начнет запускать функции test

test принимает 2 параметра (1-й: наименование теста, 2-й: callback функция тест которая и будет запускаться
для тестирования кода )

________________________________________________________________________________________________________________________
test('correct todolist should be removed',
    () => {
    // данные
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const action: RemoveTodolistAT = {
        type: 'REMOVE_TODOLIST',
        payload: {
            todolistId: todolistId1
        }
    }

    // выполнение тестируемых действий
    const endState = todolistsReducers(startState, action)

    // проверка результата выполнения
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

or

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {
        type: "REMOVE_TODOLIST",
        payload: {
            todolistId
        }
    }
}

test('correct todolist should be removed',
    () => {
    // данные
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    // выполнение тестируемых действий
    const endState = todolistsReducers(startState, RemoveTodolistAC(todolistId1))

    // проверка результата выполнения
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
________________________________________________________________________________________________________________________
 */
