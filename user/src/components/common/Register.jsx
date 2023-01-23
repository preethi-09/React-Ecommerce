import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import AppURL from '../../api/AppURL';
import Login from '../../assets/images/login.png'
import axios from 'axios'

class Register extends Component {

     constructor() {
          super();
          this.state = {
               name: '',
               email: '',
               password: '',
               password_confirmation: '',
               message: '',
               loggedIn: false
          }
          this.error = {
               name: null,
               email: null,
               password: null,
               password_confirmation: null,
               message: null,
          }
     }

     handleChange = (e) => {

          var name = e.target.name;
          var value = e.target.value;
          this.setState({ [name]: value });

          if (name == 'name' && value == '') {
               this.error[name] = 'Name is required';
          } else if (name == 'name' && value != '') {
               this.error[name] = null;
          }
          if (name == 'email' && value == '') {
               this.error[name] = 'Email is required';
          } else if (name == 'email' && value != '') {
               if (!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
                    this.error[name] = 'Enter valid email ID';
               } else {

                    this.error[name] = null;
               }
          }
          if (name == 'password' && value == '') {
               this.error[name] = 'Password is required';
          } else if (name == 'password' && value != '') {
               if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
                    this.error[name] = 'error';
               } else {
                    this.error[name] = null;

               }
          }

          if (name == 'password_confirmation' && value == '') {
               this.error[name] = 'Confirm password is required'
          } else if (name == 'password_confirmation' && value !== '') {
               if (this.state.password == value) {
                    this.error[name] = null
               } else {
                    this.error[name] = "Confirm password not match";
               }
          }
     }



     // Register Form Submit Method 
     formSubmit = (e) => {
          e.preventDefault();
          let status = false;
          if(this.state.name =='' || this.error.name !=null ){
               this.error.name = "Name is required";
               status = true
          }
          if(this.state.email =='' || this.error.email !=null){
               this.error.email = "Email is required";
               status = true
          }
          if(this.state.password =='' || this.error.password !=null){
               this.error.password = "Password is required";
               status = true
          }
          if(this.state.password_confirmation =='' || this.error.password_confirmation !=null){
               this.error.password_confirmation = "Confirm password is required";
               status = true
          }

          if(status == true){
               this.setState({name:''});
               return false
          }
          const data = {
               name: this.state.name,
               email: this.state.email,
               password: this.state.password,
               password_confirmation: this.state.password_confirmation
          }

          axios.post(AppURL.UserRegister, data).then(response => {

               localStorage.setItem('token', response.data.token);
               this.setState({ loggedIn: true })
               this.props.setUser(response.data.user);

          }).catch(error => {

          });

     }


     render() {

          /// After Login Redirect to Profile Page 
          if (this.state.loggedIn) {
               return <Redirect to={'/profile'} />
          }

          if (localStorage.getItem('token')) {
               return <Redirect to="/profile" />
          }


          return (
               <Fragment>
                    <Container>
                         <Row className="p-2">
                              <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>

                                   <Row className="">
                                        <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                                             <Form className="onboardForm" onSubmit={this.formSubmit} >
                                                  <h4 className="section-title-login"> USER REGISTER </h4>

                                                  <div className=''>
                                                       <input className="form-control m-2" name='name' type="text" placeholder="Enter Your Name" onChange={(e) => { this.handleChange(e) }} />
                                                       <div style={{marginLeft:'10px'}} className='text-danger'>{this.error.name}</div>

                                                       <input className="form-control m-2" name='email' type="email" placeholder="Enter Your Email" onChange={(e) => { this.handleChange(e) }} />
                                                       <div style={{marginLeft:'10px'}} className='text-danger'>{this.error.email}</div>

                                                       <input className="form-control m-2" name='password' type="password" placeholder="Enter Your Password" onChange={(e) => { this.handleChange(e) }} />
                                                       {this.error.password != 'error' ? <div className='text-danger' style={{marginLeft:'10px'}}>{this.error.password}</div> :
                                                            <div style={{marginLeft:'10px'}} className='text-danger'>password field should contain <br />- at least one uppercase and one lowercase <br />- One special characters <br />- One number and minimum eight characters</div>
                                                       }

                                                       <input className="form-control m-2" name='password_confirmation' type="password" placeholder="Confirm Your Password" onChange={(e) => { this.handleChange(e) }} />
                                                       <div style={{marginLeft:'10px'}} className='text-danger'>{this.error.password_confirmation}</div>

                                                  </div>


                                                  <Button type="submit" className="btn btn-block m-2 site-btn-login"> Sign Up </Button>
                                                  <br></br> <br></br>
                                                  <hr />
                                                  <p> <b> Forget My Password? </b><Link to="/forget"><b> Froget Password </b> </Link> </p>

                                                  <p> <b> Already Have An Account ? </b><Link to="/login"><b> Login </b> </Link> </p>

                                             </Form>


                                        </Col>

                                        <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                             <img className="onboardBanner" src={Login} />
                                        </Col>
                                   </Row>






                              </Col>
                         </Row>
                    </Container>
               </Fragment>
          )
     }
}


export default Register
