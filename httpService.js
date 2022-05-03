import axios from "axios";
const baseURL="https://nameless-woodland-84868.herokuapp.com";
function get(url)
{   console.log(baseURL + url)
    return axios.get(baseURL + url);

}
function post(url,obj)
{   console.log(obj)
    return axios.post(baseURL+url,obj);

}
function deleteApi(url)
{   console.log(url)
    return axios.delete(baseURL+url);
}
function put(url,obj)
{   return axios.put(baseURL+url,obj);
}
export default{
    get,
    post,
    deleteApi,
    put,
};