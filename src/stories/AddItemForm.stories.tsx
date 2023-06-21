import type {Meta, StoryObj} from '@storybook/react';
import AddItemForm, {AddItemFormType} from "../AddItemForm";
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const meta: Meta<typeof AddItemForm> = {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            //action: 'clicked'
        }
    }
};

export default meta;

type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    args: {
        addItem: action('Button clicked inside form')
    }
};

export const AddItemFormWithErrorStory = (args: AddItemFormType) => {

        let [error, setError] = useState<boolean>(true)
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
                args.addItem(trimmedInputValue)
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
                </Button>!
            </div>
        );

}
