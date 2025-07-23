export const BASEURL="https://upskilling-egypt.com:3003/api/v1";
export const BASEURL_IMG_URL="https://upskilling-egypt.com:3003";

// export const requestHeader ={
//     Authorization: `Bearer ${localStorage.getItem("token")}`
// }
export const requestHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};
/**************************Authentication URLS********************************** */
export const AUTHURLS={
    loginUrl:`${BASEURL}/Users/Login`,
    forgetPassUrl:`${BASEURL}/Users/Reset/Request`,
    resetUrl:`${BASEURL}/Users/Reset`,
    changePassUrl:`${BASEURL}/Users/ChangePassword`,
    verifyUrl:`${BASEURL}/Users/verify`,
    registerUrl:`${BASEURL}/Users/Register`,
   
}

/**************************Projects URLS*************************************** */
export const PROJECTSURLS={
    getAll:`${BASEURL}/Project/manager`,
    getAllEmployee:`${BASEURL}/Project/employee`,
    getAdd:`${BASEURL}/Project`,
    toggleUrl:(id:number)=>`${BASEURL}/Project/${id}`,
    
}
/**************************Tasks URLS*************************************** */
export const TASKSURLS={
    getAll:`${BASEURL}/Task/manager`,
    getAdd:`${BASEURL}/Task`,
    toggleUrl:(id:number)=>`${BASEURL}/Task/${id}`,
    statusUrl: (id:string)=>`${BASEURL}/Task/${id}/change-status`,
    getCount:`${BASEURL}/Task/count`,

}
/**************************Userss URLS*************************************** */
export const USERSSURLS={
    getUserssUrl:`${BASEURL}/Users/manager`,
    UserssUrl:`${BASEURL}/Users`,
    toggleStatusUrl:(id:any)=>`${BASEURL}/Users/${id}`,
    getCount:`${BASEURL}/Users/count`,

}

