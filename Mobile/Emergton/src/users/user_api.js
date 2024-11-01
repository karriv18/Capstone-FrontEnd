import ApiManager from '../helper/ApiManager';

 const user_login = async data => {
    try { 
        const result = await ApiManager('/auth/login', { 
            method: 'POST', 
            headers: { 
                'content-type': 'application/json', 
            }, 
            data: data
        })
        return result;
    } catch(error){ 
        console.log(error)
    }
}
export default user_login;