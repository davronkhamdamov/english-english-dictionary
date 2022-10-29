const inputEl = document.getElementById('input')
const buttonEl = document.getElementById('btn')
const playBtnEl = document.querySelector('.fa-pause')
const pauseBtnEl = document.querySelector('.fa-play')
const heroTitleEl = document.querySelector('.hero__title')
const heroResultEl = document.getElementById('hero-result')
const phoragraphEl = document.querySelector('.phoragraph')
const playEl = document.getElementById('play')
const audioEl = document.querySelector('.audio')
const playMediaEl = document.getElementById('play-media')
const playMediEl = document.getElementById('play-media1')
const heroEl = document.querySelector('.hero')
const exampleEl = document.querySelector('.example')
heroEl.style.display = "none"
document.addEventListener('DOMContentLoaded', () => {
    inputEl.focus()
})
buttonEl.addEventListener('click', (e) => {
    e.preventDefault()
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputEl.value.trim()}`)
        .then(res => res.json())
        .then(data => result(data))
    heroEl.style.display = "block";
    inputEl.value = ''
})

/* <div class="tet">
     <p class="examp">Example<p class="example__text"></p></p>
    </div>
    <p id="example__txt"></p>
*/
function result(data) {
    data.forEach(el => {
        const tetEl = document.createElement('div')
        const exampleTextEl = document.createElement('p')
        const exampEl = document.createElement('p')
        const exampTxtEl = document.createElement('p')
        exampTxtEl.classList.add('example__txt')
        exampTxtEl.textContent = el.meanings[0].partOfSpeech
        exampleEl.innerHTML = ''
        tetEl.classList.add('tet')
        exampleTextEl.classList.add('example__text')
        exampEl.classList.add('examp')
        heroTitleEl.textContent = el.word;
        heroResultEl.textContent = el.phonetics[0].text || el.phonetics[1].text;
        exampleTextEl.textContent = el.meanings[0].definitions[0].example;
        phoragraphEl.textContent = el.meanings[0].definitions[0].definition;
        exampEl.textContent = exampleTextEl.textContent == '' ? '' : 'Example :'
        playEl.src = el.phonetics[0].audio || el.phonetics[1].audio;
        console.log(el.meanings[0].partOfSpeech);
        exampEl.append(exampleTextEl);
        tetEl.append(exampTxtEl, exampEl);
        exampleEl.append(tetEl);
    })
}








// play button

function playAudio() {
    playMediEl.classList.toggle('display')
    playMediaEl.classList.toggle('display')
    playBtnEl.classList.toggle('hidden')
    pauseBtnEl.classList.toggle('hidden')
}

audioEl.addEventListener('click', () => {
    playAudio()
    setTimeout(() => {
        playAudio()
    }, 1000)
    playEl.play()
})