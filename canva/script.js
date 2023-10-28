let storePhotosData;
let page = 2;
let canvasImageId = 1;
let activeObject = 1;
let textActiveObject = 1;
let borderColor = "red";
let borderSize = 1;
let fontSize = 14;
let selectColorTypeObject;
let textPaddingValue

function setHeight() {
  let selectDiv = document.getElementById("desginingPart").children;

  if (selectDiv.length == 1) {
    document.getElementById("CanvasOuterHeight").style.height = "100vh";
  } else {
    document.getElementById("CanvasOuterHeight").style.height = "100vh";
  }
}
setHeight();
function selectCanvas(current) {
  console.log(current);
  let templateElement = document.getElementsByClassName("canvas_area");

  for (let i = 0; i <= templateElement.length - 1; i++) {
    console.log(templateElement[i]?.classList);
    if (templateElement[i]?.classList.length == 2) {
      console.log("inside if condition");
      templateElement[i].classList.remove("selected_canvas_class");
    } else {
    } // current.classList.add('selected_canvas_class')
  }

  current.classList.toggle("selected_canvas_class");
}
function setActiveObject(currentObject) {
  console.log(currentObject.classList[1]);
  let targetObject = currentObject.classList[1];

  console.log(targetObject.includes("object"));

  let removeSelectedObject = document.getElementsByClassName("element");
  console.log("removeSelectedObject", removeSelectedObject);

  for (let i = 0; i <= removeSelectedObject.length; i++) {
    removeSelectedObject[i]?.classList.remove("selected_canvas_object");
  }

  if (targetObject.includes("object")) {
    currentObject.classList.add("selected_canvas_object");
  }
}

function setTextActiveObject(currentObject) {
  console.log(currentObject.classList[1]);

  let removeSelectedObject = document.getElementsByClassName("text-container");
  console.log("removeSelectedObject", removeSelectedObject);

  for (let i = 0; i <= removeSelectedObject.length; i++) {
    removeSelectedObject[i]?.classList.remove("selected_canvas_object_text");
  }
  let targetObject = currentObject.classList[3];

  if (targetObject.includes("object_text")) {
    currentObject.classList.add("selected_canvas_object_text");
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
function filterData(iconelement){
  iconelement.classList.toggle('filter_icon_active')

  let reverseData = storePhotosData.reverse()
  let photosElementRow = document.getElementById("photosElementRow");
  photosElementRow.innerHTML = ""
  reverseData.map((currentData) => {
    //   console.log(currentData.image);
    let setcol = `
   
      <div class="col-4 p-0 element_image_cols">
                              <img src="${currentData.image}" alt="" class="img-fluid" onclick="setImage(this)" dragabble="true" />
      </div>        
      `;
    photosElementRow.innerHTML += setcol;
    // setLoaderfalse();
  });
}

function addPage() {
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
   
    `;
  document.getElementById("desginingPart").innerHTML += createCanvas;
}

function setImage(currentClickedImage) {
  console.log(currentClickedImage);

  let img = `
    <div id="image-container" class="element object${activeObject++}" draggable="true" ondragstart="dragImageStart(event)" onclick="setActiveObject(this)">
    <div class="top_cornor">
        <div class="cornor"></div>
        <div class="cornor top_right"></div>
    </div>
    <img  src="${currentClickedImage.src}" id="image" class="canvas_image " >  

    <div class="bottom_cornor">
        <div class="cornor"></div>
        <div class="cornor bottom_right"></div>

    </div>
  </div> 
   
    `;

  console.log(
    `click image src is ${currentClickedImage.src} annd img src is ${img.src}`
  );
  if (img.src == currentClickedImage.src) {
    alert("Choose another image");
  } else {
    let canvasArea = (document.querySelector(
      ".selected_canvas_class"
    ).innerHTML += img);
  }
}

function addText() {
  let text = `
  
  <div id="image-container " class="element text-container position-absolute object_text${textActiveObject++}" draggable="true" onclick="setTextActiveObject(this)">
  <div class="top_cornor">
      <div class="cornor"></div>
      <div class="cornor"></div>
  </div>
<div class="content" contenteditable="true">Type Text</div>

  <div class="bottom_cornor">
      <div class="cornor"></div>
      <div class="cornor"></div>

  </div>
</div> 
  
  `;

  let canvasArea = (document.querySelector(
    ".selected_canvas_class"
  ).innerHTML += text);
}

function setFlipX(event) {
  // Assuming flipX and flipY are initially false

  const image = document.querySelector(".selected_canvas_object")
    .firstElementChild.nextElementSibling;

  if (image) {
    if (image.style.transform === "scaleX(1)") {
      image.style.transform = "scaleX(-1)";
    } else {
      image.style.transform = "scaleX(1)";
    }
  }
}
function setFlipY(event) {
  // Assuming flipX and flipY are initially false

  const image = document.querySelector(".selected_canvas_object")
    .firstElementChild.nextElementSibling;

  if (image) {
    if (image.style.transform === "scaleY(1)") {
      image.style.transform = "scaleY(-1)";
    } else {
      image.style.transform = "scaleY(1)";
    }
  }
}

function expandFilters(currentElemenet, event) {
  let currentClick = event.target;
  let targetElement = document.getElementById("filter_area");
  console.log(currentElemenet.offsetHeight);
  if (currentElemenet.offsetHeight == 35) {
    currentElemenet.classList.add("filter_active");

    currentElemenet.style.height = currentElemenet.scrollHeight + 28 + "px";
  } else {
    if (currentClick != targetElement) {
      // console.log("target Element Comes in if condition")
      // currentElemenet.style.height = currentElemenet.scrollHeight + 35 + "px";
    } else {
      console.log("target Element Comes in else condition");
      currentElemenet.style.height = "35px";

      currentElemenet.classList.remove("filter_active");
    }
  }
}

function setDisableInput() {
  document.getElementById("range_input").disabled = true;
}
setDisableInput();

function uploadUserImage(event) {
  var files = event.target.files;
  console.log(files);

  const checkFiles = event.target.files[0];

  if (checkFiles) {
    for (let i = 0; i <= files.length; i++) {
      console.log(files[i]);
      let ImagesSrc;
      try {
        ImagesSrc = URL.createObjectURL(files[i]);
      } catch (err) {
        ImagesSrc = "../download.jpg";
      }
      console.log("Image src is ", ImagesSrc);

      let uploadImage = `

      <div class="col-4 p-0 upload_user_image_col">
                                <img src="${ImagesSrc}"
                                    alt="" class="img-fluid upload_user_images"  onclick="setImage(this)" dragabble="true"  />
                            </div>
      
      
      `;
      document.getElementById("uploadUserImage").innerHTML += uploadImage;

      document.getElementById("userUploadBox").classList.add("hide_button_div");
    }
  }
}

function setFilters(currentFilter, event) {
  console.log(currentFilter.innerText); // Get the Selected Filter in filters

  let filterList = document.querySelector(".filter_fonts_active");
  if (filterList) {
    filterList.classList.remove("filter_fonts_active");
  }
  setTimeout(() => {
    currentFilter.classList.add("filter_fonts_active");
  }, 400);

  document.getElementById("range_input").disabled = false;

  document.getElementById("setFilterName").innerText = currentFilter.innerText;
  setImageFilter(currentFilter.innerText);
}

function changeFilterValue(inputValue) {
  let getCurrentFilter = document.getElementById("setFilterName").innerText;
  let filterValue = inputValue.value;
  filterValue;
  document.getElementById("setFilterValue").innerText = filterValue;

  setImageFilter(getCurrentFilter, filterValue);
}

function setImageFilter(filterName, inputValue) {
  const image = document.querySelector(".selected_canvas_object")
    .firstElementChild.nextElementSibling;

  if (image) {
    let imageObjectKey = image.style.filter;
    let styleValues = Object.values(imageObjectKey).splice(0, 9);

    // console.log("object.entries is ", Object.entries(image.style.filter));

    // image.style.filter = `${filterName}(${inputValue}%)`;
    console.log("filterName", filterName);
    if (filterName === "Blur") {
      image.style.filter = `${filterName}(${inputValue}px)`;
    } else if (filterName == "Hue-rotate") {
      console.log("image hue-rotation");
      image.style.filter = `${filterName}(${inputValue}deg)`;
    } else {
      image.style.filter = `${filterName}(${inputValue}%)`;
    }
  }
}
function getBorderColor(element) {
  // console.log(element.style.backgroundColor)
  // borderColor = element.style.backgroundColor
  // Get the computed style of the div
  const computedStyle = window.getComputedStyle(element);

  const backgroundColor = computedStyle.backgroundColor;

  borderColor = backgroundColor;
  console.log(borderColor);
  const activeObject = document.querySelector(".selected_canvas_object")
    .firstElementChild.nextElementSibling;

  let borderHeight = document.getElementById("bordervalue").innerText;

  activeObject.style.border = `${borderHeight} solid ${borderColor}`;
}
function setBorderSize() {
  borderSize = document.getElementById("range_border_input").value;
  document.getElementById("bordervalue").innerText = borderSize + "px";
  console.log(borderSize);
  const activeObject = document.querySelector(".selected_canvas_object")
    .firstElementChild.nextElementSibling;

  let borderHeight = document.getElementById("bordervalue").innerText;

  activeObject.style.border = `${borderHeight} solid ${borderColor}`;
}

function setBorder(element, event) {
  let currentClick = event.target;
  let sideMenuActive =  document.querySelector(".sidemenu_active")

  if (currentClick == element) {
   
      if(sideMenuActive){
        sideMenuActive.classList.remove("sidemenu_active");
      }
    document.getElementById("PhotosElement").classList.add("hide_element_div");
    document.getElementById("UploadElement").classList.add("hide_element_div");
    document.getElementById("TextElement").classList.add("hide_element_div");
    document
      .getElementById("SetBorderElement")
      .classList.remove("hide_element_div");
  }
}

function setRotateImage(event) {
  const activeObject = document.querySelector(".selected_canvas_object")
    .firstElementChild.nextElementSibling;

  activeObject.classList.toggle("rotate_deg");
}
function setTextfontSize() {
  let activeObject = document.querySelector(".selected_canvas_object_text")
    .firstElementChild.nextElementSibling;

  if (activeObject) {
    // console.log(activeObject.style.fontWeight)
    let textFontSize = document.getElementById("fontSizeNumber").innerText;
    console.log(textFontSize);
    activeObject.style.fontSize = textFontSize + "px";
  }
}
function downfontSize(element, event) {
  let setfontSize = fontSize--;

  if (setfontSize <= 1) {
    fontSize = 1;
    // console.log("goes down from the 0")
    document.getElementById("fontSizeNumber").innerText = setfontSize;
    setTextfontSize();
  } else {
    // console.log("goes up from the 0")

    document.getElementById("fontSizeNumber").innerText = setfontSize;
    setTextfontSize();
  }
}
function upfontSize(element, event) {
  let setfontSize = fontSize++;

  document.getElementById("fontSizeNumber").innerText = setfontSize;
  setTextfontSize();
}

function setBold(event) {
  let activeObject = document.querySelector(".selected_canvas_object_text")
    .firstElementChild.nextElementSibling;

  if (activeObject) {
    console.log(activeObject.style.fontWeight);
    if (activeObject.style.fontWeight == "normal") {
      activeObject.style.fontWeight = "bold";
    } else {
      activeObject.style.fontWeight = "normal";
    }
  }
}

function setItalic() {
  let activeObject = document.querySelector(".selected_canvas_object_text")
    .firstElementChild.nextElementSibling;

  if (activeObject) {
    console.log(activeObject.style.fontWeight);
    if (activeObject.style.fontStyle == "normal") {
      activeObject.style.fontStyle = "Italic";
    } else {
      activeObject.style.fontStyle = "normal";
    }
  }
}

function setUnderline() {
  let activeObject = document.querySelector(".selected_canvas_object_text")
    .firstElementChild.nextElementSibling;

  if (activeObject) {
    console.log(activeObject.style.fontWeight);
    if (activeObject.style.textDecoration == "") {
      activeObject.style.textDecoration = "underline";
    } else if (activeObject.style.textDecoration == "none") {
      activeObject.style.textDecoration = "underline";
    } else {
      activeObject.style.textDecoration = "none";
    }
  }
}

document.addEventListener("keydown", (e) => {
  let keysEvent = e.key;
  console.log(keysEvent);
  // let activeTextObject = document.querySelector('.selected_canvas_object_text').firstElementChild.nextElementSibling

  //  let activeImageObject = document.querySelector(".selected_canvas_object").firstElementChild.nextElementSibling;
  let activeTextObject = document.querySelector(".selected_canvas_object_text");
  let activeImageObject = document.querySelector(".selected_canvas_object");
  if (keysEvent == "Delete") {
    console.log("Excute this condition");
    if (activeTextObject) {
      activeTextObject.remove();
    }
    if (activeImageObject) {
      activeImageObject.remove();
    }
  } else if (keysEvent == "c") {
    console.log("in a else if");
  }
});

function openColorPlatte(element, event) {
  let currentClick = event.target;
  let sideMenuActive = document.querySelector(".sidemenu_active")
  let BorderPlatte = document.getElementById('SetBorderElement')

  if (currentClick == element) {
  if(sideMenuActive){
    sideMenuActive.classList.remove("sidemenu_active");
  }
 
    document.getElementById("SetBorderElement").classList.add("hide_element_div");
    document.getElementById("PhotosElement").classList.add("hide_element_div");
    document.getElementById("UploadElement").classList.add("hide_element_div");
    document.getElementById("TextElement").classList.add("hide_element_div");

    document.getElementById("SetColorsElement").classList.remove("hide_element_div");
  }
}

function setTypeColor(colorType, event) {
  let currentClickColor = event.target;
  let colorObject = {
    textColor: document.getElementById("textcolor"),
    textBgColor: document.getElementById("textBg"),
    pageColor: document.getElementById("pagecolor"),
  };

  let groupColorOption = document.getElementsByClassName("group_color_option");

  for (let i = 0; i <= groupColorOption.length; i++) {
    // console.log(groupColorOption[i])
    let checkActiveClass = document.querySelector(".setcolor_type");
    if (checkActiveClass) {
      groupColorOption[i].classList.remove("setcolor_type");
    }
  }
  currentClickColor.classList.add("setcolor_type");
  if (currentClickColor == colorObject.textColor) {
    // console.log("Yes its text Color");
    selectColorTypeObject = "TextColor";
  } else if (currentClickColor == colorObject.textBgColor) {
    // console.log("Yes its text Background Color");
    selectColorTypeObject = "TextBgColor";
  } else {
    // console.log("Yes its Page Color");
    selectColorTypeObject = "PageColor";
  }
  // console.log("selectColorTypeObject", selectColorTypeObject);
}
function setPadding(inputvalue){
  console.log(inputvalue.value)
  textPaddingValue = inputvalue.value
  document.getElementById("textpaddingValue").innerText = inputvalue.value + "px"
  // setObjectColor(document.getElementsByClassName('color_card'))
}

function setObjectColor(colorType){
  //.firstElementChild.nextElementSibling
  let activeTextObject = document.querySelector('.selected_canvas_object_text')
  if(activeTextObject){
    activeTextObject = document.querySelector('.selected_canvas_object_text').firstElementChild.nextElementSibling
  }
  let canvasArea = document.querySelector(".selected_canvas_class");  
  // let textPaddingInput = document.getElementById('textPaddingInput').value

  const computedStyle = window.getComputedStyle(colorType);
  const color = computedStyle.backgroundColor;

  

if(selectColorTypeObject == "TextColor"){
  activeTextObject.style.color = color
}else if (selectColorTypeObject == "TextBgColor"){
    activeTextObject.style.padding = textPaddingValue + "px"
    activeTextObject.style.backgroundColor = color   

}else if (selectColorTypeObject == "PageColor"){
  canvasArea.style.backgroundColor = color 

}


}
// function setColor(colorType) {
//   console.log(colorElement.value);

//   let canvasArea = document.querySelector(".selected_canvas_class");
//   let activeTextObject = document.querySelector(".selected_canvas_object_text")
//     .firstElementChild.nextElementSibling;

//   if (activeTextObject) {
//     activeTextObject.style.color = colorElement.value;
//   } else {
//     if (canvasArea) {
//       canvasArea.style.backgroundColor = colorElement.value;
//     }
//   }
// }
