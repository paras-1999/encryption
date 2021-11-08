import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
export default function Home() {
        if(sessionStorage.getItem('user')!=undefined){
        var items=JSON.parse(sessionStorage.getItem('user'));
        var loger=items
      }
    return (
        <div>
            <Card sx={{ width:"350px" }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://source.unsplash.com/random/?work,desk"
                    
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {loger.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {loger.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {loger.country},{loger.state},{loger.city}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    )
}
