const endpoint = "users"

// POST TEST:
// const body = {
//     name: "Johnny Doe",
//     username: "JohnX",
//     email: "j4@email.com",
// }
// fetch(`http://localhost:3000/${endpoint}`, {
//     method: "POST",
//     body: JSON.stringify(body),
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// })
//     .then((response) => response.json())
//     .then((json) => {
//         if (json["code"] == 11000) {
//             let val = Object.keys(json["keyValue"])[0]
//             console.log(`${val} is already used`)
//         }
//         console.log(json)
//     })

// GET TEST:
// fetch(`http://localhost:3000/${endpoint}`, {
//     method: "GET",
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// })
//     .then((response) => response.json())
//     .then((json) => console.log(json))

// PUT TEST:
// const body = {
//     name: "Johnny Test",
//     username: "JohnnyBoy",
//     email: "j@email.com",
// }
// fetch(`http://localhost:3000/${endpoint}/`, {
//     method: "PUT",
//     body: JSON.stringify(body),
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// })

// DELETE TEST:
// fetch(`http://localhost:3000/${endpoint}/`, {
//     method: "DELETE",
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// })


// TIMEOUT FUNCTION
// Promise.race([
//     fetchPromise,
//     new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 5000))
// ])
//     .then((response) => response.json())
//     .then((json) => console.log(json))
