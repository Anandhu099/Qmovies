const movies = async () => {
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=961b9cdc").then((res)=>res.json()).then((data)=>console.log(data))
}
movies()