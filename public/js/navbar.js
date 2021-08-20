const url_genre = "https://api.themoviedb.org/3/genre/movie/list?";
const api_key = "0d01da6c0d54676a717cec0e73c9bd74";
const lang = "en-US";

// dropdown
const dropDown_genre_1 = document.getElementById("dropdown-genre-1");
const dropDown_genre_2 = document.getElementById("dropdown-genre-2");

let genre_data = [];

let generate_genre = fetch(url_genre+"api_key="+api_key+"&language="+lang)
.then(res => res.json())
.then(data => {
    genre_data = data.genres;
    render_genre(genre_data);
}).catch(err => console.error(err));


function render_genre(genre){
    let divide = genre.length/2;
    for(let i=0; i< genre.length ; i++){
        if(i<divide){
            dropDown_genre_1.innerHTML +=
        '<li><a class="dropdown-item" href="/genre.html?genre='+genre[i].name+'">'+genre[i].name+'</a></li>';
        }else {
            dropDown_genre_2.innerHTML +=
        '<li><a class="dropdown-item" href="/genre.html?genre='+genre[i].name+'">'+genre[i].name+'</a></li>';
        }
    }
}


document.getElementById('movSearch').addEventListener('keyup', function(event){
    if(event.key === 'Enter'){
        console.log("tes");
        gotoSearchPage();
    }
})