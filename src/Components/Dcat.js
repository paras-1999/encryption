import React,{useEffect,useState} from 'react'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
const client=axios.create({
    baseURL:"http://localhost:3002/Cat"
})
export default function Dcat() {
    const [dataList, setDataList] = useState([]);
    useEffect(() => {
       updater()

    }, [])
    const updater = async ()=>{
        await client.get()
        .then(res=>{setDataList(res.data)})
    }
    const deleter = async(id)=>{
        await client.delete(`/${id}`)
        updater();
    } 
    return (
        <div style={{overflow: 'auto',height:"80vh"}}>
            <Grid container spacing={2}>
                {dataList.map((val,i)=>
                <Grid item md={4} xs={6}>
                <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`https://picsum.photos/200/300/?=${i}`}
                    
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {val.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {val.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                    <Button size="small" onClick={()=>deleter(val.id)}>Delete</Button>
                </CardActions>
            </Card>
                </Grid>
                )}
                
            </Grid>
        </div>
    )
}
