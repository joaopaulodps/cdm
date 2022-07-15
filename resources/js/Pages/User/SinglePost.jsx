import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderSite from "../Headers/HeaderSite";
import api from "../../components/api";
import Title from "../../components/Title";
import FooterSite from "../Footer/FooterSite";

function UserSinglePost(){

    const { post_id } = useParams();
    const [post, setPost] = useState([]);
    const [msg, setMsg] = useState('');
    const [isLoading, setLoading] = useState('');

    useEffect(()=>{
        api.get(`/api/post/${post_id}`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if(response.data){
                console.log(response.data[0])
                setPost(response.data[0])
                /* setCategory(response.data[0]) */
            }
            else{
                setLoading(false)
                setMsg(response.data.msg)
            }
        })
    },[])

    return(
        <>
            <HeaderSite />
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        {isLoading == false && post && (   
                            /* posts list */
                            <div className="card-group" style={{maxWidth:"1200px"}}>
                                    {post.map(
                                        (p, i)=>
                                        (   
                                            <div key={"index"+i}>
                                                <h1>{p.title}</h1>
                                                <p style={{whiteSpace: 'pre-wrap'}}>{p.body}</p>
                                                <Title titulo={p.title} />
                                            </div>
                                        )
                                    )}
                            </div>
                        )}  
                    </div>
                </div>
            </div>
            <FooterSite />
        </>
    )

}

export default UserSinglePost;