import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Users() {

    // => Values to pass to api
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    var i = 0;

    const handlesubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3999/data", values)
            .then((res) => {
                console.log("Result : ", res);                
            })
            .catch((err) => {
                console.log("Error : ", err)
                alert("Insertion Error...")
            });
            alert("Data Inserted");
    };

    const handleUpdate=(dataid)=>{        
        axios
            .post(`http://localhost:3999/updatedata/${dataid}}`, {dataid})
            .then((res) => {
                console.log("Data Updated")
            })
            .catch((err) => {
                console.log("Error : ", err)                
            });      
    }

    const handleDelete=(dataid)=>{    
        axios
            .post(`http://localhost:3999/deletedata/${dataid}`,{dataid})
            .then((res) => {
                console.log("Data Deleted");
            })
            .catch((err) => {
                console.log("Data Delete Error : ", err)
                alert("Data Delete Error...")              
            });
            alert("Deleted")
        }

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        // const getData = () => {
            axios.get("http://localhost:3999/login")
                .then((res) => {
                    setUserData(res.data);
                    console.log("Fetched Data : ", res.data);            
                })
                .catch((err) => {
                    console.log("Data fetching err", err);
                })
        // }
        // getData();
    }, [])    

    const handlechange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <div className="" style={{ marginTop: "2em" }}>
                <div className="mb-3 p-3">
                    <h1 className="text-center" style={{ "fontFamily": " 'Kalam', cursive" }}>Register Here</h1>
                </div>
                <form>
                    <div className="container my-2 d-flex justify-content-center" style={{ width: "100%" }}>
                        <div className="mx-3">
                            <label className="text-20"><i className="ph-fill ph-user"></i><b>&nbsp; Enter Email</b></label>
                            <input
                                className="form-control my-2"
                                type="text"
                                placeholder="First Name"
                                name="email"
                                value={values.email}
                                onChange={handlechange}
                                style={{ width: "31vw", marginTop: "20" }}
                            />

                            <label className="text-20"><i className="ph-fill ph-user"></i><b>&nbsp; Enter Password</b></label>
                            <input
                                className="form-control my-2"
                                type="text"
                                placeholder="Last Name"
                                name="password"
                                value={values.password}
                                onChange={handlechange}
                                style={{ width: "31vw", marginTop: "20" }}
                            />
                        </div>
                    </div>

                    <div className="text-center d-flex justify-content-center">
                        <div className="mx-3">
                            <input
                                className="btn btn-light py-2 px-3 my-3"
                                type="button"
                                value="Register"
                                onClick={handlesubmit}
                            />
                        </div>
                    </div>
                </form>
            </div>
            <table class="table container">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Password</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((element,index) => {
                        return (
                            <tr key={index}>
                                <th>{++i}</th>
                                <th>{element.email}</th>
                                <th>{element.password}</th>
                                <th><button className="btn btn-success" onClick={handleUpdate}>Update</button></th>
                                <th><button className="btn btn-danger" onClick={()=>handleDelete(element.id)}>Delete</button></th>                                
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </>
    );
}