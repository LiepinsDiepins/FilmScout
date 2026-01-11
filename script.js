// elementi
const searchBtn = document.getElementById('searchBtnMain');
const movieInput = document.getElementById('movieInputMain');
const resultsBox = document.getElementById('movie');

const randomBox = document.getElementById('randomMovies');
const trendingBox = document.getElementById('trendingMovies');
const carBox = document.getElementById('carMovies');
const cartoonBox = document.getElementById('cartoonMovies');
const actionBox = document.getElementById('actionMovies');
const scifiBox = document.getElementById('scifiMovies');

// Filmu saraksti
const popularMovies = ['Avengers: Endgame','Spider-Man','The Batman','Top Gun','Black Panther','John Wick','The Dark Knight','Inception','Interstellar','The Matrix','Joker','Dune','Titanic','Coco'];
const trendingMovies = ['Oppenheimer','Barbie','The Flash','Guardians Vol 3','Ant-Man','Avatar 2','Black Adam','Everything Everywhere','The Whale','Elvis','Top Gun'];
const carMovies = ['Fast & Furious','Ford v Ferrari','Baby Driver','Drive','Mad Max','The Transporter','Gone in 60 Seconds','Bullitt','Rush','Need for Speed','Death Race','The Italian Job','Speed','Cars'];
const cartoonMovies = ['Spider-Verse','Lion King','Frozen','Toy Story','Finding Nemo','Shrek','Zootopia','Incredibles','Moana','Coco','Despicable Me','Dragon','Tangled','Puss in Boots','Encanto'];
const actionMovies = ['John Wick 4','Mission Impossible','Bourne','Die Hard','Taken','The Raid','Kill Bill','Gladiator','300','Expendables','Atomic Blonde','Nobody','Equalizer','Extraction','Mad Max'];
const scifiMovies = ['Dune 2','Matrix','Blade Runner','Arrival','Interstellar','Martian','Star Wars','Avatar','Guardians','Fifth Element','Edge of Tomorrow','Tenet','Inception','Terminator','Back to Future'];

document.addEventListener('DOMContentLoaded', function(){
    loadMovies(randomBox,popularMovies,10);
    loadMovies(trendingBox,trendingMovies,8);
    loadMovies(carBox,carMovies,8);
    loadMovies(cartoonBox,cartoonMovies,8);
    loadMovies(actionBox,actionMovies,8);
    loadMovies(scifiBox,scifiMovies,8);
});

// Search funkcija
searchBtn.addEventListener('click', function(){
    let q = movieInput.value.trim();
    if(q != ''){
        fetchMovie(q);
    }
});

movieInput.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        let q = movieInput.value.trim();
        if(q != ''){
            fetchMovie(q);
        }
    }
});

function loadMovies(box,movies,num){
    let shuffled = movies.sort(()=>0.5 - Math.random());
    let selected = shuffled.slice(0,num);

    selected.forEach(function(title){
        fetch('https://www.omdbapi.com/?t='+encodeURIComponent(title)+'&apikey=a833c3fc')
        .then(resp=>resp.json())
        .then(function(data){
            if(data.Response == "True"){
                let card = document.createElement('div');
                card.className = 'movie-card';
                card.tabIndex = 0;
                let poster = (data.Poster != 'N/A') ? data.Poster : 'https://via.placeholder.com/300x450/333/fff?text='+encodeURIComponent(data.Title);
                card.innerHTML = '<img src="'+poster+'" alt="'+data.Title+' poster"><div class="movie-info"><h3>'+data.Title+'</h3><p>'+data.Year+'</p></div>';

                card.addEventListener('click',function(){
                    movieInput.value = data.Title;
                    showMovie(data);
                });

                box.appendChild(card);
            }
        }).catch(function(){
        });
    });
}

// Fetch movie ar search
function fetchMovie(title){
    fetch('https://www.omdbapi.com/?t='+encodeURIComponent(title)+'&apikey=a833c3fc')
    .then(resp=>resp.json())
    .then(function(data){
        if(data.Response=="True"){
            showMovie(data);
        }else{
            resultsBox.innerHTML = 'Movie not found';
        }
    }).catch(function(){
        resultsBox.innerHTML = 'Error fetching movie';
    });
}

function showMovie(m){
    resultsBox.innerHTML = '';
    resultsBox.classList.add('active');

    let container = document.createElement('div');
    container.className = 'movie-details';

    let poster = document.createElement('img');
    poster.className = 'movie-poster';
    poster.src = (m.Poster != 'N/A') ? m.Poster : 'https://via.placeholder.com/300x450/333/fff?text='+encodeURIComponent(m.Title);
    poster.alt = m.Title + ' poster';
    container.appendChild(poster);

    let info = document.createElement('div');
    info.className = 'movie-info-large';

    let title = document.createElement('h2');
    title.textContent = m.Title + ' (' + m.Year + ')';
    info.appendChild(title);

    function addField(label, value){
        if(value && value != 'N/A'){
            let div = document.createElement('div');
            div.className = 'movie-field';
            div.style.marginBottom = '5px';
            div.textContent = label + value;
            info.appendChild(div);
        }
    }

    addField('⭐ Rating: ', m.imdbRating);
    addField('⏱ WatchTime: ', m.Runtime);
    addField('🎭 Genre: ', m.Genre);
    addField('', m.Plot);
    addField('Director: ', m.Director);
    addField('Cast: ', m.Actors);
    addField('Language: ', m.Language);
    addField('Awards: ', m.Awards);

    container.appendChild(info);
    resultsBox.appendChild(container);

    resultsBox.scrollIntoView({behavior:'smooth'});
}

// Scroll top poga
let topBtn = document.getElementById("myBtn");
window.onscroll = function(){
    if(document.documentElement.scrollTop > 100){
        topBtn.style.display = "block";
    }else{
        topBtn.style.display = "none";
    }
};
function topFunction(){
    document.documentElement.scrollTop = 0;
}
