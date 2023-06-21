import React, {useCallback} from 'react';
import './App.css';
import {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTodolistAC,} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilteredTasksType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilteredTasksType
}

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function AppWithRedux(): JSX.Element {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const dipsatch = useDispatch()

    const addTodolist = useCallback((title: string) => {
        const newTodolistId = v1()
        dipsatch(addTodolistAC(title, newTodolistId))
    }, [dipsatch])

    // UI:
    const todolistComponents = todolists.length
        ? todolists.map((todolist) => {
            return <Grid item key={todolist.id}>
                    <Paper elevation={8} sx={{p: '20px', backgroundColor: 'white', color: 'black'}}>
                        <TodolistWithRedux todolistId={todolist.id}
                                           title={todolist.title}
                                           filter={todolist.filter}
                        />
                    </Paper>
                </Grid>
        })
        : <span>Create your first Todolist</span>

    return (
        <div className="App">
            <Paper elevation={5}>
                <AppBar position={'static'}>
                    <Toolbar>
                        <IconButton size={'large'}
                                    edge={'start'}
                                    color={'inherit'}
                                    aria-label={'menu'}
                                    sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h6'} component={'div'} sx={{flexGrow: 1}}>
                            Todolists
                        </Typography>
                        <Button color={'inherit'}>Login</Button>
                    </Toolbar>
                </AppBar>
            </Paper>
            <Container fixed>
                <Grid container sx={{p: '10px 0'}}>
                    <Paper elevation={5} sx={{backgroundColor: 'transparent', input: { color: 'black' } }}>
                        <AddItemForm addItem={addTodolist}/>
                    </Paper>
                </Grid>
                <Grid container spacing={2}>
                    {todolistComponents}
                </Grid>
            </Container>
        </div>
    );

}

export default AppWithRedux;

/*
Необходимо соблюдать порядок аргументов во всех callbackах

Create
Read (pagination, filtration, sorting)
Update (edit, modification)
Delete

React.useState() - вызов useState как метода объекта React
всегда когда происходит обновление интерфейса вызывается useState

Области видимости js
Блочная
Функциональная
Глобальная
Модульная

Мы пишем структуру которая называется проект
проектом управляет webpack (сборщик проектов)

Браузер TS не понимает TS мы используем только в разработке

useEffect(() => {
        console.log(tasksData)
    }, filter)

     const removeTask = (taskId: string, todolistId: string) => {
        // const tasksForUpdate = tasks[todolistId]
        // const updatedTasks = tasksForUpdate.filter(task => task.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = updatedTasks
        // setTasks(copyTasks)
        //
        const updatedTasks = tasks[todolistId].filter(task => task.id !== taskId)
        setTasks({...tasks, [todolistId]: updatedTasks})
        //
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        // const tasksForUpdate = tasks[todolistId] // 3 tasks
        // const updatedTasks = [newTask, ...tasksForUpdate] // 4 tasks
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = updatedTasks
        // setTasks(copyTasks)
        const updatedTasks = [newTask, ...tasks[todolistId]]
        setTasks({...tasks, [todolistId]: updatedTasks})
        //
        // setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }
    const changeTasksStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        // const tasksForUpdate = tasks[todolistId]
        // const updatedTasks = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = updatedTasks
        // setTasks(copyTasks)
        //
        const updatedTasks = tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        setTasks({...tasks, [todolistId]: updatedTasks})
        //
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})}
    }

*/