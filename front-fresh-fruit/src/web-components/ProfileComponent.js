import React, { useState, useEffect } from 'react';
import '../App.scss';
import axios from 'axios';
import Background from '../pictures/seller.jpg'
import Mond from '../pictures/profile pic.png'
import EditPic from '../pictures/edit.png'
import { useHistory } from 'react-router-dom';
import UserContext from '../Context/UserContext'
import editIcon from '../pictures/edit.png'

import Store from '../web-components/ShowStore'

const url = "http://127.0.0.1:8000/api/getuser/";
const productUrl = "http://127.0.0.1:8000/api/getuserproduct/"

const Profile = (props) => {
    const history = useHistory();

    const [first_name, setFirst_name] = useState();
    const [last_name, setLast_name] = useState();
    const [address, setAddress] = useState();
    const [tel, setTel] = useState();
    const [user_type, setUser_type] = useState();
    const [product, setProduct] = useState([]);
    //for setup fetch data

    const fetchUser = async () => {
        const data = await axios.get(url + localStorage.getItem('Username'))
            .then(function (res) {
                setFirst_name(res.data.first_name)
                setLast_name(res.data.last_name)
                setAddress(res.data.address)
                setTel(res.data.tel)
                sellerOrBuyer(res.data.user_type)
            })
            .catch((err) => console.log(err))
        await getProduct();

    }

    async function getProduct() {
        try {
          const response = await axios.get(productUrl + localStorage.getItem('Username'));
          console.log("product",response.data);
          setProduct(response.data)
        } catch (error) {
          console.error(error);
        }
      }

    useEffect(() => {
        fetchUser();
        
    },[])

    const sellerOrBuyer = (status) => {
        console.log("status", status)
        status === "S" ? setUser_type("Seller") : setUser_type("Buyer")
    }

    return (
        //style={{backgroundImage:`url(${background})`}}
        <div>
            <div class="container-fluid" style={{ backgroundColor: "#6AC17D" }}>

                <div class="row" style={{ backgroundColor: "#6AC17D", height: "auto" }}>

                    {/* body */}
                    <div class="card card-login w-75">
                        <div class="row">
                            <div class="col-sm-3 col-xs-12">
                                <img src={Mond} class="profile-pic img-fluid  rounded " alt="Mond" />
                            </div>
                            <div class="card-body col-sm-6 col-xs-12">
                                <div class="row">
                                    <h5 class="card-title card-title-login ">{first_name}  {last_name} ( {user_type} )</h5>
                                    <a href="/editProfile" class="icon-block edit-icon">
                                        <i class="far fa-edit  " ></i>
                                    </a>

                                </div>

                                <p class="card-text">Address : {address}</p>
                                <p class="card-text">Tel : {tel}</p>
                                <p class="card-text">Address : {address}</p>
                                <UserContext.Consumer>
                                    {({ isloggedin, setLogin, clearToken, usertoken, getToken }) => (
                                        <div>
                                            <p class="card-text">Login status : {String(isloggedin)}</p>
                                            <p class="card-text">token : {getToken()}</p>

                                            <button class='btn btn-secondary' onClick={(e) => {
                                                e.preventDefault();
                                                clearToken()
                                                history.push('/signin')

                                            }}>Log out</button>
                                        </div>
                                    )}
                                </UserContext.Consumer>
                            </div>
                        </div>

                    </div>




                </div>
            </div>

            <Store product={product}/>
        </div>






    );
};

export default Profile;