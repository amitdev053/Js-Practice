import { Component, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as global from 'src/app/globals';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from 'src/app/services/utility.service';
import interact from 'interactjs';
import Cropper from 'cropperjs';



declare var $: any;

@Component({
  selector: 'app-single-viewphoto-popup',
  templateUrl: './single-viewphoto-popup.component.html',
  styleUrls: ['./single-viewphoto-popup.component.scss'],
})
export class SingleViewphotoPopupComponent {
  arrCurrentPhotos;
  imageIconPath;
  currentImage;
  isEditMode = true;
  thumbContainerWidthPreview = 120;
  thumbContainerHeightPreview = 120;
  thumbOuterContainerWidthPreview = 140;
  thumbOuterContainerHeightPreview = 140;
  preview_type;
  _DRAGGGING_STARTED = 0;
  _LAST_MOUSEMOVE_POSITION = { x: null, y: null };
  _DIV_OFFSET;
  _CONTAINER_WIDTH;
  _CONTAINER_HEIGHT;
  _IMAGE_WIDTH;
  _IMAGE_HEIGHT;
  _LAST_MOUSE_POSITION;
  ratio;
  cropImageUrl: any;
  cropperInstance: any;
  // Set the Cropper instance to a global variable (optional)

  constructor(
    public activeModal: NgbActiveModal,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.imageIconPath =
      environment[global.env].RESOURCE_URL_AMAZON +
      environment[global.env].RESOURCE_CONTAINER +
      environment[global.env].oemCode +
      '/icons/';
    this.cropImageUrl =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPCKoEsPi33IpL0gE6_lKBavDTlAX-tpVSYCvsat0tb66fMmcsAaW_ae0LDrf9N3xwvso&usqp=CAU';
    // console.log("this.imageiconpath",this.imageIconPath)
    console.info('currentImage', this.currentImage);
    this.thumbPreviewCalculate(this.currentImage);

    $('#image-4').on('rcrop-changed', function () {
      console.log('Rcrop has been changed');
      // When crop area has been changed.
    });

    $('#image-4').on('rcrop-ready', function () {
      // When image has been read and rCrop is ready.
      console.log('Rcrop has been ready');
    });

    $('#image-4').on('rcrop-change', function () {
      // When crop area is being changed.
      console.log('Rcrop has been changed');
    });

    $(document).ready(function () {
      //     $('#image-4').rcrop({
      //       // full-size crop area
      //       full : false,
      //       // min / max size of crop area
      //       minSize : [20, 20],
      //       maxSize : [null, null],
      //       // preserve the original radio
      //       preserveAspectRatio : false,
      //       // minSize : [200,200],
      //       // preserveAspectRatio : true,
      //       // generate an input with crop data
      //       inputs : true,
      //       // prefix to input
      //       inputsPrefix : '',
      //       // <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a> style crop area
      //       grid : false,
      // //   preview : {
      // //     display: true,
      // //     size : [200,100],
      // // }
      //     });
    });
  }

  closeViewPhoto() {
    console.log('this.closeViewPhoto');
    this.activeModal.close('Modal Closed');
  }

  navigatePhotoNext() {
    var currentImageIndex = this.arrCurrentPhotos.indexOf(this.currentImage);
    currentImageIndex++;
    if (currentImageIndex == this.arrCurrentPhotos.length) {
      currentImageIndex = 0;
    }
    this.currentImage = this.arrCurrentPhotos[currentImageIndex];
    this.thumbPreviewCalculate(this.currentImage);
  }
  navigatePhotoPrevious() {
    var currentImageIndex = this.arrCurrentPhotos.indexOf(this.currentImage);
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = this.arrCurrentPhotos.length - 1;
    }
    this.currentImage = this.arrCurrentPhotos[currentImageIndex];
    this.thumbPreviewCalculate(this.currentImage);
  }

  thumbPreviewCalculate(currentViewImage) {
    if (currentViewImage == undefined) {
      return;
    }
    this.currentImage = currentViewImage;
    this.currentImage.bigSrc = this.currentImage.fullSrc;
    var innerWidth = window.innerWidth - 100;
    var innerHeight = window.innerHeight - 200;
    var calculatedObject = this.utilityService.getFitImageSize(
      this.currentImage.thumbImageContainerWidth,
      this.currentImage.thumbImageContainerHeight,
      innerWidth,
      innerHeight
    );
    var ratio =
      calculatedObject.newHeight / this.currentImage.thumbImageContainerHeight;
    this.ratio = ratio;
    this.thumbContainerWidthPreview = calculatedObject.newWidth;
    this.thumbContainerHeightPreview = calculatedObject.newHeight;
    this.thumbOuterContainerWidthPreview = calculatedObject.newWidth + 20;
    this.thumbOuterContainerHeightPreview = calculatedObject.newHeight + 80;

    this.currentImage.thumbWidthPreview = this.currentImage.thumbWidth * ratio;
    this.currentImage.thumbHeightPreview =
      this.currentImage.thumbHeight * ratio;
    this.currentImage.imageContainerGridWidthPreview =
      this.currentImage.imageContainerGridWidth * ratio;
    this.currentImage.imageContainerGridHeightPreview =
      this.currentImage.imageContainerGridHeight * ratio;
    this.currentImage.imageContainerGridLeftPreview =
      this.currentImage.imageContainerGridLeft * ratio;
    this.currentImage.imageContainerGridTopPreview =
      this.currentImage.imageContainerGridTop * ratio;
    this.currentImage.thumbImageContainerWidthPreview =
      this.currentImage.thumbImageContainerWidth * ratio;
    this.currentImage.thumbImageContainerHeightPreview =
      this.currentImage.thumbImageContainerHeight * ratio;
    this.currentImage.xPosPreview = this.currentImage.xPos * ratio;
    this.currentImage.yPosPreview = this.currentImage.yPos * ratio;

    //for polaroid
    this.currentImage.xPosTextPolaroidPreview =
      this.currentImage.xPosTextPolaroid * ratio;
    this.currentImage.yPosTextPolaroidPreview =
      this.currentImage.yPosTextPolaroid * ratio;
    this.currentImage.textWidthPolaroidPreview =
      this.currentImage.textWidthPolaroid * ratio;
    this.currentImage.textHeightPolaroidPreview =
      this.currentImage.textHeightPolaroid * ratio;
    this.currentImage.printFontSizePreview =
      this.currentImage.scaleText * ratio;

    this._CONTAINER_WIDTH = this.currentImage.imageContainerGridWidthPreview;
    this._CONTAINER_HEIGHT = this.currentImage.imageContainerGridHeightPreview;
    this._IMAGE_WIDTH = this.currentImage.thumbWidthPreview;
    this._IMAGE_HEIGHT = this.currentImage.thumbHeightPreview;
    this._DRAGGGING_STARTED = 0;
  }

  mousemovePreviewImage(event) {
    if (this._DRAGGGING_STARTED == 1) {
      console.log('this.mousemovePreviewImage');

      var current_mouse_position = {
        x: event.pageX - this._DIV_OFFSET.left,
        y: event.pageY - this._DIV_OFFSET.top,
      };
      var change_x = current_mouse_position.x - this._LAST_MOUSE_POSITION.x;
      var change_y = current_mouse_position.y - this._LAST_MOUSE_POSITION.y;

      /* Save mouse position */
      this._LAST_MOUSE_POSITION = current_mouse_position;

      var img_top = this.currentImage.yPosPreview; //parseInt($("#dragimage").css('top'), 0);
      var img_left = this.currentImage.xPosPreview; //parseInt($("#dragimage").css('left'), 0);

      var img_top_new = img_top + change_y;
      var img_left_new = img_left + change_x;

      /* Validate top and left do not fall outside the image, otherwise white space will be seen */
      if (img_top_new > 0) img_top_new = 0;
      if (img_top_new < this._CONTAINER_HEIGHT - this._IMAGE_HEIGHT)
        img_top_new = this._CONTAINER_HEIGHT - this._IMAGE_HEIGHT;

      if (img_left_new > 0) img_left_new = 0;
      if (img_left_new < this._CONTAINER_WIDTH - this._IMAGE_WIDTH)
        img_left_new = this._CONTAINER_WIDTH - this._IMAGE_WIDTH;

      //$("#dragimage").css({ top: img_top_new + 'px', left: img_left_new + 'px' });
      this.currentImage.xPosPreview = img_left_new;
      this.currentImage.yPosPreview = img_top_new;

      console.info(img_left_new);
    }
  }

  mousedownPreviewImage(event) {
    event.preventDefault();
    console.log('this.mousedownPreviewImage');

    if (this.preview_type == 'VARIBLE') {
      return;
    }

    this._DRAGGGING_STARTED = 1;

    this._DIV_OFFSET = $('#imagecontainer').offset();

    /* Save mouse position */
    this._LAST_MOUSE_POSITION = {
      x: event.pageX - this._DIV_OFFSET.left,
      y: event.pageY - this._DIV_OFFSET.top,
    };
  }

  rotateImage(event: any) {
    // console.log(event)
    let currentClick = event.target;
    currentClick.parentElement.classList.toggle('object_styles_box_active');

    if (document.getElementById('image-4')) {
      document
        .getElementById('image-4')
        .classList.toggle('rotate_image_edit_image');
    } else {
      document
        .getElementById('image-5')
        .classList.toggle('rotate_image_edit_image');
      this.currentImage.borderColor = 'red';
    }
    document
      .getElementById('editContainer')
      .classList.add('edit_container_itemcenter');
  }
  trainsitionElement(targetElement: HTMLElement) {
    targetElement.classList.add('transition_element');
    setTimeout(() => {
      targetElement.classList.remove('transition_element');
    }, 300);
  }

  setFilters(event: any) {
    let currentLemClick = event.target;
    let currentLemClickid = currentLemClick.id;
    console.log(currentLemClickid);
    let imageObject;
    document
      .getElementById('editContainer')
      .classList.add('edit_container_itemcenter');

    if (document.getElementById('image-4')) {
      imageObject = document.getElementById('image-4');
    } else {
      imageObject = document.getElementById('image-5');
    }
    // console.log(currentLemClick.innerText);

    if (
      currentLemClick.innerText == 'Blur' ||
      currentLemClickid == 'blurEffect_img_new' ||
      currentLemClickid == 'blurEffect_new'
    ) {
      let blurEffect = document.getElementById('blurEffect_new');
      this.trainsitionElement(blurEffect);

      if (imageObject.style.filter.includes('blur')) {
        blurEffect.classList.remove('object_styles_box_active');

        imageObject.style.filter = 'none';
      } else {
        blurEffect.classList.add('object_styles_box_active');

        imageObject.style.filter = 'blur(2px) !important';
      }
    } else if (
      currentLemClick.innerText == 'Contrast' ||
      currentLemClickid == 'contrastEffect_img_new' ||
      currentLemClickid == 'contrastEffect_new'
    ) {
      let contrastEffect = document.getElementById('contrastEffect_new');
      this.trainsitionElement(contrastEffect);
      if (imageObject.style.filter.includes('contrast')) {
        contrastEffect.classList.remove('object_styles_box_active');
        imageObject.style.filter = 'none';
      } else {
        contrastEffect.classList.add('object_styles_box_active');

        imageObject.style.filter = 'contrast(125%)';
      }
    } else if (
      currentLemClick.innerText == 'Bightness' ||
      currentLemClickid == 'brightnessEffect__img_new' ||
      currentLemClickid == 'brightnessEffect_new'
    ) {
      let brightnessEffect = document.getElementById('brightnessEffect_new');
      this.trainsitionElement(brightnessEffect);

      if (imageObject.style.filter.includes('brightness')) {
        brightnessEffect.classList.remove('object_styles_box_active');
        imageObject.style.filter = 'none';
      } else {
        brightnessEffect.classList.add('object_styles_box_active');

        imageObject.style.filter = 'brightness(110%)';
      }
    } else if (
      currentLemClick.innerText == 'Saturate' ||
      currentLemClickid == 'saturateEffect_img_new' ||
      currentLemClickid == 'saturateEffect_new'
    ) {
      let saturateEffect = document.getElementById('saturateEffect_new');
      this.trainsitionElement(saturateEffect);

      if (imageObject.style.filter.includes('saturate')) {
        saturateEffect.classList.remove('object_styles_box_active');
        imageObject.style.filter = 'none';
      } else {
        saturateEffect.classList.add('object_styles_box_active');

        imageObject.style.filter = 'saturate(1.4)';
      }
    } else if (
      currentLemClick.innerText == 'Invert' ||
      currentLemClickid == 'invertEffect_img_new' ||
      currentLemClickid == 'invertEffect_new'
    ) {
      let invertEffect = document.getElementById('invertEffect_new');
      this.trainsitionElement(invertEffect);

      if (imageObject.style.filter.includes('invert')) {
        invertEffect.classList.remove('object_styles_box_active');
        imageObject.style.filter = 'none';
      } else {
        invertEffect.classList.add('object_styles_box_active');

        imageObject.style.filter = 'invert() ';
      }
    } else if (
      currentLemClick.innerText == 'GrayScale' ||
      currentLemClickid == 'grayscaleFilters_img_new' ||
      currentLemClickid == 'grayscaleFilters_new'
    ) {
      let graqyscaleEffect = document.getElementById('grayscaleFilters_new');
      this.trainsitionElement(graqyscaleEffect);

      if (imageObject.style.filter.includes('grayscale')) {
        graqyscaleEffect.classList.remove('object_styles_box_active');
        imageObject.style.filter = 'none';
      } else {
        graqyscaleEffect.classList.add('object_styles_box_active');

        imageObject.style.filter = 'grayscale()';
      }
    }
  }

  resize(event: any) {
    let currentClick = event.target;
    let currentLemClickid = currentClick.id;
    let width_resize;
    let height_resize;

    if (
      currentClick.innerText == 'Resize' ||
      currentLemClickid == 'resize_card_box' ||
      currentLemClickid == 'resize_card_img_box'
    ) {
      let rotateBoxElement = document.getElementById('resize_card_box');
      let rotateCardBox = document
        .getElementById('resize_card_box')
        .classList.toggle('object_styles_box_active');

      this.trainsitionElement(rotateBoxElement);

      let checkElementClass = document
        .getElementById('resize_card_box')
        .classList.contains('object_styles_box_active');

      if (checkElementClass) {
        console.log('resize image follow if condition');

        interact('#resizeHandles').resizable({
          edges: { left: true, right: true, bottom: true, top: true },
          onmove: (event) => {
            const target = event.target;
            const x = parseFloat(target.getAttribute('data-x')) || 0;
            const y = parseFloat(target.getAttribute('data-y')) || 0;

            // Resize the image
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            width_resize = target.style.width;
            // console.log(target.style.width)
            height_resize = target.style.height;

            console.log(
              'width_resize & height_resize',
              width_resize,
              height_resize
            );

            // Update data-x and data-y attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
        });

        interact('#resizeHandles').resizable({
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
        if (document.querySelector('.allhandles')) {
          let handles = document.getElementsByClassName('allhandles');

          for (let i = 0; i <= handles.length; i++) {
            handles[i].classList.remove('displayhandles');
          }
        }

        let previousImageSrc = document.getElementById('image-4').getAttribute('src');

        let setHandles = `
    <div class="singleedit_image_handles position-absolute" id="resizeHandles">

   <div class="singleedit_image_top_handle allhandles">
   <div class="singleedit_image_handle"></div>
   <div class="singleedit_image_handle"></div>
   <div class="singleedit_image_handle"></div>
   </div>


   <div class="singleedit_image_left_handle allhandles">
   <div class="singleedit_image_handle"></div>

   </div>

<img src="${previousImageSrc}" crossorigin="anonymous" class="img-fluid height_hunndred" id="image-5">

   <div class="singleedit_image_right_handle allhandles">
   <div class="singleedit_image_handle"></div>
   </div>



  <div class="singleedit_image_bottom_handle allhandles">
   <div class="singleedit_image_handle"></div>
   <div class="singleedit_image_handle"></div>
   <div class="singleedit_image_handle"></div>
   </div>

    </div>

    `;

        let computedStyles = window.getComputedStyle(
          document.getElementById('image-4')
        );
        if (document.getElementById('image-5')) {
          for (var i = 0; i < computedStyles.length; i++) {
            var styleName = computedStyles[i];
            var styleValue = computedStyles.getPropertyValue(styleName);
            document
              .getElementById('image-5')
              .style.setProperty(styleName, styleValue);
          }
        }

        document.getElementById('image-4').remove();

        document.getElementById('editContainer').innerHTML += setHandles;
      } else {
        interact('#resizeHandles').resizable({
          edges: { left: false, right: false, bottom: false, top: false },
          onmove: (event) => {
            const target = event.target;
            const x = parseFloat(target.getAttribute('data-x')) || 0;
            const y = parseFloat(target.getAttribute('data-y')) || 0;

            // Resize the image
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            width_resize = target.style.width;
            // console.log(target.style.width)
            height_resize = target.style.height;

            console.log(
              'width_resize & height_resize',
              width_resize,
              height_resize
            );

            // Update data-x and data-y attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
        });

        interact('#resizeHandles').resizable({
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

        let handles = document.getElementsByClassName('allhandles');

        for (let i = 0; i <= handles.length; i++) {
          handles[i].classList.add('displayhandles');
        }
      }
    }
  }

  cropSuccess(event) {
    var cropper;

    let currentClick = event.target;
    let idClick = currentClick.id;

    if (
      idClick == 'crop_span_text' ||
      idClick == 'crop_single_icon_image' ||
      idClick == 'crop_area_action'
    ) {
      document
        .getElementById('crop_area_action')
        .classList.add('object_styles_box_active');

      if (document.getElementById('image-5')) {
        var $image = $('#image-5');
        cropper = $image.cropper({
          zoomable: false,
          backgroundColor: '#ffffff',
        });
      } else {
        var $image = $('#image-4');
        cropper = $image.cropper({
          zoomable: false,
          backgroundColor: '#ffffff',
        });
      }
    }
    if (
      document
        .getElementById('crop_area_action')
        .classList.contains('object_styles_box_active')
    ) {
      if (document.getElementById('image-4')) {
        var $image = $('#image-4');
        console.log("It's if statemenet");
        var croppedData = $image
          .cropper('getCroppedCanvas')
          .toDataURL('image/jpeg');

        let setImage = `<img src="${croppedData}" class="height_hunndred image selectDisable canvasimage_s reponsive_image position-relative target_select_image" id="image-4" >`;

        document.getElementById('editContainer').innerHTML = setImage;
        document
          .getElementById('crop_area_action')
          .classList.remove('object_styles_box_active');
      } else {
        var $image = $('#image-5');
        console.log("It's if statemenet");
        var croppedData = $image
          .cropper('getCroppedCanvas')
          .toDataURL('image/jpeg');
        // let imageClass = document.getElementById('image-4').classList;

        let setHandles = `
          <div class="singleedit_image_handles position-absolute" id="resizeHandles">

         <div class="singleedit_image_top_handle allhandles">
         <div class="singleedit_image_handle"></div>
         <div class="singleedit_image_handle"></div>
         <div class="singleedit_image_handle"></div>
         </div>


         <div class="singleedit_image_left_handle allhandles">
         <div class="singleedit_image_handle"></div>

         </div>

      <img src="${croppedData}" crossorigin="anonymous" class="img-fluid height_hunndred" id="image-5">

         <div class="singleedit_image_right_handle allhandles">
         <div class="singleedit_image_handle"></div>
         </div>



        <div class="singleedit_image_bottom_handle allhandles">
         <div class="singleedit_image_handle"></div>
         <div class="singleedit_image_handle"></div>
         <div class="singleedit_image_handle"></div>
         </div>

          </div>
        `;

        document.getElementById('editContainer').innerHTML = setHandles;
        document
          .getElementById('crop_area_action')
          .classList.remove('object_styles_box_active');
      }
    } else {
    }
  }
  setFlipX(event) {
    let currentIdClick = event.target.id;
    if (
      currentIdClick == 'FlipX_action_area' ||
      currentIdClick == 'flipXImageIcon' ||
      currentIdClick == 'flipXText'
    ) {
      let flipXArea = document.getElementById('FlipX_action_area');

      this.trainsitionElement(flipXArea);

      if (document.getElementById('image-5')) {
        let image = document.getElementById('image-5');
        image.classList.add('flipX_transform');
        (image.classList.contains('flipX_transform'))? flipXArea.classList.add('object_styles_box_active') : flipXArea.classList.remove('object_styles_box_active')




      } else {
        let image = document.getElementById('image-4');
        image.classList.toggle('flipX_transform');
        (image.classList.contains('flipX_transform'))? flipXArea.classList.add('object_styles_box_active') : flipXArea.classList.remove('object_styles_box_active')

      }
    }
  }
  setFlipY(event) {
    let currentIdClick = event.target.id;
    if (
      currentIdClick == 'FlipY_action_area' ||
      currentIdClick == 'flipYImageIcon' ||
      currentIdClick == 'flipYText'
    ) {
      let flipYArea = document.getElementById('FlipY_action_area');

      this.trainsitionElement(flipYArea);

      if (document.getElementById('image-5')) {
        let image = document.getElementById('image-5');
        image.classList.add('flipY_transform');
        (image.classList.contains('flipY_transform'))? flipYArea.classList.add('object_styles_box_active') : flipYArea.classList.remove('object_styles_box_active')




      } else {
        let image = document.getElementById('image-4');
        image.classList.toggle('flipY_transform');
        (image.classList.contains('flipY_transform'))? flipYArea.classList.add('object_styles_box_active') : flipYArea.classList.remove('object_styles_box_active')

      }
    }
  }

  filterPlusThreeX(event) {
    let currentIdClick = event.target.id;
    if (
      currentIdClick == 'filterPlusThreeX_area' ||
      currentIdClick == 'filterPlusThreeX_image' ||
      currentIdClick == 'filterPlusThreeX_text'
    ) {
      let filterBox = document.getElementById('filterPlusThreeX_area');

      this.trainsitionElement(filterBox);

      if (document.getElementById('image-5')) {
        let image = document.getElementById('image-5');
        image.classList.add('filter_3x');
        (image.classList.contains('filter_3x'))? filterBox.classList.add('object_styles_box_active') : filterBox.classList.remove('object_styles_box_active')




      } else {
        let image = document.getElementById('image-4');
        image.classList.toggle('filter_3x');
        (image.classList.contains('filter_3x'))? filterBox.classList.add('object_styles_box_active') : filterBox.classList.remove('object_styles_box_active')

      }
    }
  }
  SetSmothFilter(event :any){
    let currentIdClick = event.target.id;
    if (
      currentIdClick == 'smothFilterBox' ||
      currentIdClick == 'smothFilterImage' ||
      currentIdClick == 'smothFilterText'
    ) {
      let filterBox = document.getElementById('smothFilterBox');

      this.trainsitionElement(filterBox);

      if (document.getElementById('image-5')) {
        let image = document.getElementById('image-5');
        image.classList.add('filter_3x');
        (image.classList.contains('filter_3x'))? filterBox.classList.add('object_styles_box_active') : filterBox.classList.remove('object_styles_box_active')




      } else {
        let image = document.getElementById('image-4');
        image.classList.toggle('filter_3x');
        (image.classList.contains('filter_3x'))? filterBox.classList.add('object_styles_box_active') : filterBox.classList.remove('object_styles_box_active')

      }
    }

  }

 onSaveImage() {
    document
      .getElementById('saveSingleImageElement')
      .classList.add('object_styles_box_active');
    document
      .getElementById('saveSingleImageElement')
      .classList.add('transition_element');

    setTimeout(() => {
      document
        .getElementById('saveSingleImageElement')
        .classList.remove('transition_element');
    }, 300);

    setTimeout(() => {
      document
        .getElementById('saveSingleImageElement')
        .classList.remove('object_styles_box_active');
    }, 3000);

    let canvas = document.getElementById('canvas_single') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d');
    let rotateAngle = 90;
    let image = new Image();
    image.src = (document.getElementById('image-5'))? document.getElementById('image-5').getAttribute('src') : document.getElementById('image-4').getAttribute('src');
    if (document.getElementById('resizeHandles')) {
      canvas.width = document.getElementById('resizeHandles').offsetWidth;
      canvas.height = document.getElementById('resizeHandles').offsetHeight;
    } else {
      canvas.width = 300;
      canvas.height = 300;
    }

    image.onload = function () {
      try {
        if (document.getElementById('image-5')) {
          let computedFilters = window.getComputedStyle(
            document.getElementById('image-5')
          );

          var filterValue = computedFilters.getPropertyValue('filter');
          var imageRotate = computedFilters.getPropertyValue('transform');
          console.log(imageRotate);
          if (filterValue && filterValue !== 'none') {
            console.log('Filter is set:', filterValue);
            ctx.filter = filterValue;
          } else {
            console.log('Filter is not set.');
          }
        } else {
          let computedFilters = window.getComputedStyle(
            document.getElementById('image-4')
          );

          var filterValue = computedFilters.getPropertyValue('filter');
          var imageRotate = computedFilters.getPropertyValue('transform');
          console.log(imageRotate);
          if (filterValue && filterValue !== 'none') {
            console.log('Filter is set:', filterValue);
            ctx.filter = filterValue;
          } else {
            console.log('Filter is not set.');
          }
        }

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        console.log(image);
        //  console.log("drImage", drImage)
      } catch (error) {
        console.error('Error drawing image:', error);
      }

    };
document.getElementById('previewContainer').classList.add('view_preview_active_box')
  }

  closeImagePreview(event){
    let currentClickElement = event.target.id

    if(currentClickElement == "previewContainer" || currentClickElement == "closeButton" || currentClickElement == "closeImageButton" || currentClickElement == "continueEditingButton"){
document.getElementById('previewContainer').classList.remove('view_preview_active_box')


    }else{
document.getElementById('previewContainer').classList.add('view_preview_active_box')

    }
  }
  async onDownload(){
    let imageSrc = (document.getElementById('image-5')) ? document.getElementById('image-5').getAttribute('src') : document.getElementById('image-4').getAttribute('src')
    let downloadFileName = "Views.png"


    // this.DownloadImage();

    // Assuming you have a blob response from somewhere
fetch(imageSrc)
.then(response => response.blob())
.then(blob => {
  // let BlobImage = blob
  // Create an image element
  const img = new Image();

  // Set up a load event to handle the image once it's loaded
  img.onload = function () {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');


    if (document.getElementById('resizeHandles')) {
      canvas.width = document.getElementById('resizeHandles').offsetWidth;
      canvas.height = document.getElementById('resizeHandles').offsetHeight;
    } else {
      canvas.width = 300;
      canvas.height = 300;
    }

     // Apply filters
     if (document.getElementById('image-5')) {
      let computedFilters = window.getComputedStyle(
        document.getElementById('image-5')
      );

      var filterValue = computedFilters.getPropertyValue('filter');
      var imageRotate = computedFilters.getPropertyValue('transform');
      console.log(imageRotate);
      if (filterValue && filterValue !== 'none') {
        console.log('Filter is set:', filterValue);
        ctx.filter = filterValue;
      } else {
        console.log('Filter is not set.');
      }
    } else {
      let computedFilters = window.getComputedStyle(
        document.getElementById('image-4')
      );

      var filterValue = computedFilters.getPropertyValue('filter');
      var imageRotate = computedFilters.getPropertyValue('transform');
      console.log(imageRotate);
      if (filterValue && filterValue !== 'none') {
        console.log('Filter is set:', filterValue);
        ctx.filter = filterValue;
      } else {
        console.log('Filter is not set.');
      }
    }

    // Draw the image on the canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Get the data URL of the canvas
    const dataUrl = canvas.toDataURL('image/png');

    // You can use dataUrl as the source for an <img> element or for other purposes
    console.log(dataUrl);

    const anchorElement = document.createElement('a');
    anchorElement.href = dataUrl;
    anchorElement.download = downloadFileName;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(dataUrl);
  };

  // Set the source of the image to the blob
  img.src = URL.createObjectURL(blob);
})
.catch(error => console.error('Error fetching image:', error));



  }


}
