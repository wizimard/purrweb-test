const options = { 
    'img': ['/assets/slider-img/1.jpg', 
            '/assets/slider-img/2.jpg', 
            '/assets/slider-img/3.jpg', 
            '/assets/slider-img/4.jpg', 
            '/assets/slider-img/5.jpg', 
            '/assets/slider-img/6.jpg', 
            '/assets/slider-img/7.jpg', 
            '/assets/slider-img/8.jpg', 
            '/assets/slider-img/9.jpg', 
            '/assets/slider-img/10.jpg'
        ],
    'speed': [10, 1]
}

let isProcessing = false;
let isClickedIndex = false;
let currentIndex = 1;
let timer;

function transpositionToEnd() {
    for (let i = 1; i < options.img.length; i++) {
        document.getElementById(`item${i}`).style.left = '100%';
    }
}
function transpositionToBegin() {
    for (let i = 2; i <= options.img.length; i++) {
        document.getElementById(`item${i}`).style.left = '-100%';
    }
}

const next = (params) => {
    let prevImgIndex = currentIndex;
    currentIndex++;
    if (currentIndex > options.img.length) {
        currentIndex = 1;
        transpositionToEnd();
    }

    const prevImg = document.getElementById(`item${prevImgIndex}`);
    const nextImg = document.getElementById(`item${currentIndex}`);

    let num = 0;
    timer = setInterval(() => {
        num += params[1];

        prevImg.style.left = `-${num}%`;
        nextImg.style.left = `${100 - num}%`;

        if (num == 100) {
            clearInterval(timer);
            isProcessing = false;
        }
    }, params[0]);

    document.getElementById(`index_${prevImgIndex}`).className = 'index';
    document.getElementById(`index_${currentIndex}`).className += ' index_current';
}

const prev = (params) => {
    let prevImgIndex = currentIndex;
    currentIndex--;
    if (currentIndex === 0) {
        currentIndex = options.img.length;
        transpositionToBegin();
    }

    const prevImg = document.getElementById(`item${prevImgIndex}`);
    const nextImg = document.getElementById(`item${currentIndex}`);

    let num = 0;
    timer = setInterval(() => {
        num += params[1];

        prevImg.style.left = `${num}%`;
        nextImg.style.left = `-${100 - num}%`;

        if (num == 100) {
            clearInterval(timer);
            isProcessing = false;
        }
    }, params[0]);

    document.getElementById(`index_${prevImgIndex}`).className = 'index';
    document.getElementById(`index_${currentIndex}`).className += ' index_current';
}
const startProcess = () => {
    if (isProcessing) return false;
    isProcessing = true;
    return true;
}
const clickPrevHandler = () => {
    if (isClickedIndex) return;
    startProcess() && prev(options.speed);
}
const clickNextHandler = () => {
    if (isClickedIndex) return;
    startProcess() && next(options.speed);
}
const clickIndexHandler = (e) => {
    if (isClickedIndex || isProcessing) return;
    isClickedIndex = true;
    const index_id = e.target.id;

    const index = parseInt(index_id.replace('index_', ''));
    let timer;

    if (index > currentIndex) {
        timer = setInterval(() => {
            startProcess() && next([1, 5]);
            
            if (currentIndex == index) {
                clearInterval(timer);
                isClickedIndex = false;
            }
        }, 1);
    }

    if (index < currentIndex) {
        timer = setInterval(() => {
            startProcess() && prev([1, 5]);
            
            if (currentIndex == index) {
                clearInterval(timer);
                isClickedIndex = false;
            }
        }, 1);
    }
}

window.onload = () => {
    const slider_content = document.querySelector('.slider__content');
    const index_content = document.querySelector('.slider-index');

    options.img.forEach((img, index) => {
        const divElement = document.createElement('div');
        divElement.className = 'slider__item';
        divElement.id = `item${index + 1}`;

        const pictureElement = document.createElement('picture');
        pictureElement.className = 'slider__picture';

        const imgElement = document.createElement('img');
        imgElement.className = 'slider__img';
        imgElement.src = img;
        imgElement.alt = 'slider-img';

        pictureElement.appendChild(imgElement);

        divElement.appendChild(pictureElement);

        slider_content.appendChild(divElement);

        const indexElement = document.createElement('div');
        indexElement.className = 'index';
        indexElement.id = `index_${index + 1}`;

        indexElement.addEventListener('click', clickIndexHandler)
        
        index_content.appendChild(indexElement);
    });

    document.getElementById('item1').style.left = 0;

    document.getElementById('index_1').className += ' index_current';

    document.querySelector('.slider__next').addEventListener('click', clickNextHandler);
    document.querySelector('.slider__prev').addEventListener('click', clickPrevHandler);
}