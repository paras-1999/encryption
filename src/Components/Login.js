import { Stack, Typography ,Button } from '@mui/material'
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import React,{useState,useRef,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const client=axios.create({
    baseURL:"http://localhost:3001/EmpData"
})
const CryptoJS = require("crypto-js");
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [empList, setEmpList] = useState([]);
    const [emailerror, setEmailerror] = useState('');
    const [passerror, setPasserror] = useState('');
    const email = useRef('');
    const pass = useRef('');
    const navigate = useNavigate();
    useEffect(() => {
        client.get()
        .then(res=>{setEmpList(res.data)})
        sessionStorage.removeItem('user')
    }, [])
    const validate = async ()=>{
        let e= await empList.find(x=>x.email===email.current.value)
        let eindex =  empList.indexOf(e);
        if(eindex+1){
            const bytes = CryptoJS.AES.decrypt(empList[eindex].password,empList[eindex].phone);
            const decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            if(decryptedPass===pass.current.value){
                sessionStorage.setItem('user',JSON.stringify(empList[eindex]));
                alert('done')
                navigate('/dash/home')
            }
            else{
                setPasserror({msg:'Password Not Matched',check:true})
            }
        }
        else{
            setEmailerror({msg:'Enter A Valid Mail',check:true})
        }
    }
    // console.log(empList)
    return (
        <div style={{backgroundImage: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(101,255,253,1) 0%, rgba(36,153,238,1) 90% )',paddingBottom:"74px"}}>
            <Typography variant="h1" className="heading">Log In</Typography>   
            <Paper  sx={{width:"25%",mx:'auto',padding:"20px",boxSizing:'border-box'}}>
                <Stack spacing={5}>
                    <AccountCircle  sx={{height:70 ,width:70,mx:'auto'}} color="info"/>
                    <TextField
                    error={emailerror.check}
                    helperText={emailerror.msg}
                    label="Email Id"
                    inputRef={email}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" >
                                <AccountCircle color="info"/>
                            </InputAdornment>
                        )
                    }}
                variant="outlined"
                focused
                color="info"
                />
                <FormControl variant="outlined" 
                error={passerror.check} 
                focused color="info"  >
                <InputLabel  >Password</InputLabel>
                <OutlinedInput
                inputRef={pass}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        color="info"
                        onClick={()=>{setShowPassword(!showPassword)}}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"    
                />
                <FormHelperText>{passerror.msg}</FormHelperText>
                </FormControl>
                <Button variant="contained" onClick={validate} color="info" size='large' sx={{width:'40%',alignSelf:'center'}}  endIcon={<LoginIcon />}>
                Login
                </Button>
                </Stack>
            </Paper> 
            <Typography sx={{paddingTop:'14px',textAlign:'center',color:'white',fontFamily:"'Bebas Neue', cursive",letterSpacing:'2px'}} variant="h6">Don't have an account? <Link to="/sign"> sign up </Link>
            </Typography> 
        </div>
    )
}
