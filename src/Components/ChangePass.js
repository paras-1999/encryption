import React, {useState,useRef} from 'react';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import axios from 'axios';
import { Button } from '@mui/material';
const CryptoJS = require("crypto-js");
const client=axios.create({
    baseURL:"http://localhost:3001/EmpData"
});
const regForPass =RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
export default function ChangePass() {
    if(sessionStorage.getItem('user')!=undefined){
        var items=JSON.parse(sessionStorage.getItem('user'));
        var loger=items
    }
    const oldpass = useRef('');
    const newpass = useRef('');
    const newpassr = useRef('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [oldpasserror, setOldpasserror] = useState('');
    const [newpasserror, setNewpasserror] = useState('');
    const [newpassrerror, setNewpassrerror] = useState('');
    const passChange = () => {
        setOldpasserror({msg:'',check:false})
        setNewpasserror({msg:'',check:false})
        setNewpassrerror({msg:'',check:false})
        const bytes = CryptoJS.AES.decrypt(loger.password,loger.phone);
        const decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(oldpass.current.value,newpass.current.value,newpassr.current.value)
       if(oldpass.current.value==''||newpass.current.value==''||newpassr.current.value==''){
           alert('fill the missing field')
       }
       else if(oldpass.current.value!=decryptedPass){
           setOldpasserror({msg:'Password not Matched',check:true})
       }
       else if(!regForPass.test(newpass.current.value)){
        setNewpasserror({msg:'6-16 Digit Password Atleast One Uppercase Lowercase & Special Character',check:true})
        }
        else if(newpass.current.value!=newpassr.current.value){
            setNewpassrerror({msg:'Password Not Match',check:true})
        }
        else{
            const cipherPass = CryptoJS.AES.encrypt(JSON.stringify(newpass.current.value),loger.phone).toString();
            loger.password=cipherPass;
            client.put(`${loger.id}`,loger);
            sessionStorage.setItem('user',JSON.stringify(loger))

        }
        }
    return (
        <div>
            <Paper component="form" sx={{padding:"20px"  , '&>:not(styled)':{display:'block',my:2}}}>
                <FormControl variant="outlined"
                 error={oldpasserror.check} 
                 focused color="info"  >
                <InputLabel  >Old Password</InputLabel>
                <OutlinedInput
                    inputRef={oldpass}
                    type={showPassword1 ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        color="info"
                        onClick={()=>{setShowPassword1(!showPassword1)}}
                        edge="end"
                        >
                        {showPassword1 ? <VisibilityOff />:<Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Old Password"
                    
                />
                <FormHelperText>{oldpasserror.msg}</FormHelperText>
                </FormControl>
                <FormControl variant="outlined"
                 error={newpasserror.check} 
                 focused color="info"  >
                <InputLabel  >New Password</InputLabel>
                <OutlinedInput
                    inputRef={newpass}
                    type={showPassword2 ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        color="info"
                        onClick={()=>{setShowPassword2(!showPassword2)}}
                        edge="end"
                        >
                        {showPassword2 ? <VisibilityOff />:<Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="New Password"
                    
                />
                <FormHelperText>{newpasserror.msg}</FormHelperText>
                </FormControl>
                <FormControl variant="outlined"
                 error={newpassrerror.check} 
                 focused color="info"  >
                <InputLabel  >R- Password</InputLabel>
                <OutlinedInput
                inputRef={newpassr}
                    type={showPassword3 ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        color="info"
                        onClick={()=>{setShowPassword3(!showPassword3)}}
                        edge="end"
                        >
                        {showPassword3 ? <VisibilityOff />:<Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="R- Password"
                    
                />
                <FormHelperText>{newpassrerror.msg}</FormHelperText>
                </FormControl>
                <Button variant="contained" color="info"  onClick={passChange} sx={{width:"100%",alignSelf:'center'}}>
                <ChangeCircleIcon />
                    </Button>        
            </Paper>
        </div>
    )
}
