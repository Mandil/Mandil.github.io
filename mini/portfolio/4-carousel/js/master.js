const nextBtn = document.querySelector('.btn-right');
const prevBtn = document.querySelector('.btn-left');

const bodyBG = [
  '#d2d5de, #d6dbe0, #d4d7e0',
  '#aea295, #ece3da, #c5bbaf',
  'rgb(121, 147, 147), rgb(211, 217, 190), rgb(161, 178, 162)',
  'rgb(164, 154, 151), rgb(234, 229, 225), rgb(190, 180, 178)',
  'rgb(227, 226, 226), rgb(246, 241, 241), rgb(241, 240, 240)'
]

const items = document.querySelectorAll('.items span');

const images = document.querySelectorAll('main img');
const numberOfImages = images.length;

const findCurrentImgID = ()=> {
  const currentImg = document.querySelector('img.active');
  const currentImgID = Number(currentImg.id.match(/\d+/)[0]);
  return currentImgID;
}

const toggleItems = (currentImgID, selectedID) => {
  items[currentImgID].classList.remove('selected');
  items[selectedID].classList.add('selected');
}

const changeCurrentImg = (currentImgID, selectedImgID) => {

  document.querySelector('body').style.background = `linear-gradient(to right, ${bodyBG[selectedImgID]})`;
  const currentImg = images[currentImgID];
  const nextImg = images[selectedImgID];
  toggleItems(currentImgID, selectedImgID);

  currentImg.classList.replace("active", "hidden");
  nextImg.classList.replace("hidden", "active");
}

const showNext = () => {
  const currentImgID = findCurrentImgID();
  const nextImgID = currentImgID == numberOfImages - 1 ? 0 : currentImgID + 1;
  changeCurrentImg(currentImgID, nextImgID);
}

const showPrev = () => {
  const currentImgID = findCurrentImgID();
  const prevImgID = currentImgID == 0 ? numberOfImages - 1 : currentImgID - 1;
  changeCurrentImg(currentImgID, prevImgID);
}

const selectImage = (e) => {
  const currentImgID = findCurrentImgID();
  const targetImgID = Number(e.currentTarget.id.match(/\d+/)[0]);
  changeCurrentImg(currentImgID, targetImgID);
}

const keypress = (e) => {
  if (e.key === 'ArrowRight') {
    showNext();
  } else if (e.key === 'ArrowLeft') {
    showPrev();
  }
}

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

document.addEventListener("keydown", keypress);

items.forEach(item => item.addEventListener('click', selectImage));
