const url = "https://api.themoviedb.org/3/movie/";
const img_url = "http://image.tmdb.org/t/p/w185/";
const back_url = "http://image.tmdb.org/t/p/original/";
const notFound = "https://www.book.mn/uploads/book_author/nopic.jpg";
let page = 0;


const btn_indicator = document.getElementById("btn-indicator");
const slide_movie = document.getElementById("slide-movie");
let condition = "";

// body
const main_body = document.getElementById("main-body");
const load = document.getElementById("loader");

// let genre_data = [];
let now_playing = [];
fetch(url+"now_playing?"+"api_key="+api_key+"&language="+lang+"&page=1")
    .then(res => res.json())
    .then(data => {
        now_playing = data.results;
        render_slide(now_playing);
    }).catch(err=>console.error(err));

// Promise.all([
//     fetch(url_genre+"api_key="+api_key+"&language="+lang),
// ]).then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
//   .then(([data1, data2]) => {
//       genre_data = data1.genres;
//       now_playing = data2.results;
//       render_genre(genre_data);
//       render_slide(now_playing);
//   }).catch(err => console.log(err));





function render_slide(slide){
    for(let i=0 ; i < 5 ; i++){
        if(i==0) condition = "active";
        btn_indicator.innerHTML += 
        '<button type="button" style="background-color:black;" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="'+i+'" class="active" aria-current="true" aria-label="Slide 1"></button>';
        slide_movie.innerHTML += 
        '<div class="carousel-item '+condition+'" >'+
        '<img src="'+ back_url+slide[i].backdrop_path +'" class="d-block w-100" alt="..." loading="lazy">'+
        '<div class="carousel-caption d-none d-md-block" style="background-color:rgba(255, 255, 255, 0.5);color:black; padding:12px">'+
        '<h5>'+slide[i].original_title+'</h5>'+
        '<p>'+slide[i].overview+'</p>'+
        '<button class="btn btn-outline-dark" onclick="gotoDetailPage(\''+slide[i].id+'\')" style="margin-bottom: 12px;">See More</button>'
        '</div></div>';
        condition = "";
    }
}

async function getMovie(nextPage){
    const movieData = await fetch(
        url+"popular?"+"api_key="+api_key+"&language="+lang+"&page="+nextPage.toString());
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
    let poster = "";
    mData.results.forEach(element => {
        (element.poster_path===null)?poster=notFound:poster=img_url+element.poster_path;
        main_body.innerHTML += 
            "<div class='card-main card col-md-4 col-sm-12'>" +
                "<div class='tag-rate'><i class='fa fa-star' aria-hidden='true'></i> "+element.vote_average+"</div>"+
                "<img src='"+ poster +"' class='card-img-top img-fluid' alt='...' loading='lazy'>"+
                "<div class='card-body' id='"+element.id+"'>"+
                    "<h5 class='card-title'>"+element.original_title+"</h5>"+
                    "<p class='card-text'>"+element.release_date.slice(0,4)+"<br></p>"+
                "</div>"+
                "<div class='card-footer text-muted'>"+
                "<a href='/detail.html?movie="+encodeURI(element.id)+"'><button class='btn btn-primary' style='margin-bottom:12px;'>See More</button></a></div>"
            "</div>";
        element.genre_ids.forEach(genre =>{
            let idx = genre_data.findIndex(gen => gen.id === genre)
            let genreName = genre_data[idx].name;
            const card_genre = document.getElementById(element.id);
            card_genre.innerHTML += 
            '<a href="/genre.html?genre='+encodeURI(genreName)+'"><button type="button" class="btn btn-danger btn-sm" style="margin:4px">'+genreName+'</button></a>';
            
        })
    })
}

loadMore();
document.addEventListener('scroll',loadMore);

function gotoSearchPage(){
    let search = document.getElementById("movSearch").value.replace(/</g, "&lt;").replace(/>/g, "&gt;");;
    let url_page = "/search.html?search=" + encodeURI(search);
    document.location.href = url_page;
}
