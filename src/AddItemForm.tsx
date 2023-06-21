import React, {
    ChangeEvent,
    FC,
    KeyboardEvent,
    memo,
    useState
} from 'react';
import {Button, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormType> = memo((props) => {

    let [error, setError] = useState<boolean>(false)
    let [inputValue, setInputValue] = useState<string>('')

    const onKeyPressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && addItem()
    }
    const onChaneInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setInputValue(event.currentTarget.value)
    }
    const addItem = () => {
        const trimmedInputValue = inputValue.trim()

        if (trimmedInputValue !== '') {
            props.addItem(trimmedInputValue)
        } else {
            setError(true)
        }
        setInputValue('')
    }

    const inputClass = error ? 'error' + 'defaultInput' : 'defaultInput'

    return (
        <div className={'addItemForm'}>
            <TextField value={inputValue}
                       onChange={onChaneInputHandler}
                       onKeyDown={onKeyPressInputHandler}
                       variant={'outlined'}
                       className={inputClass}
                       size={'small'}
                       label={'Enter your title'}
                       error={error}
                       helperText={error && 'Please, enter your title'}
                       InputLabelProps={{style: {fontFamily: 'Lora serif'}}}
            />
            <Button endIcon={<SendIcon/>}
                    onClick={addItem}
                    color={'primary'}
                    variant={'contained'}
                    sx={{m: '5px 0 5px 17px'}}
                    className={'defaultAdd'}
            >
            </Button>
        </div>
    );
})

export default AddItemForm;

/*
 let [inputValue, setInputValue] = useState<string>('')

знаем что пользователь пишет после каждого напечатываемого им символа

поиск при котором при каждом вводе символа будет производиться сортировка данных
можно реализовать только с помощью контролируемого инпута как здесь

 const onChaneInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setInputValue(event.currentTarget.value)
}

const addItem = () => {

    const trimmedInputValue = inputValue.trim()

    if (trimmedInputValue !== '') {
        p.addItem(trimmedInputValue)
    } else {
        setError(true)
    }
    setInputValue('')
}

<input value={inputValue}
       onChange={onChaneInputHandler}
       onKeyPress={onKeyPressInputHandler}
       className={inputClass}/>

or из виртуального дома обращаемся к реальному это не правильно

let newValue: RefObject<HTMLInputElement> = useRef(null)

пока пользователь не закончит печатать мы не знаем что оннаписал

const addItem = () => {
    if (newValue.current) {
        let newTitle = newValue.current.value.trim()
        if (newTitle !== '') {
            p.addItem(newTitle)
        } else {
            setError(true)
        }
        newValue.current.value = ''
    }
}

<input ref={newValue}
       onKeyPress={onKeyPressInputHandler}
       className={inputClass}/>

newValue.current ~ <input ref={newValue}

or

let newValue: RefObject<HTMLInputElement> = React.createRef(null)
 */