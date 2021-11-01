const filmovi = [
    {
        Odgledan : false,
        Naziv : "A onda si se ti pojavio",
        Godina : 2020,
        Drzava : "SAD",
        Napomena : "Romantični, komedija",
        Glumci : ["	Craig Ferguson", "Kathie Lee Gifford",  "Ford Kiernan", "Phyllida Law", "Brett James", "Elizabeth Hurley"]
    },
    {
        Odgledan : false,
        Naziv : "U mojoj glavi",
        Godina : 2015,
        Drzava : "SAD",
        Napomena : "Animirani, komedija",
        Glumci : ["Amy Poehler", "Phyllis Smith", "Richard Kind", "Bill Hader", "Lewis Black"]
    },
    {
        Odgledan : false,
        Naziv : "Razvedi me, zavedi me",
        Godina : 2003,
        Drzava : "SAD",
        Napomena : "Romantični, komedija, prejak naziv :D",
        Glumci : ["George Clooney", "Catherine Zeta-Jones", "Geoffrey Rush", "Cedric The Entertainer", "Edward Herrmann"]
    }
];

//funkcija za dodavanje redova u tabelu
function drawRow(filmArr){
    let tr = document.createElement('tr'); //kreiraj mi red za svaki element niza (za svaki objekat iz niza)

    let moviesRows = []; //ovo mi je potrebno za "punjenje" redova


    for(let key in filmArr){ //za svaki "kljuc" objekta mi kreiraj po jednu celiju

        if(key == 'Odgledan' && filmArr['Odgledan'] == true){ //ako se radi o ovoj koloni hocu checkbox. Ovo je hardkodovano, sigurno postoji bolji nacin da ovo rijesim?
            moviesRows.push(`<td><input type = "checkbox" checked></td>`);
            tr.classList.add('checked');
        }
        else if(key == 'Odgledan' && filmArr['Odgledan'] == false){
            moviesRows.push(`<td><input type = "checkbox"></td>`);
            tr.classList.add('notChecked');
        }
        else{
            moviesRows.push(`<td>${filmArr[key]}</td>`)
        }
    }



    tr.innerHTML = moviesRows.join(''); //dodaj mi kreirane celije u red
    document.getElementById("moviesTBody").append(tr); //na kraju sve to dodaj u body tabele

}


//iscrtaj mi redove za vec postojece filmove    
filmovi.forEach((e) => drawRow(e));


//modal
document.getElementById('showModal').addEventListener('click', () => {
    document.getElementById('form').innerHTML = `<div>
                                                    <label for="movieName" class="form-label">Naziv:</label>
                                                    <input type="text" class="form-control" id="movieName">
                                                    <span class="alert" id="movieNameSpan"></span>
                                                </div>
                                                <div>
                                                    <label for="movieYear" class="form-label">Godina:</label>
                                                    <input type="number" value="2021" min="1930" max="2021" class="form-control" id="movieYear">
                                                    <span class="alert" id="yearSpan"></span>
                                                </div>
                                                <div>
                                                    <label for="movieCounty" class="form-label">Država:</label>
                                                    <input type="text" class="form-control" id="movieCounty">
                                                    <span class="alert" id="countrySpan"></span>
                                                </div>
                                                <div class="mb-4">
                                                    <label for="note" class="form-label">Napomena:</label>
                                                    <input type="text" class="form-control" id="note">
                                                </div>
                                                <div>
                                                    <label for="actors" class="form-label">Glumci:</label>
                                                    <input type="text" class="form-control" id="actors">
                                                    <span class="alert" id="actorsSpan"></span>
                                                </div>
                                                <div class="mb-4 form-check">
                                                    <label class="form-check-label" for="watched">Odgledan</label>
                                                    <input type="checkbox" class="form-check-input" id="watched">
                                                </div>
                                                <div id="message"></div>
                                                <input type="button" id="addMovieBtn" class="btn btn-primary mt-3" value="Dodaj film">`

let addMovieBtn = document.getElementById('addMovieBtn');

addMovieBtn.addEventListener('click', () => drawInputs());
    
})

//"dohvati" mi vrijednosti iz polja forme
function getInputs(){
    //prvo mi pokupi sve unesene vrijednosti
    let movieNameInput = document.getElementById('movieName');
    let movieName = movieNameInput.value;

    let movieYearInput = document.getElementById('movieYear');
    let movieYear = parseInt(movieYearInput.value);

    let movieCountyInput = document.getElementById('movieCounty');
    let movieCounty = movieCountyInput.value;

    let noteInput = document.getElementById('note');
    let note = noteInput.value;

    let actorsInput = document.getElementById('actors');
    let actors = actorsInput.value.split(',');

    let watchedInput = document.getElementById('watched');
    let watched = watchedInput.checked;

    if(!checkInputs(movieName, movieYear, movieCounty, actors)) return false;

    //sad kad je sve ok vrati mi objekat
    return {
        Odgledan : watched,
        Naziv : movieName,
        Godina : movieYear,
        Drzava : movieCounty,
        Napomena : note,
        Glumci : actors
    }
}

//isprovjeravaj mi da li polja zadovoljavaju uslove
function checkInputs(movieName, movieYear, movieCounty, actors){

    let movieNameSpan = document.getElementById('movieNameSpan');
    let actorsSpan = document.getElementById('actorsSpan');
    let yearSpan = document.getElementById('yearSpan');
    let countrySpan = document.getElementById('countrySpan');
    let messageDiv = document.getElementById('message');

    movieNameSpan.innerHTML = '';
    actorsSpan.innerHTML = '';
    yearSpan.innerHTML = '';
    countrySpan.innerHTML = '';
    messageDiv.innerHTML = '';


    //Naziv mora da ima nesto upisano
    if(movieName.length == 0){
        movieNameSpan.innerHTML = '*Obavezno polje!';
        return false;
    }
 
    //Godina mora da bude izmedju 1930. i 2021.
    if(isNaN(movieYear)){
        yearSpan.innerHTML = '*Unesi godinu.';
        return false;
    }
    else if(movieYear < 1930){
        yearSpan.innerHTML = '*Godina ne može biti manja od 1930!';
        return false;
    }
    else if(movieYear > 2021){
        yearSpan.innerHTML = '*Hoćeš da odgledaš film koji još nije izašao? Ne može.';
        return false;
    }


    //Glumci moraju imati nesto upisano
    if(actors == ''){
        actorsSpan.innerHTML = '*Unesi bar jednog glumca!';
        return false;
    }

    //Hocu da provjerim da li je u polje za drzavu uneseno bar jedno slovo (ako je ista unoseno, posto je opciono) ili su samo brojevi ili sl. 
    let letters = /[a-zA-Z]/g;
    if(movieCounty.length !=0 && !letters.test(movieCounty)){
        countrySpan.innerHTML = 'Naziv države bez slova? Hm...';
    }
    
    //napomenu necu provjeravati, moze nekome nesto znaciti i 123 da unese tu

    //ako je sve ok vrati true
    return true;
    
}

//docrtaj mi redove koje dodaje korisnik
function drawInputs(){
    let inputs = getInputs();


    if(inputs){
        //iscrtaj mi novi red sa trenutnim objektom
        drawRow(inputs);

        //resetuj mi formu
        document.getElementById('form').reset();

        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = "Film uspješno dodat. Želiš da dodaš novi?"
    }
}


document.getElementById('tableDiv').addEventListener('change',function(e){

    if(e.target && e.target.type == 'checkbox' && e.target.checked){
        e.target.parentNode.parentNode.classList.remove('notChecked');
        e.target.parentNode.parentNode.classList.add('checked')
    }
    else if(e.target && e.target.type == 'checkbox' && !e.target.checked){
        e.target.parentNode.parentNode.classList.remove('checked');
        e.target.parentNode.parentNode.classList.add('notChecked')
    }
 });