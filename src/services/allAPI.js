import { BASE_URL } from "./baseurl";
import { commonAPI } from "./commonAPI";

// register api

export const registerAPI = async(user)=>{
 return await commonAPI('POST',`${BASE_URL}/user/register`,user,"")
}


// login api

export const loginAPI = async(user)=>{
    return await commonAPI('POST',`${BASE_URL}/user/login`,user,"")   // " " means header should contain application/json data
}

// add project
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${BASE_URL}/projects/add`,reqBody,reqHeader)
}

// home project
export const homeProjectAPI = async()=>{
    return await commonAPI('GET',`${BASE_URL}/project/home-project`)
}

// all project
export const allProjectAPI = async(searchKey,reqHeader)=>{
    //query parameter :- path?key=value
    return await commonAPI('GET',`${BASE_URL}/project/all-project?search=${searchKey}`,"",reqHeader)
}

// user project
export const userProjectAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${BASE_URL}/user/project`,"",reqHeader)
}

// edit project
export const editProjectAPI = async(projectId,reqBody,reqHeader)=>{
    //project id is passed as path parameter
    return await commonAPI('PUT',`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

// delete project
export const deleteProjectAPI = async(projectId,reqHeader)=>{
    return await commonAPI('DELETE',`${BASE_URL}/project/remove/${projectId}`,{},reqHeader)
}

//profile update
export const updateProfileAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/user/update`,reqBody,reqHeader)
}