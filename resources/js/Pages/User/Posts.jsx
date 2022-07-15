import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderSite from "../Headers/HeaderSite";
import api from "../../components/api";
import Title from "../../components/Title";
import FooterSite from "../Footer/FooterSite";

function UserPosts(){

    const[posts, setPosts] = useState([]);
    const[msg, setMsg] = useState('');
    const[isLoading, setLoading] = useState('');

    useEffect(()=>{
        api.get(`/api/post`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if(response.data.status === 'success'){
                console.log(response.data)
                setPosts(response.data[0])
            }
            else{
                setLoading(false)
                setMsg(response.data.msg)
            }
        })
    },[])

    function FormatDate(dateTime){
        var date = new Date(dateTime);
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var fullDate = day + '/' + month + '/' + year
        return fullDate
    }

    return(
        <>
            <HeaderSite/>
            <Title titulo="Todos os Posts"/>
            <div className="container">
                <div className="listagem">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="row">
                                <h1 style={{justifySelf:"center"}}>Posts</h1>
                                {posts && (
                                    posts.map(
                                        (post, i)=>
                                        (   
                                            <div className="list-group" key={"index"+i}>
                                                <Link to={`/posts/id=${post.id}`} className="list-group-item" style={{marginBottom:"10px"}}>
                                                    <div className="d-flex w-100 justify-content-between">
                                                    <h4 className="mb-1">{post.title}</h4>
                                                    <small>Publicado em {FormatDate(post.created_at)}</small>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterSite />
        </>
    )

}

export default UserPosts;