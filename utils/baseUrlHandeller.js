// // Get Current Environment And Set BaseUrl
// export function baseUrlHandler() {
//   return JSON.parse(import.meta.env.VITE_PRODUCTION_ENV) == "true"
//     ? import.meta.env.VITE_BACKEND_BASE
//     : import.meta.env.VITE_BACKEND_BASE_LOCAL;
// }


// console.log("Base URL:", baseUrlHandler());


export function baseUrlHandler() {
  return import.meta.env.VITE_PRODUCTION_ENV === "true"
    ? import.meta.env.VITE_BACKEND_BASE
    : import.meta.env.VITE_BACKEND_BASE_LOCAL;
}

console.log("Base URL:", baseUrlHandler());