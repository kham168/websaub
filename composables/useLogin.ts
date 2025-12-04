


export const useLogin = () => {
    const isLogin = ()=>{
        return localStorage.getItem('token')
    }
    return { isLogin }
}