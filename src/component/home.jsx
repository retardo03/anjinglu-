import React,{Component} from 'react';
import Axios from 'axios'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import { render } from '@testing-library/react';
import { FaStar } from "react-icons/fa";



class  Home extends Component {
    state = {  
        categories:[],
        restaurants:[]
    }
    componentDidMount(){
        Axios.get('https://developers.zomato.com/api/v2.1/categories',{
            headers:{
                ['user-key']:'1cbd07aa2c1b4c8b97cd76adb6faf381'
            }
        }).then((res)=>{
            console.log(res.data.categories)
            Axios.get('https://developers.zomato.com/api/v2.1/search?start=1&count=10&sort=rating',{
                headers:{
                    ['user-key']:'1cbd07aa2c1b4c8b97cd76adb6faf381'
                }
            })
            .then((res1)=>{
                console.log(res1.data.restaurants)
                this.setState({categories:res.data.categories,restaurants:res1.data.restaurants})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    renderCategories=()=> {
        if(this.state.categories.length===0){
            return 'Loading...'
        }
        return this.state.categories.map((val,index)=>{
            return(
                <option key={index}  value={val.categories.id}>{val.categories.name}</option>
            )
        }) 
    
    }
    renderCards=()=>{
        return this.state.restaurants.map((val,index)=>{
           return <div key={index} className='col-md-4 px-3 py-2'>
               <Card>
        <CardImg top width="100%" height={'200'} src={val.restaurant.featured_image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{val.restaurant.name}</CardTitle>
        <CardSubtitle><FaStar style={{color:'yellow'}}/>&nbsp; {val.restaurant.user_rating.aggregate_rating}</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <a href={val.restaurant.menu_url} target='_blank'>
          <Button>Button</Button> </a>
        </CardBody>
      </Card>
 
            </div>
        })

    }
    render(){
        return(
            <div>
                <div>
                <select>
                    {this.renderCategories()}
                </select>
               </div>
               <div className='row'>
                {this.renderCards()}
               </div>
            </div>
        )
    }
}

 
export default Home