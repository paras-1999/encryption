import React,{useState} from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import ButtonGroup from '@mui/material/ButtonGroup';
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from 'react-router-dom';
import { Divider } from '@mui/material';
import Home from './Home'
import ChangePass from './ChangePass';
import Dcat from './Dcat';
import AddCat from './AddCat';
const dWidth=240;

const useStyle=makeStyles({
  
    drawer:{
        width:dWidth
    },
    active:{
        backgroundColor:'#f4f4f4'
    },
    sepration:{
        marginTop:"47px",
        padding:"10px",
        height:'89vh',
        width:'100%',
        justifyContent:"space-around",
        display:'flex',
        alignItems:"center",
        backgroundImage: `radial-gradient( circle farthest-corner at 10% 20%,  rgba(97,186,255,1) 0%, rgba(166,239,253,1) 90.1% )`
    }

});
const Layout =({match})=>{
// export default function Layout(){
    const classes=useStyle();
    const navigate = useNavigate();
    const [home, setHome] = useState(true);
    const [pass, setPass] = useState(false);
    const [cat, setCat] = useState(false);
    const [addcat, setAddcat] = useState(false)
    if(sessionStorage.getItem('user')!=undefined){
        var items=JSON.parse(sessionStorage.getItem('user'));
         var loger=items
      }

    return (
        <div style={{display:"flex"}}>
                <AppBar
                elevation={0}
                position="fixed"
                sx={{ width: `calc(100% - ${dWidth}px)`,backgroundColor:"#Ffffff"}}
                >
                    <Toolbar sx={{justifyContent:"space-between" ,'&>:not(styled)':{fontFamily:"'Aldrich', sans-serif"} }}>
                <Typography variant="h6" sx={{color:'#2196F3'}}>
                  Welcome : {loger.name}
                </Typography>
                <ButtonGroup variant="text"  >
                    <Button onClick={()=>{setPass(false);setHome(true);setCat(false);setAddcat(false)}} >Home</Button>
                    <Button onClick={()=>{setPass(true);setHome(false);setCat(false);setAddcat(false)}}>Change Password</Button>
                </ButtonGroup>
                <Button onClick={()=>navigate('/')} variant="contained" size="small" sx={{backgroundColor:"white", color:"black",fontFamily:"'Aldrich', sans-serif",'&:hover':{backgroundColor:"#F5F5F5 "}}} endIcon={<LoginIcon />}>Login Out</Button>
              </Toolbar>
                </AppBar>
                <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left" 
                classes={{paper:classes.drawer}}
                >
                    <Typography variant="h4" m={1} sx={{fontWeight:'lighter',fontFamily:"'Bevan', cursive",color:"#2196F3"}}>
                        NeoSOFT
                    </Typography>
                    <Typography variant="body2" mx={1} sx={{fontFamily:"'Aldrich', sans-serif",letterSpacing:'5px',color:"#B0C4DE"}}>
                    TECHNOLOGIES
                    </Typography>
                    <Divider />
                    <List>
                    
                       <ListItem
                            button
                            onClick={()=>{setPass(false);setHome(false);setCat(true);setAddcat(false)}}
                            
                        >
                            <ListItemIcon ><CategoryIcon color="info" /></ListItemIcon>
                            <ListItemText>Category</ListItemText>
                        </ListItem>
                        
                        <ListItem
                            button
                            onClick={()=>{setPass(false);setHome(false);setCat(false);setAddcat(true)}}
                        >
                            <ListItemIcon ><BorderColorIcon color="info" /></ListItemIcon>
                            <ListItemText>Add Category</ListItemText>
                        </ListItem>
                    </List>
                    

                    
                </Drawer>
                
        <div className={classes.sepration}>
            {home?<Home/>:''}
            {pass?<ChangePass />:''}
            {cat?<Dcat />:''}
            {addcat?<AddCat/>:''}
        </div>
        </div>
  
    )
}
export default Layout