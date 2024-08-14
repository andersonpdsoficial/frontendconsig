import axios from "axios";
import { get } from "http";

/* usado para não ficar repedindo codigo do base nos códigos*/

const getPost = async () =>{
    const response = await axios.get('http://127.0.0.1:8000/api');

    return response.data;
}
export default async function Axios(){
    const post = await getPost();
    console.log(post[0]);
    return(
        
        <h2>teste axios </h2>

       
    );
}
