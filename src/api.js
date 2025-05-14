import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_MOCKAPI_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000
})
http.interceptors.response.use(({ data }) => data)
export const api = {
    todos: {
        getALL(params = {}) {
            const query = {};

            if (params.completed !== 'all') {
                query.complete = (params.completed === 'completed') ? true : false;
            }


            if (params.priority !== 'all') {
                query.priority = params.priority;
            }

            return http.get("todos", { params: query }).catch((error) => {
                return error?.response?.status === 404 ? [] : Promise.reject(error);
            });
        }


        ,
        create(data) {
            return http.post("todos", data);
        },
        update(id, data) {
            return http.put(`todos/${id}`, data);
        },
        delete(id) {
            return http.delete(`todos/${id}`);
        }
    }
}
// export const api = {
//     todos: {
//         getALL(params = {}) {
//             const searchParams = new URLSearchParams();
//             if (params.completed !== 'all') {
//                 searchParams.append('complete', params.completed === 'completed');
//             }
//             if (params.priority !== 'all') {
//                 searchParams.append('priority', params.priority);
//             }

//             return fetch(`${BASE_URL}todos?${searchParams.toString()}`, {
//                 method: 'GET',
//                 headers: { 'Content-Type': 'application/json' }
//             })
//                 .then((respnse) => {
//                     if (respnse.ok) return respnse.json();
//                     if (respnse.status === 404) return [];
//                 })
//         },
//         create(data) {
//             return fetch(`${BASE_URL}todos`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(data)

//             })
//                 .then((response) => !!response.ok && response.json())
//         },
//         update(id, data) {
//             return fetch(`${BASE_URL}todos/${id}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(data)

//             })
//                 .then((response) => !!response.ok && response.json())
//         },
//         delete(id) {
//             return fetch(`${BASE_URL}todos/${id}`, {
//                 method: 'DELETE'

//             })
//                 .then((response) => !!response.ok && response.json())
//         }
//     }
// }