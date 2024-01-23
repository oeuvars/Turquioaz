export function parseJwt (cookie: string) {
   return JSON.parse(Buffer.from(cookie.split('.')[1], 'base64').toString());
}
