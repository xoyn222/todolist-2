import {
    addTodolistAC,
    changeTodolistFilterAC,
    ChangeTodolistFilterAT, changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from './todolist-reducer'
import {v1} from 'uuid'
import {FilteredTasksType, TasksStateType, TodolistType} from '../App'
import {tasksReducer} from "./tasks-reducers";

// исходные данные
let todolistId1: string
let todolistId2: string

let startState: Array<TodolistType>

beforeEach(() => {
    // исходные данные
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

})

test('correct todolist should be removed',
    () => {
        // данные

        // выполнение тестируемых действий
        const endState = todolistReducer(startState, removeTodolistAC(todolistId1))
        // проверка результата выполнения
        expect(endState.length).toBe(1)
        expect(endState[0].id).toBe(todolistId2)
    })
test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'
    let newTodolistId = v1()
    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle, newTodolistId))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})
test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'
    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {

    let newFilter: FilteredTasksType = 'completed'
    const action: ChangeTodolistFilterAT = changeTodolistFilterAC(todolistId2, newFilter)
    const endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
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
    let newTodolistId = v1()
    const action = addTodolistAC('new todolist', newTodolistId)

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
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
