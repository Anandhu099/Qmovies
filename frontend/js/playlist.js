

fetch(`http://127.0.0.1:8082/v1/auth/playlist/${localStorage.getItem("username")}`).then(data => data.json()).then((data) => {
    data.publicPlaylists.forEach(element => {
        addMovieToDOM(element, element.Title, element.Director, element.Poster)
        
    });
})


const addMovieToDOM = (element, title, description, image) => {

    let Element = document.createElement("div");
    Element.className = "MovieList"
    Element.style.height = "400px"
    Element.style.margin = "10px"
    let innerHTML = `
        <div class="movie-card ">
            <img style="height:200px ;width:250px"src=${image}>
            <h2 class="movie-title">${title}</h2>
            <p class="movie-description">${description}</p>
            <button onclick="handlePrivate(event)"class="login" id=${element._id}>Add to Private Playlist</button> 
        </div>
    `;

    Element.innerHTML = innerHTML;
    document.getElementById("publicData").appendChild(Element);
    
};
// document.addEventListener('DOMContentLoaded', addMovieToDOM);

const handlePrivate = (event) => {
    fetch("http://localhost:8082/v1/auth/move", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ Id: event.target.id })
    }).then((res) => res.json()).then((data) => {
        // window.location.reload();
        console.log(data,"daatatatattata")
        data.privatePlaylists.forEach(element => {
            console.log(element,"dfdfdfdf")
            addMovieToDOM(element, element.Title, element.Director, element.Poster)
            document.getElementById("privateData").appendChild(Element);
        })

    })
}