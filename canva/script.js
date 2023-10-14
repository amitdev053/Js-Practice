

let storePhotosData;
let page = 2
let canvasImageId = 1
let activeObject = 1


function setHeight(){
    let selectDiv = document.getElementById('desginingPart').children

    if(selectDiv.length == 1){
        document.getElementById('CanvasOuterHeight').style.height = "100vh"
    }else{
        document.getElementById('CanvasOuterHeight').style.height = "100vh"
    }
}
setHeight()
function selectCanvas(current){
  console.log(current)
  let templateElement = document.getElementsByClassName('canvas_area')

  for(let i=0; i<=templateElement.length-1; i++){
console.log(templateElement[i]?.classList)
if(templateElement[i]?.classList.length  == 2){
  console.log("inside if condition")
  templateElement[i].classList.remove('selected_canvas_class')
}
else{ } // current.classList.add('selected_canvas_class') 

  }
  
  current.classList.add('selected_canvas_class')

}
function setActiveObject(currentObject){
  console.log(currentObject.classList[1])
      let targetObject = currentObject.classList[1]

      console.log(targetObject.includes('object'))

      let removeSelectedObject = document.getElementsByClassName('element')
console.log("removeSelectedObject",removeSelectedObject)


      for(let i=0; i<= removeSelectedObject.length; i++){

removeSelectedObject[i]?.classList.remove('selected_canvas_object')
      }

      if(targetObject.includes('object')){
        currentObject.classList.add('selected_canvas_object')
      }

  
}
function showPhotosElement(currentClick) {
  // console.log("Function Clik", currentClick.innerText)
  let removeActiveMenu = document.getElementsByClassName("link_div");

  for (let i = 0; i <= removeActiveMenu.length; i++) {
    if (removeActiveMenu[i]) {
      removeActiveMenu[i].classList.remove("sidemenu_active");
    }
  }
  let currentClickedMenu = currentClick.innerText;
  currentClick.classList.add("sidemenu_active");

  if (currentClickedMenu == "Photos") {
    document
      .getElementById("PhotosElement")
      .classList.remove("hide_element_div");
    document.getElementById("UploadElement").classList.add("hide_element_div");
    document.getElementById("TextElement").classList.add("hide_element_div");
  } else if (currentClickedMenu == "Uploads") {
    document
      .getElementById("UploadElement")
      .classList.remove("hide_element_div");
    document.getElementById("PhotosElement").classList.add("hide_element_div");
    document.getElementById("TextElement").classList.add("hide_element_div");
  } else {
    document.getElementById("TextElement").classList.remove("hide_element_div");
    document.getElementById("PhotosElement").classList.add("hide_element_div");
    document.getElementById("UploadElement").classList.add("hide_element_div");
  }
}

function setLoader() {
  let loader = document.getElementById("loader");
  loader.style.display = "flex";
}
function setLoaderfalse() {
  let loader = document.getElementById("loader");
  loader.style.display = "none";
}

async function getDynamicPhotos() {
  setLoader();
  try {
    let reqUrl = await fetch("https://fakestoreapi.com/products");
    let data = await reqUrl.json();
    storePhotosData = data;
    // storePhotosData.reverse();
    let photosElementRow = document.getElementById("photosElementRow");
    storePhotosData.map((currentData) => {
   //   console.log(currentData.image);
      let setcol = `
        <div class="col-4 p-0 element_image_cols">
                                <img src="${currentData.image}" alt="" class="img-fluid" onclick="setImage(this)" dragabble="true" />
        </div>        
        `;
      photosElementRow.innerHTML += setcol;
      setLoaderfalse();
    });
  } catch (err) {
    console.log("We could'nt fetching the Photos", err);
  }
}
getDynamicPhotos();
function filterData() {
  // getDynamicPhotos()
}

function addPage(){

    let createCanvas = `
    
    <div class="deasginarea_div">
       <div class="area_canvas_content">
           <div class="top_counter d-flex justify-content-between align-items-center">
               <span>Page ${page++}</span>
               <div class="right d-flex justify-content-between align-items-center set_width">
                   <i class="fa-solid fa-circle-plus" onclick="addPage()"></i>
                   <i class="fa-solid fa-trash"></i>
               </div>
           </div>
           <div class="canvas_area" onclick="selectCanvas(this)" ondragover="moveImageStart(event)" ondrop="moveImageStop(event)"  id="designSheet${page}" >

           </div>
       </div>
   </div>
   
    `
    document.getElementById('desginingPart').innerHTML += createCanvas

}




  



function  setImage(currentClickedImage){
  console.log(currentClickedImage)

    let img = `
    <div id="image-container" class="element object${activeObject++}" draggable="true" ondragstart="dragImageStart(event)" onclick="setActiveObject(this)">
    <div class="top_cornor">
        <div class="cornor"></div>
        <div class="cornor"></div>
    </div>
    <img  src="${currentClickedImage.src}" id="image" class="canvas_image " >  

    <div class="bottom_cornor">
        <div class="cornor"></div>
        <div class="cornor"></div>

    </div>
  </div> 
   
    `

  
    console.log(`click image src is ${currentClickedImage.src} annd img src is ${img.src}`)
    if(img.src == currentClickedImage.src){
                alert("Choose another image")
    }else{

        let canvasArea = document.querySelector('.selected_canvas_class').innerHTML += img 
      
    }
    
   
   
}


function uploadUserImage(){



  
}
function addText(){

  let text = `
  
  <div id="image-container " class="element text-container position-absolute" draggable="true">
  <div class="top_cornor">
      <div class="cornor"></div>
      <div class="cornor"></div>
  </div>
  <span contenteditable="true">Type a Text</span>

  <div class="bottom_cornor">
      <div class="cornor"></div>
      <div class="cornor"></div>

  </div>
</div> 
  
  `

  let canvasArea = document.querySelector('.selected_canvas_class').innerHTML += text


  
}

function setFlipX(event) {
  // Assuming flipX and flipY are initially false

  const image = document.querySelector('.selected_canvas_object').firstElementChild.nextElementSibling;

  if(image){
  if(image.style.transform === "scaleX(1)"){
    image.style.transform = 'scaleX(-1)';

  }else{
    image.style.transform = 'scaleX(1)';

  }
}

}
function setFlipY(event) {
  // Assuming flipX and flipY are initially false

  const image = document.querySelector('.selected_canvas_object').firstElementChild.nextElementSibling;

  if(image){
  if(image.style.transform === "scaleY(1)"){
    image.style.transform = 'scaleY(-1)';

  }else{
    image.style.transform = 'scaleY(1)';

  }
}

}
function setColor(colorElement){
  console.log(colorElement.value)
  let canvasArea = document.querySelector('.selected_canvas_class')
  

  if(canvasArea){
    canvasArea.style.backgroundColor = colorElement.value
  }
}