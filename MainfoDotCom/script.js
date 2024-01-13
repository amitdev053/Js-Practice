// let storePhotosData;
// let page = 2;
// let canvasImageId = 1;
// let activeObject = 1;
// let textActiveObject = 1;
// let borderColor = "red";
// let borderSize = 1;
// let fontSize = 14;
// let selectColorTypeObject;
// let textPaddingValue

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

function setTemplate() {
  let firstTemplate = document.getElementById("storeTemplateContainer");

  for (let i = 1; i <= 30; i += 2) {
    let pairStart = i;
    let pairEnd = i + 2 - 1;

    let template = `
    <div class="col-3 h-100 app_template_col3" id="template${i}" onclick="selectPage(template${i})">
    <div class="app_template_page">
        <div class="col-6 canvas_templates_col-6 h-100">
            <div class="canvas_inside_template_col w-100 h-100 bg-38bdf8 CanvasLeftPage${pairStart}"  id="CanvasLeftPage${pairStart}">
  
            </div>
  
  
        </div>
  
        <div class="col-6 canvas_templates_col-6 h-100">
            <div class="canvas_inside_template_col w-100 h-100 bg-7c3aed CanvasRightPage${pairEnd}"  id="CanvasRightPage${pairEnd}">
  
  
            </div>
  
            
        </div>
    </div>
    
    <span>Page ${pairStart} - ${pairEnd}</span>
  
  </div>
    
    `;
    firstTemplate.innerHTML += template;
  }
}
setTemplate();

function removeRecentSelectCanvas() {
  let appTemplate = document.getElementsByClassName("app_template_page");
  for (let i = 0; i <= appTemplate.length; i++) {
    if (appTemplate[i]?.classList?.contains("app_active_template")) {
      appTemplate[i]?.classList?.remove("app_active_template");
    } else {
    }
  }
}
function doBlankCanvas() {
  document.querySelector(".left_app_editor").innerHTML = "";
  document.querySelector(".right_app_editor").innerHTML = "";
}

function selectPage(currentPage) {
  // console.log(currentPage.innerHTML)
  doBlankCanvas();
  removeRecentSelectCanvas();
  currentPage.firstElementChild.classList.add("app_active_template");

  let pageOne = currentPage?.firstElementChild?.firstElementChild?.innerHTML;
  let pagetwo = currentPage?.firstElementChild?.lastElementChild?.innerHTML;

  // console.log(pageOne, pagetwo)

  document.querySelector(".left_app_editor").innerHTML += pageOne;
  document.querySelector(".right_app_editor").innerHTML += pagetwo;
}

function setText(buttonType) {
  console.log(buttonType);
  let text = `<span> Type a text </span>`;
  if (document.querySelector(".left_app_editor").children.length == 0) {
    alert("Please select a pages First...");
  } else {
    if (buttonType == "leftTextButton") {
      let getid = document.querySelector(".left_app_editor").firstElementChild.classList;

      // document.getElementById(getid).innerHTML += text
      let bottomTemplateId = document.querySelector(".app_active_template")
        .firstElementChild.firstElementChild.classList;
      console.log("getid and bottomTemplateId", getid, bottomTemplateId);
      if (getid[4] == bottomTemplateId[4]) {
        console.log("Match classlist", getid[4], bottomTemplateId[4]);
        let ElementObject = document.getElementsByClassName(getid[4]);
        for (let i = 0; i <= ElementObject.length; i++) {
          ElementObject[i].innerHTML += text;
        }
      }

      // document.getElementsByClassName('left_app_editor').firstElementChild.innerHTML += text
    } else {
      let getid = document.querySelector(".right_app_editor").firstElementChild.classList;

      // document.getElementById(getid).innerHTML += text
      let bottomTemplateId = document.querySelector(".app_active_template")
        .lastElementChild.firstElementChild.classList;

      console.log("getid and bottomTemplateId", getid[4], bottomTemplateId[4]);

      if (getid[4] == bottomTemplateId[4]) {
        console.log("Match classlist", getid[4], bottomTemplateId[4]);
        let ElementObject = document.getElementsByClassName(getid[4]);
        for (let i = 0; i <= ElementObject.length; i++) {
          ElementObject[i].innerHTML += text;
        }
      }
      // document.getElementsByClassName('right_app_editor').firstElementChild.innerHTML += text
    }
  }
}




















