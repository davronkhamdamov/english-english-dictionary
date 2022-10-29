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
const loaderEl = document.getElementById('loader')
heroEl.style.display = "none"
document.addEventListener('DOMContentLoaded', () => {
    inputEl.focus()
})
buttonEl.addEventListener('click', (e) => {
    loaderEl.classList.remove('display')
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
        setTimeout(() => {
            loaderEl.classList.add('display')
        }, 1000)
        const tetEl = document.createElement('div')
        const exampEl = document.createElement('p')
        exampleEl.innerHTML = ''
        tetEl.classList.add('tet')
        exampEl.classList.add('examp')
        heroTitleEl.textContent = el.word;
        heroResultEl.textContent = el.phonetics[0].text || el.phonetics[1].text;
        playEl.src = el.phonetics[0].audio || el.phonetics[1].audio;
        el.meanings.forEach((e) => {
            e.definitions.forEach((ele) => {
                for (let key in ele) {
                    console.log(ele);
                    if (key === 'definition') {
                        console.log(ele[`${key}`]);
                        const exampleTextEl = document.createElement('p')
                        exampleTextEl.classList.add('example__txt')
                        exampleTextEl.textContent = ele[`${key}`];
                        tetEl.append(exampleTextEl);
                    } else if (key === 'example') {
                        const exampTxtEl = document.createElement('p')
                        exampTxtEl.classList.add('example__text')
                        exampTxtEl.textContent = "Example:  " + ele[`${key}`];
                        tetEl.append(exampTxtEl)
                    }
                }
            });
        });
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