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

let TemplateIndex = 0;
let genrateObjectId = 0;
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
            <div class="canvas_inside_template_col w-100 h-100 bg-68757c5e CanvasLeftPage${pairStart}"  id="CanvasLeftPage${pairStart}">
  
            </div>
  
  
        </div>
  
        <div class="col-6 canvas_templates_col-6 h-100">
            <div class="canvas_inside_template_col w-100 h-100 bg-ffffff CanvasRightPage${pairEnd}"  id="CanvasRightPage${pairEnd}">
  
  
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

function showPage(pageText) {
  document.getElementById("showPage").innerText = pageText;
}
function selectPage(currentPage) {
  console.log(currentPage.lastElementChild.innerText);
  doBlankCanvas();
  removeRecentSelectCanvas();
  TemplateIndex = currentPage.id.split("").pop();
  console.log("TemplateIndex", TemplateIndex);
  showPage(currentPage.lastElementChild.innerText);

  currentPage.firstElementChild.classList.add("app_active_template");

  let pageOne = currentPage?.firstElementChild?.firstElementChild?.innerHTML;
  let pagetwo = currentPage?.firstElementChild?.lastElementChild?.innerHTML;

  // console.log(pageOne, pagetwo)

  document.querySelector(".left_app_editor").innerHTML += pageOne;
  document.querySelector(".right_app_editor").innerHTML += pagetwo;
}

function setObjectInLeftCanvas(Element) {
  let setElement = Element;
  let getid =
    document.querySelector(".left_app_editor").firstElementChild.classList;

  
  let bottomTemplateId = document.querySelector(".app_active_template")
    .firstElementChild.firstElementChild.classList;

  console.log("getid and bottomTemplateId", getid, bottomTemplateId);
  if (getid[4] == bottomTemplateId[4]) {
    console.log("Match classlist", getid[4], bottomTemplateId[4]);
    let ElementObject = document.getElementsByClassName(getid[4]);

    for (let i = 0; i <= ElementObject.length; i++) {

      ElementObject[i].innerHTML += setElement;

    }
  }
}

function setObjectInRightCanvas(Element) {
  let setElement = Element;

  let getid =
    document.querySelector(".right_app_editor").firstElementChild.classList;

  let bottomTemplateId = document.querySelector(".app_active_template")
    .lastElementChild.firstElementChild.classList;

  console.log("getid and bottomTemplateId", getid[4], bottomTemplateId[4]);

  if (getid[4] == bottomTemplateId[4]) {
    console.log("Match classlist", getid[4], bottomTemplateId[4]);
    let ElementObject = document.getElementsByClassName(getid[4]);
    for (let i = 0; i <= ElementObject.length; i++) {
      ElementObject[i].innerHTML += setElement;
    }
  }
}
function getBodyClick() {
  console.log("removeSelectElementFunction");

  let getbody = document.body.addEventListener("click", (event) => {
    console.log(event);
    let eventId = event.id;
  });
}
getBodyClick();

function setTextResizer(){
  // Hide the Element from the document--------------------//
  let setcontrol = document.querySelectorAll(".select_all_control");
  for (let i = 0; i <= setcontrol.length - 1; i++) {
  if(setcontrol[i].classList.contains('disable_control')){
    
       
  
interact('.element')
.draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent',
      endOnly: true
    })
  ],
  // enable autoScroll
  autoScroll: true,

  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,

    // call this function on every dragend event
    end (event) {
      var textEl = event.target.querySelector('p')

      textEl && (textEl.textContent =
        'moved a distance of ' +
        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                   Math.pow(event.pageY - event.y0, 2) | 0))
          .toFixed(2) + 'px')
    }
  }
})

function dragMoveListener (event) {
var target = event.target
// keep the dragged position in the data-x/data-y attributes
var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

// translate the element
target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

// update the posiion attributes
target.setAttribute('data-x', x)
target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

interact('.element').resizable({
  edges: { left: true, right: true, bottom: true, top: true },
  onmove: (event) => {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0);
    const y = (parseFloat(target.getAttribute('data-y')) || 0);
    const fontSize = parseInt(getComputedStyle(target).fontSize, 10);

    
  const newWidth = event.rect.width;
  const newHeight = event.rect.height;

  // Update the font size based on the element's size

  const fontSizeX = (newWidth * fontSize) / target.offsetWidth;
  const fontSizeY = (newHeight * fontSize) / target.offsetHeight;

  const newFontSize = Math.min(fontSizeX, fontSizeY);
  target.style.fontSize = newFontSize + 'px';

  // You can also restrict the minimum font size if needed
  if (newFontSize < 12) {
    target.style.fontSize = '12px';
  }

  target.style.padding = '20px';
  // Update data-x and data-y attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
    
  
  },
});


interact('.element').resizable({
  edges: { left: true, right: true, bottom: true, top: true },
  // Add custom handles
  modifiers: [
    interact.modifiers.aspectRatio({ ratio: 'preserve' }),
    interact.modifiers.restrictEdges({
      outer: 'parent',
    }),
  ],
  onmove: (event) => {
    // Same as previous onmove logic
  },
});
  
  }else{
   
  
    interact('.element')
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      // enable autoScroll
      autoScroll: true,
    
      listeners: {
        // call this function on every dragmove event
        move: dragMoveListener,
    
        // call this function on every dragend event
        end (event) {
          var textEl = event.target.querySelector('p')
    
          textEl && (textEl.textContent =
            'moved a distance of ' +
            (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                       Math.pow(event.pageY - event.y0, 2) | 0))
              .toFixed(2) + 'px')
        }
      }
    })
    
    function dragMoveListener (event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
    
    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    
    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
    }
    
    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener
    
    
    
    
    interact('.element').resizable({
      edges: { left: false, right: false, bottom: false, top: false },
      onmove: (event) => {
        const target = event.target;
        const x = (parseFloat(target.getAttribute('data-x')) || 0);
        const y = (parseFloat(target.getAttribute('data-y')) || 0);
        const fontSize = parseInt(getComputedStyle(target).fontSize, 10);
    
        
      const newWidth = event.rect.width;
      const newHeight = event.rect.height;
    
        // Update the font size based on the element's size
      const newFontSize = (newWidth + newHeight) / 2;
      target.style.fontSize = newFontSize + 'px';
    
       // You can also restrict the minimum font size if needed
       if (newFontSize < 12) {
        target.style.fontSize = '12px';
     
      }
    
      target.style.padding = "20px"
        // Update data-x and data-y attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        
      
      },
    });
    
    
    interact('.element').resizable({
      edges: { left: false, right: false, bottom: false, top: false },
      // Add custom handles
      modifiers: [
        interact.modifiers.aspectRatio({ ratio: 'preserve' }),
        interact.modifiers.restrictEdges({
          outer: 'parent',
        }),
      ],
      onmove: (event) => {
        // Same as previous onmove logic
      },
    });
 

  }
  }
  // Hide the Element from the document--------------------//

}

function setRectangleResizer(){
   
// target elements with the "draggable" class
interact('.rectangle_canvas_parentElement')
.draggable({
  // enable inertial throwinthis
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent',
      endOnly: true
    })
  ],
  // enable autoScroll
  autoScroll: true,

  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,

    // call this function on every dragend event
    end (event) {
      var textEl = event.target.querySelector('p')

      textEl && (textEl.textContent =
        'moved a distance of ' +
        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                   Math.pow(event.pageY - event.y0, 2) | 0))
          .toFixed(2) + 'px')
    }
  }
})

function dragMoveListener (event) {
var target = event.target
// keep the dragged position in the data-x/data-y attributes
var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

// translate the element
target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

// update the posiion attributes
target.setAttribute('data-x', x)
target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

interact('.rectangle_canvas_parentElement')
  .resizable({
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
      move: function (event) {
        let { x, y } = event.target.dataset

        x = (parseFloat(x) || 0) + event.deltaRect.left
        y = (parseFloat(y) || 0) + event.deltaRect.top

        Object.assign(event.target.style, {
          width: `${event.rect.width}px`,
          height: `${event.rect.height}px`,
          transform: `translate(${x}px, ${y}px)`
        })

        Object.assign(event.target.dataset, { x, y })
      }
    }
  })
}
function selectElement(currentid, event) {
  
  // Hide the Element from the document--------------------//
  let setcontrol = document.querySelectorAll(".select_all_control");
  for (let i = 0; i <= setcontrol.length - 1; i++) {
    setcontrol[i].classList.add("disable_control");
  }
  // Hide the Element from the document--------------------//

  let currentClick = event.target;
  currentid = currentid.id;

  console.log(currentClick);

  let currentElementId = document.getElementById(currentid);

  if (event.target.id == currentid || currentClick == currentElementId.children) {
    let topHandle =
      currentElementId.firstElementChild.classList.remove("disable_control");
    let bottomHandle =
      currentElementId.lastElementChild.classList.remove("disable_control");
  } else {
    let topHandle = currentElementId.firstElementChild.classList.remove("disable_control");
    let bottomHandle = currentElementId.lastElementChild.classList.remove("disable_control");
  }

  // console.log(currentElementId.classList.contains)
  if(currentElementId.classList.contains('rectangle_canvas_parentElement')){
    setRectangleResizer()
    console.log("Run rectangle resizer")
  }else{
    setTextResizer()
  }

}

function setText(buttonType) {
  let text = `
  <div class="position-relative object_controls element" id="objectid${genrateObjectId++}" onclick="selectElement(this,event)">

  <div class="position-absolute top_handles select_all_control disable_control">
  <div class="top_left_handle control_object_dot_pointer"></div>
  <div class="top_right_handle control_object_dot_pointer"></div>
  
  </div>

  
  
  
  <span class="userText outline_none" contenteditable="true">Type your text here...</span>


  <div class="position-absolute bottom_handles select_all_control disable_control">
  <div class="bottom_left_handle control_object_dot_pointer"></div>
  <div class="bottom_right_handle control_object_dot_pointer"></div>
  
  </div>

  </div>
  
  `;

  if (document.querySelector(".left_app_editor").children.length == 0) {
    alert("Please select a pages First...");
  } else {
    if (buttonType == "leftTextButton") {
      setObjectInLeftCanvas(text);

    } else {
      setObjectInRightCanvas(text);
    }
  }
}

function setRectangle(buttonType) {
  let Rectangle = `
  <div class="position-relative object_controls rectangle_canvas_parentElement p-0" id="objectid${genrateObjectId++}" onclick="selectElement(this,event)">
  <div class="position-absolute top_handles select_all_control disable_control">
  <div class="top_left_handle control_object_dot_pointer"></div>
  <div class="top_right_handle control_object_dot_pointer"></div>
  
  </div>

  
  
  
  <div class="rectangle_canvas"></div>


  <div class="position-absolute bottom_handles select_all_control disable_control">
  <div class="bottom_left_handle control_object_dot_pointer"></div>
  <div class="bottom_right_handle control_object_dot_pointer"></div>
  
  </div>
  </div>
  
  
  `;

  if (document.querySelector(".left_app_editor").children.length == 0) {
    alert("Please select a pages First...");
  } else {
    if (buttonType == "set_rectangle_left_canvas") {
      setObjectInLeftCanvas(Rectangle);
    } else {
      setObjectInRightCanvas(Rectangle);
    }
  }
}

function setCircle(buttonType) {
  let Circle = `
  <div class="position-relative object_controls rectangle_canvas_parentElement p-0 " id="objectid${genrateObjectId++}" onclick="selectElement(this,event)">
  <div class="position-absolute top_handles select_all_control disable_control">
  <div class="top_left_handle control_object_dot_pointer"></div>
  <div class="top_right_handle control_object_dot_pointer"></div>
  
  </div>

  
  
  
  <div class="circle_canvas"></div>


  <div class="position-absolute bottom_handles select_all_control disable_control">
  <div class="bottom_left_handle control_object_dot_pointer"></div>
  <div class="bottom_right_handle control_object_dot_pointer"></div>
  
  </div>
  </div>
  
  `;

  if (document.querySelector(".left_app_editor").children.length == 0) {
    alert("Please select a pages First...");
  } else {
    if (buttonType == "set_circle_left_canvas") {
      setObjectInLeftCanvas(Circle);
    } else {
      setObjectInRightCanvas(Circle);
    }
  }
}

function throwPreviousPage() {
  if (document.querySelector(".left_app_editor").children.length == 0) {
    alert("Please select a pages First...");
  }
  
}

function throwNextPage() {
  if (document.querySelector(".left_app_editor").children.length == 0) {
    alert("Please select a pages First...");
  } else {
    let getTotaltemplate =
      document.getElementById("storeTemplateContainer").children.length - 1;
    console.log(getTotaltemplate);

    if (TemplateIndex < getTotaltemplate || TemplateIndex <= getTotaltemplate) {     //  2<3  3<=3
      removeRecentSelectCanvas();

      let active = document.getElementById("storeTemplateContainer").children[
        TemplateIndex++
      ];

      showPage(active.lastElementChild.innerText);
      active.firstElementChild.classList.add("app_active_template");
    } else if (TemplateIndex == 1) {
      removeRecentSelectCanvas();
      let active = document.getElementById("storeTemplateContainer").children[
        TemplateIndex++
      ];

      showPage(active.lastElementChild.innerText);
      active.firstElementChild.classList.add("app_active_template");
    } else {
      removeRecentSelectCanvas();
      TemplateIndex = 1;
      let active = document.getElementById("storeTemplateContainer").children[
        TemplateIndex
      ];

      showPage(active.lastElementChild.innerText);
      active.firstElementChild.classList.add("app_active_template");
    }
  }
}


