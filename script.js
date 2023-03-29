fetch("http://localhost:4000/users", { method:
"GET, POST "
})
    .then(res => res.json())
    .then(data => console.log(data))