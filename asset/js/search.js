// url
let url = document.location.search;
const url_Query = new URLSearchParams(url);
const search_name = url_Query.get("search");

const url_search = "https://api.themoviedb.org/3/search/multi?";
let page = 0;
const img_url = "http://image.tmdb.org/t/p/w185/";
const notFound = "https://www.book.mn/uploads/book_author/nopic.jpg";

// content-body
const title = document.getElementById("genre-title");
const main_body = document.getElementById("main-body");
title.innerHTML += " "+search_name;



async function getMovie(nextPage){
    const movieData = await fetch(
        url_search+"api_key="+api_key+"&language="+lang+"&query="+search_name+"&page="+nextPage.toString());
    return await movieData.json();
}

async function loadMore(){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        page +=1;
        const movData = await getMovie(page);
        renderData(movData);
    }
}

function renderData(mData){
    let poster ="";
    mData.results.forEach(element => {
        (element.poster_path===null)?poster=notFound:poster=img_url+element.poster_path;
        main_body.innerHTML +=
            '<div class="card mb-4" style="max-width: 1300px;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);">'+
                '<div class="row g-0">'+
                    '<div class="col-md-2">'+
                        '<img src="'+poster+'" class="img-fluid rounded-start" alt="...">'+
                    '</div>'+
                    '<div class="col-md-10 col-sm-2">'+
                        '<div class="card-body">'+
                            '<h3 class="card-title"><strong>'+element.original_title+'</strong> ('+element.release_date.slice(0,4)+')</h3>'+
                            '<p class="card-text">'+element.overview+'</p>'+
                            '<a href="/detail.html?movie='+encodeURI(element.id)+'"><button class="btn btn-primary">See More</button></a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
    });

}

loadMore();
document.addEventListener('scroll',loadMore);




function gotoGenrePage(genre_page){
    let url_page = "/genre.html?genre=" + encodeURI(genre_page);
    document.location.href = url_page;
}

function gotoSearchPage(){
    let search = document.getElementById("movSearch").value;
    let url_page = "/search.html?search=" + encodeURI(search);
    document.location.href = url_page;
}