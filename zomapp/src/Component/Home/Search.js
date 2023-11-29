import React,{useState,useEffect} from 'react';
import './Search.css';

const base_url = "http://3.17.216.66:4000";

function Search(){

    const [location,setLocation] = useState();
    const [restaurants,setRestaurants] = useState();

    useEffect(() => {
        fetch(`${base_url}/location`,{method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            setLocation(data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const  renderCity = (data) =>{
        if(data){
            return data.map((item) => {
                return(
                    <option value={item.state_id} key={item._id}>{item.state}</option>
                )
            })
        }
    }

    const  renderRest = (data) => {
        if(data){
            return data.map((item) => {
                return (
                    <option value={item.restaurant_id} key={item.restaurant_id}>
                        {item.restaurant_name} | {item.address}
                    </option>
                )
            })
        }
    }

    const handleCity = (event) => {
        let stateId = event.target.value;
        fetch(`${base_url}/restaurant?stateId=${stateId}`,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            setRestaurants(data)
        })
    }


    return(
        <div class="search">
                <div id="logo">
                    <span>D!</span>
                </div>
                <div id="heading">
                    Search Place Near To You
                </div>
                <div id="dropdown">
                    <select onChange={handleCity}>
                        <option>---Select City---</option>
                        {renderCity(location)}
                    </select>
                    <select className="restSelect">
                        <option>---Select Restaurants---</option>
                        {renderRest(restaurants)}
                    </select>
                </div>
            </div>
    )
}


export default Search