import Cookies from "js-cookie";

export const registerCookie = Cookies.get('RegisterCookie');
export const loginCookie = Cookies.get('LoginCookie');
export const headers = {
   'Content-Type': 'application/json',
   Authorization: `Bearer ${loginCookie || registerCookie}`,
};
