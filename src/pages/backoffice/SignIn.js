import axios from "axios";
import Swal from 'sweetalert2';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import { React, useState } from 'react';

function SignIn() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const res = await axios.post(config.apiPath + '/user/signIn', user);

            if (res.data.token !== undefined) {
                localStorage.setItem('token', res.data.token);
                navigate('/home');
            }
        } catch (e) {
            if (e.response.status === 401) {
                Swal.fire({
                    title: 'Sign in',
                    text: 'username or password invalid',
                    icon: 'warning'
                })
            } else {
                Swal.fire({
                    title: 'error',
                    text: e.message,
                    icon: 'error'
                })
                console.log(e);
            }
        }
    }

    return (
        <div class="hold-transition login-page">
            <div class="login-box">
                <div class="login-logo">
                    <a href="../../index2.html"><b>Coffee </b>backoffice</a>
                </div>
                <div class="card">
                    <div class="card-body login-card-body">
                        <p class="login-box-msg">Sign in</p>

                        <div>
                            <div class="input-group mb-3">
                                <input type="username" class="form-control" placeholder="Username" onChange={e => setUser({ ...user, user: e.target.value })} />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control" placeholder="Password" onChange={e => setUser({ ...user, pass: e.target.value })} />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                {/* <div class="col-8">
                                    <div class="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label for="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div> */}
                                <div class="col-12">
                                    <button class="btn btn-primary btn-block" onClick={handleSignIn}>Sign In</button>
                                </div>
                            </div>
                        </div>

                        {/* <p class="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>
                        <p class="mb-0">
                            <a href="register.html" class="text-center">Register a new membership</a>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
