import React, {ChangeEvent, FC, memo, useCallback, useMemo} from 'react';
import {FilteredTasksType} from "./App";
import AddItemForm from "./AddItemForm";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTasksTitleAC, removeTaskAC} from "./state/tasks-reducers";
import {
    changeTodolistFilterAC,
    ChangeTodolistFilterAT,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolist-reducer";
import {Task} from "./Task";

export type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilteredTasksType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const TodolistWithRedux: FC<TodolistPropsType> = memo((props): JSX.Element => {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId])
    const dipsatch = useDispatch()

    const addTask = useCallback((title: string) => dipsatch(addTaskAC(title, props.todolistId)), [props.todolistId])
    const removeTodolist = () => dipsatch(removeTodolistAC(props.todolistId))
    const handlerCreator = useCallback((filter: FilteredTasksType): () => void => (): ChangeTodolistFilterAT =>
          dipsatch(changeTodolistFilterAC(props.todolistId, filter)),[props.todolistId])
    const changeTodolistTitle = useCallback((title: string) => dipsatch(changeTodolistTitleAC(props.todolistId, title)), [props.todolistId])

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    if (props.filter === 'active') tasks = tasks.filter(t => !t.isDone);
    if (props.filter === 'completed') tasks = tasks.filter(t => t.isDone);

    const tasksItems: JSX.Element[] | JSX.Element =
        tasks.length
            ? tasks.map((task) => <Task task={task}
                                        todolistId={props.todolistId}
                                        key={task.id}
            />)
            : <span>Your taskslist is empty</span>

    return (
        <div className={'todolist'}>
            <h3 className={'todoH'}>
                <div className={'todoSpan'}>
                    <EditableSpan title={props.title} 
                                  changeTitle={changeTodolistTitle}
                    />
                </div>
                <IconButton size={'small'}
                            color={'primary'}
                            onClick={removeTodolist}
                            sx={{ml: '10px'}}
                >
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul ref={listRef}>
                {tasksItems}
            </ul>
            <div>
                <ButtonGroup size={'small'}
                             variant={'contained'}
                             sx={{height: '30px'}}
                             fullWidth
                >
                    <ButtonWithMemo handlerCreator={handlerCreator}
                                    variant={props.filter === 'all' ? 'outlined' : 'contained'}
                                    title={'all'}
                    />
                    <ButtonWithMemo handlerCreator={handlerCreator}
                                    variant={props.filter === 'active' ? 'outlined' : 'contained'}
                                    title={'active'}
                    />
                    <ButtonWithMemo handlerCreator={handlerCreator}
                                    variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                                    title={'completed'}
                    />
                </ButtonGroup>
            </div>
        </div>
    );
})

type ButtonWithMemoType = {
    title: FilteredTasksType
    variant: 'outlined' | 'contained'
    handlerCreator: (filter: FilteredTasksType) => () => void
}

const ButtonWithMemo: FC<ButtonWithMemoType> = memo(({...props}) => {
    return <Button onClick={props.handlerCreator(props.title)}
                   variant={props.variant}
    >{props.title}</Button>
})


/*

    // const onClickAllHandler = () => {props.changeFilter('all')}
    // const onClickActiveHandler = () => {props.changeFilter('active')}
    // const onClickCompletedHandler = () => {props.changeFilter('completed')}

     <button onClick={handlerCreator('all')}>All</button> - можно если
     handlerCreator - возвращает нам callback
      const handlerCreator = (filter: FilteredTasksType) => () => props.changeFilter(filter)


old version

    const Todolist: FC<TodolistPropsType> = (props): JSX.Element => {

        let [inputValue, setInputValue] = useState<string>('')

        const addTask = () => {
            props.addTask(inputValue)
        }

        const onChaneInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.currentTarget.value)
        }

        return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={inputValue} onChange={onChaneInputHandler}/>
                    <button onClick={addTask}>+</button>
                </div>
               <TasksList tasksData={props.tasksData} removeTask={props.removeTask}/>
                <div>
                    <button onClick={() => {props.changeFilter('all')}}>All</button>
                    <button onClick={() => {props.changeFilter('active')}}>Active</button>
                    <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
                </div>
            </div>
        );
    };

    export default Todolist;


ref version

import React, {ChangeEvent, FC, useRef, useState} from 'react';
import TasksList from "./TasksList";
import {FilteredTasksType} from "./App";

export type TodolistPropsType = {
    title: string
    tasksData: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (title: FilteredTasksType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const Todolist: FC<TodolistPropsType> = (props): JSX.Element => {

    const ref = useRef<HTMLInputElement>(null)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input ref={ref}/>
                <button onClick={() => {
                    if(ref.current) {
                    props.addTask(ref.current.value)
                    ref.current.value = ''
                }
                }}>+</button>
            </div>
            <TasksList tasksData={props.tasksData} removeTask={props.removeTask}/>
            <div>
                <button onClick={() => {props.changeFilter('all')}}>All</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;
*/


/*
const Todolist: React.FC<TodolistPropsType> = (props) => {
the same with
const Todolist: FC<TodolistPropsType> = (props) => {   - need to import FC
the same with

___________________________________________________________________________

const Todolist = (props: TodolistPropsType) => {

const tasksItems = props.tasksData.length - проверяем длину массива на входе

const Todolist: FC<TodolistPropsType> = (props) => {

    const tasksItems = props.tasksData.length  // > 0 => ?
    ? props.tasksData.map(task => {
            return (
                <li>
                    <input type="checkbox" checked={props.tasksData[0].isDone}/>
                    <span>{props.tasksData[0].title}</span>
                </li>
            )
        })
    : <span>Your taskslist is empty</span>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
___________________________________________________________________________

const Todolist: FC<TodolistPropsType> = (props) => {

    const tasksItems = props.tasksData.length  // > 0 => ?
    ? props.tasksData.map(task => {
            return (
                <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                </li>
            )
        })
    : <span>Your taskslist is empty</span>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
_______________________________________________________________________________________________________________________
const removeTask = (taskId: string) => {
        setTasksData(tasksData.filter(t => t.id !== taskId))
        console.log(tasksData)
    }
Асинхронный код

Обычно интерпретатор выполняет код в порядке написания
1,2,3,4,5 строка и если мы пишем 4 строку то мы полагаем что 3-я строка к этому времени уже исполнена
так работает синхронный код

Но в некоторых случаях интерпретатор js работает не синхронно или работает какой-то код который
внутри себя содержит асинхроннсть
например это может быть запрос на сервер
после отправки запроса мы должны убедиться что данные с сервера получены
и только если мы получили ответ от сервера то только в этом случае мы начинаем разбирать ответ от сервера
если данные не получены то мы пользователю показываем крутилочку и он ждет пока данные будут получены

Метод setTasks не обновляет стейт синхронно он передает новое значение в useState
в котором есть свои оптимизации которые приводят к тому что стейт не обновляется мгновенно
то есть
    setTasksData(tasksData.filter(t => t.id !== taskId)) на эту операцию уходит 5 или 10 милисекунд
То есть мы обновляем стейт но на самом деле в эту же секунду стейт не обновляется
и мы получаем в консоли предыдущий стейт который существовал еще до setTasksData(tasksData.filter(t => t.id !== taskId))
console.log(tasksData)

setTasksData(tasksData.filter(t => t.id !== taskId)) - работает асинхронно
console.log(tasksData) - работает синхронно

Если мы хотим обрабатывать асинхронные изменения стейта
Если нам нужно дождаться изменний этого стейта есть хук useEffect

useEffect(() => {}, )

который будет выполнять функцию при этом он будет следить за переменными tasks которые мы передадим в специальный массив
зависимостей

useEffect(() => {},[tasksdata])

useEffect следит за нашей переменной tasksData если эта переменная будет вызвана
если tasksData изменится выведи ее в консоль

    useEffect(() => {
        console.log(tasksData)
    }, [tasksData])

в результате страница перерисовывается и в консоли видим уменьшение количества тасок в массиве
в этом случае при запуске useEffect отрабатыват 2 раза потому что в index.tsx стоит <React.StrictMode>
если его убрать то отрисуется 1 раз
________________________________________________________________________________________________________________________
    const getFilteredTasksForRender = () => {

        switch(filter) {
            case 'active' :
                return tasksData.filter(task => !task.isDone)                        the same
            case 'completed' :
                return tasksData.filter(task => task.isDone)
            default:
                return tasksData
        }
    }
________________________________________________________________________________________________________________________
        const getFilteredTasksForRender = () => {
        let tasksForRender: Array<TaskType> = tasksData

        if(filter === 'active') {
            tasksForRender = tasksData.filter(task => !task.isDone)                   the same
        }
        if(filter === 'completed') {
            tasksForRender = tasksData.filter(task => task.isDone)
        }
        return tasksForRender
    }
________________________________________________________________________________________________________________________
        const getFilteredTasksForRender = () => {
        let filteredTasksForRender;
        switch(filter) {
            case 'active' :
                filteredTasksForRender = tasksData.filter(task => !task.isDone)
                break
            case 'completed' :
                filteredTasksForRender = tasksData.filter(task => task.isDone)          the same
                break
            default:
                filteredTasksForRender = tasksData
        }
        return filteredTasksForRender
    }
________________________________________________________________________________________________________________________
    Желательно чтобы функция возвращали 1 return
*/