// Retrieve the token from the cookie
export const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
};


export const getFullYear = () => {
    return new Date().getFullYear();
}
