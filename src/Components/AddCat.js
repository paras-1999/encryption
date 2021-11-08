import { Paper, Stack,Button } from '@mui/material'
import React,{useRef} from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';
const client=axios.create({
    baseURL:"http://localhost:3002/Cat"
})
export default function AddCat() {
    const title = useRef('');
    const description = useRef('');
    const adder = async() => {
        if(title.current.value==''||description.current.value==''){
            alert("Fill the missing Field")
        }
        else{
        let newData={title:title.current.value,description:description.current.value}
        await client.post("",newData)
        alert('Category Added')
        }
    }
    return (
        <div>
            <Paper sx={{padding:'40px',width:"100%"}}>
                <Stack spacing={4}>
                <TextField  label="Title" variant="filled" inputRef={title}/>
                <TextField
                focused 
                inputRef={description}
                label="Description"
                multiline
                rows={8}
                placeholder="Description"
                />
                <Button variant="contained" color="info" onClick={adder} >submit</Button>
                </Stack>
            </Paper>
        </div>
    )
}
