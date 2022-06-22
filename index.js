const canv = document.querySelector("canvas");
const mainImg = "assets/img/img.jpg";
const ctx = canv.getContext("2d");
const download = document.querySelector(".btn-save");
const inputs = document.querySelectorAll(".filters input");
const screen = document.querySelector(".fullscreen");
const outputs = document.querySelectorAll(".filters output");
let image = null;
let imgSrc;
let LoadImg;
let loadActive = false;
const loadFile = document.querySelector("#btnInput");
const btnContainer = document.querySelector(".editor img");
const btnNext = document.querySelector(".btn-next");
const baseImg =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/";
const timeOfDay = ["day", "evening", "night", "morning"];
const listImage = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];
const btnReset = document.querySelector(".btn-reset");
// fullscreen
screen.addEventListener("click", toggleScreen);
function toggleScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  }
}
draw();
filterOption();

//draw img in canvas
function draw(src=mainImg) {
  const img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.src = src;
  img.onload = function () {
    canv.width = img.width;
    canv.height = img.height;
    ctx.filter = `blur(${inputs[0].value}px) invert(${inputs[1].value}%) sepia(${inputs[2].value}%) saturate(${inputs[3].value}%) 
    hue-rotate(${inputs[4].value}deg) brightness(${inputs[5].value}%) contrast(${inputs[6].value}%) grayscale(${inputs[7].value}%)`;
    ctx.drawImage(img, 0, 0);
  };
}

//save img
download.addEventListener("click", save);
function save() {
  let link = document.createElement("a");
  link.download = "image.png";
  link.href = canv.toDataURL();
  link.click();
  link.delete;
}
// filter
function load() {
  if (loadActive) {
    draw(LoadImg);
    return;
  }
  draw(imgSrc);
}
function changeFilters() {
  for (let i = 0; i < inputs.length; i++) {
    outputs[i].innerHTML = inputs[i].value;
  }
}
changeFilters();
function handleUpdate(el) {
  const suffix = el.target.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${el.target.name}`,
    el.target.value + suffix
  );
    load()
    }

function filterOption() {
    inputs.forEach((input) => input.addEventListener("input", handleUpdate));
      changeFilters();
      // load()
  }

// load files

loadFile.addEventListener("change", (event) => {
    event.stopPropagation();
    event.preventDefault();
    let files = event.target.files;
  const file = files[0];
  const reader = new FileReader();
  reader.onload = () => {
    draw(reader.result)
    loadImg = reader.result;
  };
  reader.readAsDataURL(file, 'UTF-8');
  loadActive=true;
  document.querySelector("#btnInput").value=''
});
// btn next-img
let i = 0;
let now = new Date();
let timeNow = now.getHours();
function getImg() {
  const index = i % listImage.length;
  let j;
  if (timeNow >= 12 && timeNow < 18) {
    j = 0;
  } else if (timeNow >= 18 && timeNow < 24) {
    j = 1;
  } else if (timeNow < 6 && timeNow >= 0) {
    j = 2;
  } else {
    j = 3;
  }
  const imgSrc = baseImg + timeOfDay[j] + "/" + listImage[index];
  console.log("🚀 ~ file: index.js ~ line 125 ~ getImg ~ imgSrc", imgSrc)
  draw(src=imgSrc)
  i++;
  btnNext.disabled = true;
  setTimeout(() => {
    btnNext.disabled = false;
  }, 1000);
}
btnNext.addEventListener("click", getImg);
//reset

function reset() {
    document.documentElement.style = "";
    inputs.forEach(element =>{
        element.value = element.defaultValue;
    outputs.forEach(output => {
        element.nextElementSibling.value = element.value;
      }) 
    });
    load()
     };
    btnReset.addEventListener('click', reset);
    console.log("🚀 ~ file: index.js ~ line 153 ~ btnReset", btnReset)

    // class of btn

    const btn=document.querySelectorAll('.btn');

    btn.forEach(item => item.addEventListener('click', ()=>{
      let currentBtn = item;
      if (!item.classList.contains('btn-active')) {
        for(let i=0; i<btn.length; i++) {
          if(btn[i] != currentBtn) {
            btn[i].classList.remove('btn-active');}
          }
          item.classList.add('btn-active')}
    }))
