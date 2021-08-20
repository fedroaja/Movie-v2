// url
let url = document.location.search;
const url_Query = new URLSearchParams(url);
const genre_name = url_Query.get("genre");

// api
const url_api = "https://api.themoviedb.org/3/discover/movie?";

let page = 0;
const img_url = "http://image.tmdb.org/t/p/w185/";
const notFound = "https://www.book.mn/uploads/book_author/nopic.jpg";


// // dropdown
// const dropDown_genre_1 = document.getElementById("dropdown-genre-1");
// const dropDown_genre_2 = document.getElementById("dropdown-genre-2");
// // let genre_data = await genre_generate();
// // render_genre();

// content-body
const title = document.getElementById("genre-title");
const main_body = document.getElementById("main-body");
const load = document.getElementById("loader");
title.innerHTML = genre_name;

// let genre_id = 0;

// let genre_data = [];
// genre_generate().then(data => {
//     genre_data = data
//     render_genre(genre_data);
//     loadMore(find_id_genre(genre_data), genre_data);
// });

generate_genre
    .then(res => {
           loadMore(find_id_genre(genre_data), genre_data);

    }).catch(err => console.error(err))


// function genre_generate(){
//     return new Promise((resolve, reject) => {
//         fetch(url_genre+"api_key="+api_key+"&language="+lang)
//         .then(response => {
//             return response.json();
//         }).then(data => {
//             resolve(data.genres);
//         })
//     })
// }



// console.log(genre_id);
// fetch(url_api+"api_key="+api_key+"&language="+lang+"&with_genres="+genre_id+"")
// .then(response => response.json())
// .then(data => {
//     console.log(data)
// }).catch(err => console.log(err));


function find_id_genre(genre){
    let idx = genre.findIndex(gen => gen.name === genre_name)
    return genre[idx].id;
}

// async function render_genre(genre){

//     // const data = await genre_generate();
//     // loadMore(await find_id_genre(data.genres), data.genres);


//     let divide = genre.length/2;
//     for(let i=0; i< genre.length ; i++){
//         if(i<divide){
//             dropDown_genre_1.innerHTML +=
//         '<li><a class="dropdown-item" href="/genre.html?genre='+genre[i].name+'">'+genre[i].name+'</a></li>';
//         }else {
//             dropDown_genre_2.innerHTML +=
//         '<li><a class="dropdown-item" href="/genre.html?genre='+genre[i].name+'">'+genre[i].name+'</a></li>';
//         }
//     }
// }

async function loadMore(id,genreList){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        page +=1;
        const movData = await getMovie(id,page);
        renderData(movData,genreList);
    }
}

async function getMovie(id,nextPage){
    const movieData = await fetch(
        url_api+"api_key="+api_key+"&language="+lang+"&with_genres="+id+"&page="+nextPage.toString());
    return await movieData.json();
}

function renderData(mData,genreList){
    mData.results.forEach(element => {
        (element.poster_path===null)?poster=notFound:poster=img_url+element.poster_path;
        main_body.innerHTML += 
            "<div class='card-main card col-md-4 col-sm-12'>" +
                "<div class='tag-rate'><i class='fa fa-star' aria-hidden='true'></i> "+element.vote_average+"</div>"+
                "<img src='"+ poster +"' class='card-img-top img-fluid' alt='...'>"+
                "<div class='card-body' id='"+element.id+"'>"+
                    "<h5 class='card-title'>"+element.original_title+"</h5>"+
                    "<p class='card-text'>"+element.release_date.slice(0,4)+"<br></p>"+
                "</div>"+
                "<div class='card-footer text-muted'>"+
                "<a href='/detail.html?movie="+encodeURI(element.id)+"'><button class='btn btn-primary' style='margin-bottom:12px;'>See More</button></a></div>"
            "</div>";
        element.genre_ids.forEach(genre =>{
            let idx = genreList.findIndex(gen => gen.id === genre)
            let genreName = genreList[idx].name;
            const card_genre = document.getElementById(element.id);
            card_genre.innerHTML += 
            '<a href="/genre.html?genre='+encodeURI(genreName)+'"><button type="button" class="btn btn-danger btn-sm" style="margin:4px">'+genreName+'</button></a>';
            
        })
    })
}




document.addEventListener('scroll',function(){
    setTimeout(function(){
        loadMore(find_id_genre(genre_data), genre_data);
    },300)
});

function gotoSearchPage(){
    let search = document.getElementById("movSearch").value.replace(/</g, "&lt;").replace(/>/g, "&gt;");;
    let url_page = "/search.html?search=" + encodeURI(search);
    document.location.href = url_page;
}