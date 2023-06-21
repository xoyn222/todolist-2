import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilteredTasksType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilteredTasksType
}

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function App(): JSX.Element {

    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const todolistId_3 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: "What to learn", filter: 'all'},
        {id: todolistId_2, title: "What to drink", filter: 'all'},
        {id: todolistId_3, title: "What to read", filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML CSS', isDone: true},
            {id: v1(), title: 'ES6 TS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'REDUX', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'WHISKEY', isDone: true},
            {id: v1(), title: 'COLA', isDone: true},
            {id: v1(), title: 'ICE', isDone: false},
            {id: v1(), title: 'BOURBON', isDone: false},
        ],
        [todolistId_3]: [
            {id: v1(), title: 'BULGAKOV', isDone: true},
            {id: v1(), title: 'PUSHKIN', isDone: true},
            {id: v1(), title: 'LERMONTOV', isDone: false},
            {id: v1(), title: 'GORKIY', isDone: false},
        ],
    })

    const changeTodolistFilter = (filter: FilteredTasksType, todolistId: string) => {
        const updatedTodolistsFilter = todolists.map((todolist) =>
            todolist.id === todolistId ? {...todolist, filter: filter} : todolist)
        setTodolists(updatedTodolistsFilter)
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        const updatedTodolistsTitle = todolists.map((todolist) =>
            todolist.id === todolistId ? {...todolist, title: title} : todolist)
        setTodolists(updatedTodolistsTitle)
    }
    const removeTodolist = (todolistId: string) => {
        const updatedTodolists = todolists.filter((todolist) => todolist.id !== todolistId)
        setTodolists(updatedTodolists)
    }
    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const updatedTasks = tasks[todolistId].filter(task => task.id !== taskId)
        setTasks({...tasks, [todolistId]: updatedTasks})
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        const updatedTasks = [newTask, ...tasks[todolistId]]
        setTasks({...tasks, [todolistId]: updatedTasks})
    }
    const changeTasksStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const updatedTasks = tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        setTasks({...tasks, [todolistId]: updatedTasks})
    }
    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        const updatedTasks = tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)
        setTasks({...tasks, [todolistId]: updatedTasks})
    }

    const getFilteredTasksForRender = (
        (tasks: Array<TaskType>, filter: FilteredTasksType): Array<TaskType> => {
            switch (filter) {
                case 'active' :
                    return tasks.filter(task => !task.isDone)
                case 'completed' :
                    return tasks.filter(task => task.isDone)
                default:
                    return tasks
            }
        })

    // UI:
    const todolistComponents = todolists.length
        ? todolists.map((todolist) => {
            const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[todolist.id], todolist.filter);
            return (
                <Grid item>
                    <Paper elevation={8} sx={{p: '20px', backgroundColor: 'transparent', color: 'black'}}>
                        <Todolist key={todolist.id}
                                  title={todolist.title}
                                  todolistId={todolist.id}
                                  tasks={filteredTasksForRender}
                                  removeTask={removeTask}
                                  changeTodolistFilter={changeTodolistFilter}
                                  addTask={addTask}
                                  changeTasksStatus={changeTasksStatus}
                                  filter={todolist.filter}
                                  removeTodolist={removeTodolist}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            )
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

export default App;

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