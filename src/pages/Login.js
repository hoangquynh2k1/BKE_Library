import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';

const Login = ({setIsAuthenticated}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const path = "http://greenlibrary.somee.com/api/";

    const onSubmit = async (data) => {
        setLoading(true);
        axios.get(path + 'Login/CheckLogin?id=' + data.username + '&password=' + data.password)
            .then((response) => {
                if (response.data != null) {
                    const expirationMS = 2 * 24 * 60 * 60 * 1000;
                    const user = {
                        value: response.data,
                        expiration: Date.now() + expirationMS
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    setLoading(false);
                    setIsAuthenticated(true);
                    navigate('/');
                }
                else {
                    alert("Thông tin đăng nhập chưa chính xác!")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="login-content">
            <div className="login-box">
                <img src="/assets/img/logo.svg" alt="" className="logo" />
                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" {...register("username", { required: true })} />
                        {errors.username && <span>This field is required</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" {...register("password", { required: true })} />
                        {errors.password && <span>This field is required</span>}
                    </div>
                    <button type="submit" disabled={loading}> {loading ? "Loading..." : "Login"}  </button>
                </form>
                <a href="#">Quên mật khẩu?</a>
            </div>
        </div>
    );
};

export default Login;

