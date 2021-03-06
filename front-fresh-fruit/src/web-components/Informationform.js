import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import '../styles/_informationform.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { api } from '../config'

const url = api + "/register"

function Informationform(props) {
    const [data, setData] = useState({
        "username": "",
        "password": "",
        "email": "",
        "first_name": "",
        "last_name": "",
        "address": "",
        "tel": "",
        "birth_date": "",
        "gender": "M",
        "nat_id": "",
        "user_type": props.user_type,
        "store_name": "",
        "bio":""
    });
    const [user_token, setUser_token] = useState()
    const history = useHistory();

    const [error, setError] = useState({
        'username': 'null',
        'password': 'null',
        'first_name': 'null',
        'last_name': 'null',
        'tel': 'null',
        'nat_id': 'null'
    })

    const checkState = () => {
        console.log("data: ", data)
        console.log("user-token: ", user_token)
    }

    var checkSubmit = error.username == ''
        && error.password == ''
        && error.first_name == ''
        && error.last_name == ''
        && error.tel == ''
        && error.nat_id == ''
        && data.username.length > 0

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log(data)

        let error2 = error;
        switch (e.target.name) {
            case 'username':
                error2.username = e.target.value.length < 8 ? 'Username must be more than 8 characters' : ''
                break;
            case 'password':
                var t = true
                if (6 > e.target.value.length || e.target.value.length > 20) {
                    t = false
                }
                error2.password = t ? '' : 'Password must be between 6 and 20 characters'
                break;
            case 'first_name':
                if (e.target.value.length < 0) {
                    error2.first_name = 'You must input your first name'
                    break
                } else if (!/^[a-zA-Z]+$/.test(e.target.value)) {
                    error2.first_name = 'Your name must contain only a-z or A-Z'
                    break
                }else if (!/^[a-zA-Z]+$/.test(data.first_name) && e.target.value.length > 1) {
                    error2.first_name = 'Your name must contain only a-z or A-Z'
                    break
                } else {
                    error2.first_name = ""
                    break
                }
            case 'last_name':
                if (e.target.value.length < 0) {
                    error2.last_name = 'You must input surname'
                    break
                } else if (!/^[a-zA-Z]+$/.test(e.target.value)) {
                    error2.last_name = 'Your surname must contain only a-z or A-Z'
                    break
                }else if (!/^[a-zA-Z]+$/.test(data.last_name) && e.target.value.length > 1) {
                    error2.last_name = 'Your surname must contain only a-z or A-Z'
                    break
                } else {
                    error2.last_name = ""
                    break
                }
            case 'tel':
                if (!/^[0-9]+$/.test(e.target.value)) {
                    error2.tel = 'Your phone number must contain only 0-9'
                    break
                }else if (!/^[0-9]+$/.test(data.tel) && e.target.value.length > 1) {
                    error2.tel = 'Your phone number must contain only 0-9'
                    break
                } else if (e.target.value.length < 10) {
                    error2.tel = 'Phone number must have 10 characters'
                    break
                } else {
                    error2.tel = ""
                    break
                }
            case 'nat_id':
                if (!/^[0-9]+$/.test(e.target.value)) {
                    error2.nat_id = 'Your National ID must contain only 0-9'
                    break
                }else if (!/^[0-9]+$/.test(data.nat_id) && e.target.value.length > 1) {
                    error2.nat_id = 'Your National ID must contain only 0-9'
                    break
                } else if (e.target.value.length < 13) {
                    error2.nat_id = 'National ID must have 13 characters'
                    break
                } else {
                    error2.nat_id = ""
                    break
                }
        }
    }

    const onSubmit = async (e) => {
        if (checkSubmit == false) {
            alert('Please enter correct')
        } else {
            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    setUser_token(res.data)
                })
                .then(
                    history.push('/signin')
                )
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const storeName = () => {
        if (props.user_type === 'S') {
            return (<div class="form-group row">
                <div class='col-form-label col-sm-2' style={{ textAlign: "left" }}>
                    <label style={{ color: "red" }}>*</label><label>StoreName:</label></div>
                <div class='col-sm-6'>
                    <input class="form-control" type="text" name='store_name' style={{ marginLeft: '10px' }} placeholder="" onChange={handleChange} value={props.store_name} required />
                </div></div>)
        } else {
            return
        }

    }

    return (
        <div>
            <form style={{ padding: '2%' }}>
                <div class="form-group row">
                    <div class='col-form-label col-sm-2' style={{ textAlign: "left" }}>
                        <label style={{ color: "red" }}>*</label><label>Username:</label></div>
                    <div class="col-sm-6">

                        <input class="form-control" type="text" name="username" style={{ marginLeft: '10px' }} placeholder="" onChange={handleChange} value={props.username} required />

                        {error.username.length > 0 && <small class='errorInForm'>{error.username == 'null' ? '':error.username}</small>}
                    </div>
                </div>

                <div class="form-group row">
                    <div class='col-form-label col-sm-2' style={{ textAlign: "left" }}>
                        <label style={{ color: "red" }}>*</label><label>Name:</label></div>
                    <div class='col-sm-6'>
                        <input class="form-control" type="text" name="first_name" style={{ marginLeft: '10px' }} placeholder="" onChange={handleChange} value={props.first_name} required />

                        {error.first_name.length > 0 && <small class='errorInForm'>{error.first_name == 'null' ? '':error.first_name}</small>}
                    </div></div>

                <div class="form-group row">
                    <div class='col-form-label col-sm-2' style={{ textAlign: "left" }}>
                        <label style={{ color: "red" }}>*</label><label>Surname:</label></div>
                    <div class='col-sm-6'>
                        <input class="form-control" type="text" name="last_name" style={{ marginLeft: '10px' }} placeholder="" onChange={handleChange} value={props.last_name} required />

                        {error.last_name.length > 0 && <small class='errorInForm'>{error.last_name == 'null' ? '':error.last_name}</small>}
                    </div></div>

                <div class="form-group row">
                    <div class='col-form-label col-sm-2' style={{ textAlign: "left" }}>
                        <label style={{ color: "red" }}>*</label><label>Email:</label></div>
                    <div class='col-sm-6'>
                        <input class="form-control" type="email" name="email" style={{ marginLeft: '10px' }} placeholder="someone@outlook.com" onChange={handleChange} value={props.email == 'null' ? '':error.email} required />
                    </div></div>

                <div class="form-group row">
                    <div class='col-form-label col-sm-2' style={{ textAlign: "left" }}>
                        <label style={{ color: "red" }}>*</label><label>Password:</label></div>
                    <div class='col-sm-6'>
                        <input class="form-control" type="password" name="password" style={{ marginLeft: '10px' }} aria-describedby="passwordHelp" onChange={handleChange} value={props.password} maxlength='20' required />

                        {error.password.length > 0 && <small class='errorInForm'>{error.password == 'null' ? '':error.password}</small>}
                    </div></div>

                {storeName()}
                <div class="form-group row">
                    <div class='col-form-label col-sm-2' style={{ textAlign: "left" }}>
                        <label style={{ color: "red" }}>*</label><label>Address:</label></div>
                    <div class='col-sm-6'>
                        <textarea class="form-control" name='address' rows="3" style={{ marginLeft: '10px' }} onChange={handleChange} value={props.address} required></textarea>
                    </div></div>

                <div class="form-group row">
                    <div class='col-form-label col-sm-2' style={{ textAlign: "left" }}>
                        <label style={{ color: "red" }}>*</label><label>Tel:</label></div>
                    <div class='col-sm-6'>
                        <input class="form-control" type="tel" name="tel" style={{ marginLeft: '10px' }} placeholder="" onChange={handleChange} maxlength="10" value={props.tel} required />
                        {error.tel.length > 0 && <small class='errorInForm'>{error.tel == 'null' ? '':error.tel}</small>}
                    </div></div>

                <div class="form-group row">
                    <div class='col-form-label col-sm-2' style={{ textAlign: "left" }}>
                        <label style={{ color: "red" }}>*</label><label>Birthdate:</label></div>
                    <div class='col-sm-6'>
                        <input class="form-control" type="date" name="birth_date" style={{ marginLeft: '10px' }} placeholder="" onChange={handleChange} value={props.birth_date} required />
                    </div></div>
                <div class='form-group row'>
                    <legend class="col-form-label col-sm-2" style={{ textAlign: "left" }}>Gender</legend>
                    <div class="col-sm-3">
                        <div class="form-check form-check-inline" style={{ paddingRight: '18px' }}>
                            <input class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="M" onChange={handleChange} checked />
                            <label class="form-check-label" for="inlineRadio1">Male</label>
                        </div>
                        <div class="form-check form-check-inline" style={{ marginTop: '10px' }}>
                            <input class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="F" onChange={handleChange} />
                            <label class="form-check-label" for="inlineRadio2">Female</label>
                        </div>
                    </div>
                </div>

                <div class="form-group row">
                    <div class='col-form-label col-sm-2' style={{ textAlign: "left" }}>
                        <label style={{ color: "red" }}>*</label><label>NationalID:</label></div>
                    <div class='col-sm-6'>
                        <input class="form-control" type='tel' name="nat_id" onChange={handleChange} style={{ marginLeft: '10px' }} placeholder="x-xxxx-xxxxx-xx-x" maxlength='13' value={props.nat_id} required />
                        {error.nat_id.length > 0 && <small class='errorInForm'>{error.nat_id == 'null' ? '':error.nat_id}</small>}
                    </div></div>

                <div class='col-sm-8 col-reg-btn'>
                    {checkSubmit == false && <small class='errorInForm'>Please enter correct value</small>}
                    {checkSubmit == false ? <button type='submit' class='btn btn-primary register-btn' onClick={onSubmit} disabled>Register</button> : <button type='submit' class='btn btn-primary register-btn' onClick={onSubmit} >Register</button>}
                </div>
            </form>

        </div>

    );
}

export default Informationform;