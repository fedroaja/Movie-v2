// url
let url = document.location.search;
const url_Query = new URLSearchParams(url);
const movie_id = url_Query.get("movie");

// api
const url_detail = "https://api.themoviedb.org/3/movie/";
const img_url = "http://image.tmdb.org/t/p/w185/";
const back_url = "http://image.tmdb.org/t/p/original/";
const notFound = "https://www.book.mn/uploads/book_author/nopic.jpg";
const vid_url ="https://www.youtube.com/embed/";
const castNotFound = "https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png";

// content
const parallax = document.getElementById("parallax");

Promise.all([
    fetch(url_detail+movie_id+"?api_key="+api_key+"&append_to_response=videos"),
    fetch(url_detail+movie_id+"/credits?api_key="+api_key+"&language="+lang)
]).then(([res1,res2]) => Promise.all([res1.json(),res2.json()]))
  .then(([data1,data2]) => {
      render_movie(data1);
      render_cast_crew(data2);

  })

// fetch(url_detail+movie_id+"?api_key="+api_key+"&append_to_response=videos")
//         .then(response => response.json())
//         .then(data => {
//             render_movie(data);
//         })


async function render_movie(movie){
    // tittle
    let d = new Date(movie.release_date);
    let yr = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d);
    let mo = new Intl.DateTimeFormat('en', {month: 'long'}).format(d);
    let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d);
    // genre
    let genre = "";
    movie.genres.forEach(element => {
        genre += element.name+", ";
    });
    // revenue
    let revenue ="";
    switch(movie.revenue){
        case 0: revenue="Unknown"
        break;
        default : revenue = (movie.revenue).toLocaleString('en-US',{style:'currency',currency: 'USD'});
    }
    // video
    switch(movie.videos.results.length){
        case 0 :
            document.getElementById("movTrailer").setAttribute('src',vid_url+"WVi883_90Y8?autoplay=1&mute=1");
            break;
        default :
            document.getElementById("movTrailer").setAttribute('src', vid_url+movie.videos.results[0].key);
    }
    // render
    parallax.style.backgroundImage = "url('"+back_url+movie.backdrop_path+"')";
    document.getElementById("movTitle").innerHTML = movie.original_title;
    document.getElementById("movYear").innerHTML = movie.release_date.slice(0,4);
    document.getElementById("movPoster").setAttribute('src', img_url+movie.poster_path);
    document.getElementById("detail-title").innerHTML = movie.original_title;
    document.getElementById("detail-release").innerHTML = `${da} ${mo} ${yr}`;
    document.getElementById("detail-genre").innerHTML = genre.slice(0, -2);
    document.getElementById("detail-rating").innerHTML = movie.vote_average;
    document.getElementById("detail-revenue").innerHTML = revenue;
    document.getElementById("detail-description").innerHTML = movie.overview
}

function gotoSearchPage(){
    let search = document.getElementById("movSearch").value.replace(/</g, "&lt;").replace(/>/g, "&gt;");;
    let url_page = "/search.html?search=" + encodeURI(search);
    document.location.href = url_page;
}

function render_cast_crew(data){
    
    let poster = "";
    data.cast.forEach(element => {
        (element.profile_path === null) ? poster=castNotFound:poster=img_url+element.profile_path;
        document.getElementById('cast-content').innerHTML += 
        '<div class="carousel-cell">'+
            '<img src="'+poster+'" alt="" class="p">'+
            '<h3 class="n">'+element.name+'</h3>'+
            '<h4 class="n">('+element.character+')</h4>'+
            '<p class="content"></p>'+
        '</div>';
    });
    data.crew.forEach(element => {
        (element.profile_path === null) ? poster=castNotFound:poster=img_url+element.profile_path;
        document.getElementById('crew-content').innerHTML += 
        '<div class="carousel-cell">'+
            '<img src="'+poster+'" alt="" class="p">'+
            '<h3 class="n">'+element.name+'</h3>'+
            '<h4 class="n">('+element.department+')</h4>'+
            '<p class="content"></p>'+
        '</div>';
    });
 
    var elem = document.querySelector('.carousel');
    var elem2 = document.getElementById('crew-content');
    var flkty = new Flickity( elem, {
    // options
    cellalign: 'right',
    pageDots: false,
    groupCells: '20%',
    selectedAttraction: 0.02,
    friction: 0.15,

    });
    
    var flkty2 = new Flickity( elem2, {
        // options
        cellalign: 'right',
        pageDots: false,
        groupCells: '20%',
        selectedAttraction: 0.02,
        friction: 0.15,

        });
        
    

}



