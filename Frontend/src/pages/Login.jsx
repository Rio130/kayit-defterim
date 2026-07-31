import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";


function Login(){

    console.log("BENİM LOGIN DOSYAM ÇALIŞIYOR");


    const navigate = useNavigate();


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");



    async function handleLogin(e){

        e.preventDefault();


        try{


            const data = await login(
                email,
                password
            );


            console.log("LOGIN CEVABI:", data);



            if(data.token){


                console.log("TOKEN VAR");


                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
    "user",
    JSON.stringify({
        userId: data.userId,
        fullName: data.fullName,
        email: data.email
    })
);

                console.log(
                    "LOCAL TOKEN:",
                    localStorage.getItem("token")
                );


                navigate("/");


            }
            else{


                console.log("TOKEN YOK:", data);


                alert(data.message);


            }


        }
        catch(error){


            console.log(
                "LOGIN HATA:",
                error
            );


            alert(
                "Giriş sırasında hata oluştu"
            );


        }


    }





    return(

        <div className="login-page">


            <form onSubmit={handleLogin}>


                <h2>
                    Giriş Yap
                </h2>



                <input

                    id="email"

                    name="email"

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={
                        e=>setEmail(e.target.value)
                    }

                />




                <input

                    id="password"

                    name="password"

                    type="password"

                    placeholder="Şifre"

                    value={password}

                    onChange={
                        e=>setPassword(e.target.value)
                    }

                />




                <button type="submit">

                    Giriş

                </button>



            </form>


        </div>

    );

}


export default Login;