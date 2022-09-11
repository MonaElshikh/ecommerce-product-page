"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let plusBtn = document.querySelector(".plus");
let minusBtn = document.querySelector(".minus");
let addToCartBtn = document.querySelector(".add-btn button");
let cartImg = document.querySelector(".cart-avatar> img:nth-child(2)");
let quantityDiv = document.querySelector(".quantity");
let menuIcon = document.querySelector(".menu img");
let aSide = document.querySelector(".menu ul");
let closeAside = document.querySelector(".menu ul > img");
let overlay = document.querySelector(".overlay");
let quantitySpan = document.querySelector(".plus-minus span");
let cartDiv = document.querySelector(".cart");
let emptyP = document.querySelector(".empty");
let silderImages = Array.from(document.querySelectorAll(".slider>img"));
let thumbnailImages = Array.from(document.querySelectorAll(".thumbnails>img"));
let thumbnailDiv = document.querySelector(".thumbnails");
let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".previous");
let modalContent = document.querySelector(".modal-content");
let quantity = 0;
let currentIndex = 1;
function productQuantityHandler(event) {
    switch (event.target.className) {
        case "plus":
            quantity++;
            break;
        case "minus":
            quantity > 0 ? quantity-- : (quantity = 0);
            break;
    }
    quantitySpan.innerHTML = quantity.toString();
}
function addProductToCart() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (quantity == 0)
            return false;
        if (cartDiv.querySelector(".full")) {
            (_a = cartDiv.querySelector(".full")) === null || _a === void 0 ? void 0 : _a.remove();
        }
        emptyP.style.display = "none";
        let cartProduct = document.createElement("div");
        cartProduct.className = "full";
        cartProduct.innerHTML = `
    <div class="cart-data">
      <img src="assets/images/image-product-1-thumbnail.jpg" alt="" />
      <div class="info">
        <p>Autumn Limited Edition...</p>
        <span>$</span><span>125.00 x </span><span class="count"> ${quantity}</span
        ><span class="result">  $375.00</span>
      </div>
      <img src="assets/images/icon-delete.svg" alt="delete" class="delete-btn"/>
    </div>
    <div class="chek-out"><button>Check out</button></div>
 `;
        cartDiv.appendChild(cartProduct);
        quantityDiv.innerHTML = quantity.toString();
        quantityDiv.style.opacity = "1";
        let deleteBtn = document.querySelector(".cart-data .delete-btn");
        if (deleteBtn) {
            deleteBtn.addEventListener("click", (e) => {
                var _a;
                (_a = cartDiv.querySelector(".full")) === null || _a === void 0 ? void 0 : _a.remove();
                emptyP.style.display = "block";
                quantity = 0;
                quantityDiv.innerHTML = "";
                quantityDiv.style.opacity = "0";
                quantitySpan.innerHTML = "0";
            });
        }
    });
}
function showProductCart() {
    cartDiv.style.display == "block"
        ? (cartDiv.style.display = "none")
        : (cartDiv.style.display = "block");
}
function toggleMenu() {
    overlay.style.display == "block"
        ? (overlay.style.display = "none")
        : (overlay.style.display = "block");
    aSide.style.display == "block"
        ? (aSide.style.display = "none")
        : (aSide.style.display = "block");
}
function documentClickEventHandler() {
    document.addEventListener("click", (event) => {
        if (event.target !== cartDiv && event.target !== cartImg) {
            cartDiv.style.display = "none";
        }
        if (event.target.className == "prev-img" ||
            event.target.className == "previous") {
            previous(silderImages);
        }
        else if (event.target.className == "next-img" ||
            event.target.className == "next") {
            next(silderImages);
        }
        if (event.target.className == "modal-prev" ||
            event.target.className == "modal-prev-img") {
            previous(Array.from(document.querySelectorAll(".imgs-list > img:not(.close-list)")), Array.from(document.querySelectorAll(".thumbs > img")), false);
        }
        else if (event.target.className == "modal-next" ||
            event.target.className == "modal-next-img") {
            next(Array.from(document.querySelectorAll(".imgs-list > img:not(.close-list)")), Array.from(document.querySelectorAll(".thumbs > img")), false);
        }
    });
}
function thumbnailImagesClickHandler() {
    thumbnailImages.forEach((thum) => {
        thum.addEventListener("click", () => {
            thum.parentNode.querySelectorAll("img").forEach((img) => {
                img.classList.remove("selected");
            });
            thum.classList.add("selected");
            currentIndex = thum.dataset.index;
            navigate(silderImages, currentIndex);
        });
    });
}
function thumbnailModalImagesClickHandler() {
    console.log("inside thumbnailModalImagesClickHandler");
    let thumsModalImages = Array.from(document.querySelectorAll(".thumbs > img"));
    console.log("thumsModalImages> ", thumsModalImages);
    if (thumsModalImages) {
        thumsModalImages.forEach((thum) => {
            thum.addEventListener("click", () => {
                thum.parentNode.querySelectorAll("img").forEach((img) => {
                    img.classList.remove("selected");
                });
                thum.classList.add("selected");
                navigate(Array.from(document.querySelectorAll(".imgs-list > img:not(.close-list)")), thum.dataset.index);
            });
        });
    }
}
function sliderImagesClickHandler() {
    silderImages.forEach((img) => {
        img.addEventListener("click", () => {
            openLightBox(currentIndex);
        });
    });
}
function navigate(list, index) {
    list.forEach((item) => {
        if (item.dataset.index == index.toString()) {
            item.classList.add("selected");
        }
        else {
            item.classList.remove("selected");
        }
    });
}
function next(imgsList, thumsList, isModal) {
    currentIndex == imgsList.length ? (currentIndex = 1) : currentIndex++;
    navigate(imgsList, currentIndex);
    if (isModal == false) {
        navigate(thumsList, currentIndex);
    }
}
function previous(imgsList, thumsList, isModal) {
    currentIndex == 1 ? (currentIndex = imgsList.length) : currentIndex--;
    navigate(imgsList, currentIndex);
    if (isModal == false) {
        navigate(thumsList, currentIndex);
    }
}
function openLightBox(currentIndex) {
    let imgsList = document.querySelector(".imgs-list");
    let thums = document.querySelector(".thumbs");
    for (let i = 1; i <= 4; i++) {
        let img = document.createElement("img");
        let thum = document.createElement("img");
        img.src = `assets/images/image-product-${i}.jpg`;
        img.alt = `product-${i}`;
        img.setAttribute("data-index", i.toString());
        if (img.dataset.index == currentIndex.toString())
            img.className = "selected";
        imgsList.appendChild(img);
        thum.src = `assets/images/image-product-${i}-thumbnail.jpg`;
        thum.alt = `product-${i}-thumbnail`;
        thum.setAttribute("data-index", i.toString());
        if (thum.dataset.index == currentIndex.toString())
            thum.className = "selected";
        thums.appendChild(thum);
    }
    modalContent.style.cssText = `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;`;
    overlay.style.display = "block";
    thumbnailModalImagesClickHandler();
}
function closeLighBox() {
    let closeModal = modalContent.querySelector(".close-list");
    let imglist = modalContent.querySelector(".imgs-list");
    let thums = modalContent.querySelector(".thumbs");
    closeModal === null || closeModal === void 0 ? void 0 : closeModal.addEventListener("click", () => {
        imglist === null || imglist === void 0 ? void 0 : imglist.querySelectorAll(".imgs-list > img:not(.close-list)").forEach((img) => img.remove());
        thums === null || thums === void 0 ? void 0 : thums.querySelectorAll("img").forEach((thum) => thum.remove());
        modalContent.style.display = "none";
        overlay.style.display = "none";
    });
}
plusBtn.addEventListener("click", productQuantityHandler);
minusBtn.addEventListener("click", productQuantityHandler);
addToCartBtn.addEventListener("click", addProductToCart);
cartImg.addEventListener("click", showProductCart);
menuIcon === null || menuIcon === void 0 ? void 0 : menuIcon.addEventListener("click", toggleMenu);
closeAside === null || closeAside === void 0 ? void 0 : closeAside.addEventListener("click", toggleMenu);
documentClickEventHandler();
if (thumbnailDiv.style.display !== "none") {
    thumbnailImagesClickHandler();
}
if (window.screen.width > 375) {
    sliderImagesClickHandler();
    closeLighBox();
}

//# sourceMappingURL=main.js.map
