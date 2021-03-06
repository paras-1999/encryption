import React,{useState,useRef} from 'react'
import { Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Select from '@mui/material/Select';
import ReCAPTCHA from "react-google-recaptcha";
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const client=axios.create({
    baseURL:"http://localhost:3001/EmpData"
})
const CryptoJS = require("crypto-js");
const regForName=RegExp(/^[A-Z a-z]{4,29}$/);
const regForPhone =RegExp(/^[7-9][0-9]{9}$/);
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass =RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
const countryList = [{name:"Australia",id:1},
    {name:"USA",id:2},
    {name:"India",id:3},
    {name:"UK",id:4},
    {name:"China",id:5},
    {name:"Germany",id:6}];
const stateList=[{name:'New South Wales',id:'nsw',country_id:1},
    {name:'Queensland',id:'ql',country_id:1},
    {name:'South Australia',id:'sa',country_id:1},
    {name:'Tasmania',id:'ta',country_id:1},
    {name:'Victoria',id:'vi',country_id:1},
    {name:'Alaska',id:'al',country_id:2},
    {name:'California',id:'ca',country_id:2},
    {name:'Florida',id:'fl',country_id:2},
    {name:'Hawaii',id:'hii',country_id:2},
    {name:'New York',id:'nyc',country_id:2},
    {name:'Delhi',id:'de',country_id:3},
    {name:'Goa',id:'goa',country_id:3},
    {name:'Punjab',id:'pu',country_id:3},
    {name:'Gujarat',id:'gu',country_id:3},
    {name:'Rajasthan',id:'rj',country_id:3},
    {name:'England',id:'el',country_id:4},
    {name:'Scotland',id:'sl',country_id:4},
    {name:'Wales',id:'wa',country_id:4},
    {name:'Northern Ireland',id:'ni',country_id:4},
    {name:'Zhejiang',id:'zh',country_id:5},
    {name:'Yunnan',id:'yu',country_id:5},
    {name:'Shanxi',id:'sx',country_id:5},
    {name:'Beijing Shi',id:'bs',country_id:5},
    {name:'Berlin',id:'ber',country_id:6},
    {name:'Bavaria',id:'bav',country_id:6}]
const cityList=[
    {name:'Sydney',state_id:'nsw'},{name:'Newcastle',state_id:'nsw'},
    {name:'Wollongong',state_id:'nsw'},{name:'Wagga Wagga',state_id:'nsw'},
    {name:'Orange',state_id:'nsw'},
    {name:'Brisbane',state_id:'ql'},{name:'Townsville',state_id:'ql'},
    {name:'Gold Coast',state_id:'ql'},{name:'Gold Coast',state_id:'ql'},
    {name:'Toowoomba',state_id:'ql'},{name:'Mackay',state_id:'ql'},
    {name:'Port Augusta',state_id:'sa'},{name:'Whyalla',state_id:'sa'},
    {name:'Port Pirie',state_id:'sa'},{name:'Murray Bridge',state_id:'sa'},
    {name:'Port Lincoln',state_id:'sa'},
    {name:'Hobart',state_id:'ta'},{name:'Launceston',state_id:'ta'},
    {name:'Devonport',state_id:'ta'},{name:'Burnie',state_id:'ta'},
    {name:'Ulverstone',state_id:'ta'},{name:'Evandale',state_id:'ta'},
    {name:'Zeehan',state_id:'ta'},
    {name:'Geelong',state_id:'vi'},{name:'Ballarat',state_id:'vi'},
    {name:'Bendigo',state_id:'vi'},{name:'Mildura',state_id:'vi'},
    {name:'Warrnambool',state_id:'vi'},{name:'Shepparton',state_id:'vi'},
    {name:'Anchorage',state_id:'al'},{name:'Juneau',state_id:'al'},
    {name:'Fairbanks',state_id:'al'},{name:'Ketchikan',state_id:'al'},
    {name:'Wasilla',state_id:'al'},{name:'Nome',state_id:'al'},
    {name:'San Francisco',state_id:'ca'},{name:'San Diego',state_id:'ca'},
    {name:'San Bruno',state_id:'ca'},{name:'Mountain View',state_id:'ca'},
    {name:'Irvine',state_id:'ca'},
    {name:'Orlando',state_id:'fl'},{name:'Tampa',state_id:'fl'},
    {name:'Jacksonville',state_id:'fl'},{name:'Naples',state_id:'fl'},
    {name:'Honolulu',state_id:'hii'},{name:'Kailua Kona',state_id:'hii'},
    {name:'Hilo',state_id:'hii'},{name:'Volcano',state_id:'hii'},
    {name:'Hawi',state_id:'hii'},{name:'Kailua',state_id:'hii'},
    {name:'Lahaina',state_id:'hii'},
    {name:'Albany',state_id:'nyc'},{name:'Syracuse',state_id:'nyc'},
    {name:'Buffalo',state_id:'nyc'},{name:'Elmira',state_id:'nyc'},
    {name:'Watertown',state_id:'nyc'},{name:'Watervliet',state_id:'nyc'},
    {name:'corning',state_id:'nyc'},{name:'Peekskillt',state_id:'nyc'},
    {name:'Karawal Nagar',state_id:'de'},{name:'New Delhi',state_id:'de'},
    {name:'Mehrauli',state_id:'de'},{name:'Alipur',state_id:'de'},
    {name:'Hastsal',state_id:'de'},
    {name:'Panaji',state_id:'goa'},{name:'Margao',state_id:'goa'},
    {name:'Vasco da Gama',state_id:'goa'},{name:'Mapusa',state_id:'goa'},
    {name:'Ponda',state_id:'goa'},{name:'Mormugao',state_id:'goa'},
    {name:'Canacona',state_id:'goa'},
    {name:'Amritsar',state_id:'pu'},
    {name:'Ludhiana',state_id:'pu'},
    {name:'Jalandhar',state_id:'pu'},
    {name:'Patiala',state_id:'pu'},
    {name:'Bathinda',state_id:'pu'},
    {name:'Ahmedabad',state_id:'gu'},
    {name:'Surat',state_id:'gu'},
    {name:'Vadodara',state_id:'gu'},
    {name:'Rajkot',state_id:'gu'},
    {name:'Gandhinagar',state_id:'gu'},
    {name:'Jaipur',state_id:'rj'},
    {name:'Udaipur',state_id:'rj'},
    {name:'Jodhpur',state_id:'rj'},
    {name:'Ajmer',state_id:'rj'},
    {name:'Kota',state_id:'rj'},
    {name:'London',state_id:'el'},
    {name:'Manchester',state_id:'el'},
    {name:'Birmingham',state_id:'el'},
    {name:'Liverpool',state_id:'el'},
    {name:'Edinburgh',state_id:'sl'},
    {name:'Glasgow',state_id:'sl'},
    {name:'Dundee',state_id:'sl'},
    {name:'Inverness',state_id:'sl'},
    {name:'Aberdeen',state_id:'sl'},
    {name:'Cardiff',state_id:'wa'},
    {name:'Swansea',state_id:'wa'},
    {name:'Newport',state_id:'wa'},
    {name:'Bangor',state_id:'wa'},
    {name:'Saint Asaph',state_id:'wa'},
    {name:'Belfast',state_id:'ni'},
    {name:'Ningbo',state_id:'zh'},
    {name:'Dali',state_id:'yu'},
    {name:'Taiyuan',state_id:'sx'},
    {name:'Chongqing',state_id:'bs'},
    {name:'	Hamburg',state_id:'ber'},
    {name:'Paris',state_id:'bav'}]
export default function Signup() {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const name = useRef('');
    const phone = useRef('');
    const email = useRef('');
    const age = useRef('');
    const pass1 = useRef('');
    const pass2 = useRef('');
    const [nameerror, setNameerror] = useState('');
    const [phoneerror, setPhoneerror] = useState('');
    const [emailerror, setEmailerror] = useState('');
    const [ageerror, setAgeerror] = useState('');
    const [pass1error, setPass1error] = useState('');
    const [pass2error, setPass2error] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();
    const register =()=>{
        setNameerror({msg:'',check:false})
        setPhoneerror({msg:'',check:false})
        setEmailerror({msg:'',check:false})
        setAgeerror({msg:'',check:false})
        setPass1error({msg:'',check:false})
        setPass2error({msg:'',check:false})

        if(name.current.value==''||phone.current.value==''||email.current.value==''||age.current.value==''||pass1.current.value==''||pass2.current.value==''||country==''||state==''||city==''||!verified){
            alert('Fill The Missing Field')
        }
        else if(!regForName.test(name.current.value)){
            setNameerror({msg:'Enter a Valid Name',check:true})
        }
        else if(!regForPhone.test(phone.current.value)){
            setPhoneerror({msg:'(Example:9310414915)',check:true})
        }
        else if(!regForEmail.test(email.current.value)){
            setEmailerror({msg:'Enter Vaild  Mail',check:true})
        }
        else if(+age.current.value<18){
            setAgeerror({msg:'18+ age Required',check:true})
        }
        else if(!regForPass.test(pass1.current.value)){
            setPass1error({msg:'6-16 Digit Password Atleast One Uppercase Lowercase & Special Character',check:true})
        }
        else if(pass2.current.value!=pass1.current.value){
            setPass2error({msg:'Password Not Match',check:true})
        }
        else{
            const cipherPass = CryptoJS.AES.encrypt(JSON.stringify(pass1.current.value),phone.current.value).toString();
            let newUser={name:name.current.value,phone:phone.current.value,email:email.current.value,age:age.current.value,password:cipherPass,country:country.name,state:state.name,city:city.name};
            client.post('',newUser);
            alert('Registered Successfully')
            navigate('/')
        }
    }

    return (
        <div style={{backgroundImage: 'radial-gradient( circle farthest-corner at 0.1% 53.8%,  rgba(255,182,172,1) 0%, rgba(255,123,172,1) 100.2% )',paddingBottom:"49px"}}>
                <Typography variant="h1" className="heading">Sign up</Typography>
                <Paper  sx={{width:"42%",mx:'auto',padding:"20px",boxSizing:'border-box'}}>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                    <TextField 
                    color="warning"
                    error={nameerror.check}
                    inputRef={name} 
                    fullWidth 
                    label="Enter Name" 
                    variant="outlined" 
                    helperText={nameerror.msg}
                    focused />
                    </Grid>
                    <Grid item md={6} xs={12}>
                    <TextField 
                    color="warning" 
                    error={phoneerror.check}
                    inputRef={phone}
                    fullWidth 
                    label="Phone No." 
                    variant="outlined"
                    helperText={phoneerror.msg}
                    focused />
                    </Grid>
                    <Grid item md={8} xs={12}>
                    <TextField 
                    color="warning" 
                    error={emailerror.check}
                    inputRef={email} 
                    fullWidth 
                    label="Enter Email" 
                    variant="outlined" 
                    helperText={emailerror.msg}
                    focused />
                    </Grid>
                    <Grid item md={4} xs={12}>
                    <TextField 
                    color="warning" 
                    error={ageerror.check}
                    inputRef={age} 
                    fullWidth 
                    label="Age" 
                    variant="outlined" 
                    helperText={ageerror.msg}
                    focused />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormControl error={pass1error.check}  variant="outlined" fullWidth focused color="warning">
                        <InputLabel >Create-Password</InputLabel>
                        <OutlinedInput
                            inputRef={pass1}
                            type={showPassword1 ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={()=>{setShowPassword1(!showPassword1)}}
                                edge="end"
                                >
                                {showPassword1 ? <VisibilityOff color="warning" /> : <Visibility color="warning" />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Create-Password"
                        />
                        <FormHelperText>{pass1error.msg}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormControl error={pass2error.check}  variant="outlined" fullWidth focused color="warning">
                        <InputLabel >R-Password</InputLabel>
                        <OutlinedInput
                            inputRef={pass2}
                            type={showPassword2 ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={()=>{setShowPassword2(!showPassword2)}}
                                edge="end"
                                >
                                {showPassword2 ? <VisibilityOff color="warning" /> : <Visibility color="warning" />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="R-Password"
                        />
                        <FormHelperText>{pass2error.msg}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item md={4} xs={12}>
                    <FormControl fullWidth  focused color="warning">
                    <InputLabel>Country</InputLabel>
                    <Select
                        label="Country"
                    >
                        {countryList.map((val)=>
                        <MenuItem key={val.name} value={val.name} onClick={()=>setCountry(val)}>{val.name}</MenuItem>
                        )}

                    </Select>
                    </FormControl>
                    </Grid>
                    <Grid item md={4} xs={12}>
                    <FormControl fullWidth  focused color="warning">
                    <InputLabel>State</InputLabel>
                    <Select
                        label="State"
                    >
                         {stateList.map((val)=>
                {if(country.id==val.country_id){
                    return (<MenuItem key={val.name} value={val.name} onClick={()=>setState(val)}>{val.name}</MenuItem>)
                }}
                )
                }

                    </Select>
                    </FormControl>
                    </Grid>
                    <Grid item md={4} xs={12}>
                    <FormControl fullWidth  focused color="warning">
                    <InputLabel>City</InputLabel>
                    <Select
                        label="City"
                    >
                         {cityList.map((val)=>
                {if(state.id==val.state_id){
                    return (<MenuItem key={val.name} value={val.name} onClick={()=>setCity(val)}>{val.name}</MenuItem>)
                }}
                )
                }

                    </Select>
                    </FormControl>
                    </Grid> 
                    <Grid item md={7} xs={12}>
                    <ReCAPTCHA
                        sitekey="6Le4ARwdAAAAAEE2RatEJxvjVSf_b5RGFunpWaB_"
                        onChange={()=>setVerified(!verified)}
                    />
                    </Grid>
                    <Grid item md={5} xs={12}>
                    <Button variant="contained" sx={{width:'100%',height:'74px',fontSize:'larger'}} onClick={register} color="warning" startIcon={< BorderColorRoundedIcon />}>
                    Register
                    </Button>
                    </Grid>
                </Grid>
                </Paper>
                <Typography sx={{paddingTop:'14px',textAlign:'center',color:'white',fontFamily:"'Bebas Neue', cursive",letterSpacing:'2px'}} variant="h6">Have an account? <Link to="/"> Log in </Link>
                </Typography>
            
        </div>
    )
}
