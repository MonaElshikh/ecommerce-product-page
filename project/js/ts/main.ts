//#region Declaration
let plusBtn = document.querySelector(".plus") as HTMLImageElement;
let minusBtn = document.querySelector(".minus") as HTMLImageElement;
let addToCartBtn = document.querySelector(
  ".add-btn button"
) as HTMLButtonElement;
let cartImg = document.querySelector(
  ".cart-avatar> img:nth-child(2)"
) as HTMLImageElement;
let quantityDiv = document.querySelector(".quantity") as HTMLDivElement;
let menuIcon = document.querySelector(".menu img") as HTMLImageElement;
let aSide = document.querySelector(".menu ul") as HTMLUListElement;
let closeAside = document.querySelector(".menu ul > img");
let overlay = document.querySelector(".overlay") as HTMLElement;
let quantitySpan = document.querySelector(
  ".plus-minus span"
) as HTMLSpanElement;
let cartDiv = document.querySelector(".cart") as HTMLDivElement;
let emptyP = document.querySelector(".empty") as HTMLParagraphElement;
let silderImages = Array.from(
  document.querySelectorAll(".slider>img")
) as HTMLElement[];
let thumbnailImages = Array.from(
  document.querySelectorAll(".thumbnails>img")
) as HTMLElement[];
let thumbnailDiv = document.querySelector(".thumbnails") as HTMLDivElement;
let nextBtn = document.querySelector(".next") as HTMLDivElement;
let prevBtn = document.querySelector(".previous") as HTMLDivElement;
let modalContent = document.querySelector(".modal-content") as HTMLDivElement;
let quantity = 0;
let currentIndex = 1;
//#endregion
//#region functions
/// function to increase/decrease product quantity
function productQuantityHandler(event: any) {
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
async function addProductToCart() {
  if (quantity == 0) return false;
  //   clear cart div
  if (cartDiv.querySelector(".full")) {
    cartDiv.querySelector(".full")?.remove();
  }
  // remove empty paragraph
  emptyP.style.display = "none";
  //   create the product cart
  let cartProduct = document.createElement("div");
  cartProduct.className = "full";
  cartProduct.innerHTML = `
    <div class="cart-data">
      <img src="project/assets/images/image-product-1-thumbnail.jpg" alt="" />
      <div class="info">
        <p>Autumn Limited Edition...</p>
        <span>$</span><span>125.00 x </span><span class="count"> ${quantity}</span
        ><span class="result">  $375.00</span>
      </div>
      <img src="project/assets/images/icon-delete.svg" alt="delete" class="delete-btn"/>
    </div>
    <div class="chek-out"><button>Check out</button></div>
 `;
  cartDiv.appendChild(cartProduct);
  //   show quantity div
  quantityDiv.innerHTML = quantity.toString();
  quantityDiv.style.opacity = "1";

  // get delete button and attach click event
  let deleteBtn = document.querySelector(
    ".cart-data .delete-btn"
  ) as HTMLButtonElement;
  if (deleteBtn) {
    deleteBtn.addEventListener("click", (e) => {
      cartDiv.querySelector(".full")?.remove();
      emptyP.style.display = "block";
      quantity = 0;
      quantityDiv.innerHTML = "";
      quantityDiv.style.opacity = "0";
      quantitySpan.innerHTML = "0";
    });
  }
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
  document.addEventListener("click", (event: any) => {
    if (event.target !== cartDiv && event.target !== cartImg) {
      cartDiv.style.display = "none";
    }
    // check mobile navigation
    if (
      event.target.className == "prev-img" ||
      event.target.className == "previous"
    ) {
      previous(silderImages);
    } else if (
      event.target.className == "next-img" ||
      event.target.className == "next"
    ) {
      next(silderImages);
    }
    // check popup navigation
    if (
      event.target.className == "modal-prev" ||
      event.target.className == "modal-prev-img"
    ) {
      previous(
        Array.from(
          document.querySelectorAll(".imgs-list > img:not(.close-list)")
        ),
        Array.from(document.querySelectorAll(".thumbs > img")),
        false
      );
    } else if (
      event.target.className == "modal-next" ||
      event.target.className == "modal-next-img"
    ) {
      next(
        Array.from(
          document.querySelectorAll(".imgs-list > img:not(.close-list)")
        ),
        Array.from(document.querySelectorAll(".thumbs > img")),
        false
      );
    }
  });
}
// function to handel thumbnails click event in desktop
function thumbnailImagesClickHandler() {
  thumbnailImages.forEach((thum: any) => {
    thum.addEventListener("click", () => {
      thum.parentNode.querySelectorAll("img").forEach((img: any) => {
        img.classList.remove("selected");
      });
      thum.classList.add("selected");
      currentIndex = thum.dataset.index;
      navigate(silderImages, currentIndex);
    });
  });
}
// function to handel thumbnails click event in modal
function thumbnailModalImagesClickHandler() {
  console.log("inside thumbnailModalImagesClickHandler");
  let thumsModalImages = Array.from(document.querySelectorAll(".thumbs > img"));
  console.log("thumsModalImages> ", thumsModalImages);
  if (thumsModalImages) {
    thumsModalImages.forEach((thum: any) => {
      thum.addEventListener("click", () => {
        thum.parentNode.querySelectorAll("img").forEach((img: any) => {
          img.classList.remove("selected");
        });
        thum.classList.add("selected");
        navigate(
          Array.from(
            document.querySelectorAll(".imgs-list > img:not(.close-list)")
          ),
          thum.dataset.index
        );
      });
    });
  }
}
// function to handle slider images click
function sliderImagesClickHandler() {
  silderImages.forEach((img: any) => {
    img.addEventListener("click", () => {
      openLightBox(currentIndex);
    });
  });
}
function navigate(list: HTMLElement[], index: number) {
  list.forEach((item) => {
    if (item.dataset.index == index.toString()) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });
}
function next(imgsList: HTMLElement[], thumsList?: any, isModal?: boolean) {
  currentIndex == imgsList.length ? (currentIndex = 1) : currentIndex++;
  navigate(imgsList, currentIndex);
  // navigate(thumbnailImages, currentIndex);
  if (isModal == false) {
    navigate(thumsList, currentIndex);
  }
}
function previous(imgsList: HTMLElement[], thumsList?: any, isModal?: boolean) {
  currentIndex == 1 ? (currentIndex = imgsList.length) : currentIndex--;
  navigate(imgsList, currentIndex);
  if (isModal == false) {
    navigate(thumsList, currentIndex);
  }
}
function openLightBox(currentIndex: any) {
  // get imgs list & thums list containers
  let imgsList = document.querySelector(".imgs-list") as HTMLDivElement;
  let thums = document.querySelector(".thumbs") as HTMLDivElement;
  // add images to contianers
  for (let i = 1; i <= 4; i++) {
    let img = document.createElement("img");
    let thum = document.createElement("img");
    img.src = `project/assets/images/image-product-${i}.jpg`;
    img.alt = `product-${i}`;
    img.setAttribute("data-index", i.toString());
    if (img.dataset.index == currentIndex.toString())
      img.className = "selected";
    imgsList.appendChild(img);

    thum.src = `project/assets/images/image-product-${i}-thumbnail.jpg`;
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
  closeModal?.addEventListener("click", () => {
    imglist
      ?.querySelectorAll(".imgs-list > img:not(.close-list)")
      .forEach((img) => img.remove());
    thums?.querySelectorAll("img").forEach((thum) => thum.remove());
    modalContent.style.display = "none";
    overlay.style.display = "none";
  });
}
//#endregion
//#region Calls
plusBtn.addEventListener("click", productQuantityHandler);
minusBtn.addEventListener("click", productQuantityHandler);
addToCartBtn.addEventListener("click", addProductToCart);
cartImg.addEventListener("click", showProductCart);
menuIcon?.addEventListener("click", toggleMenu);
closeAside?.addEventListener("click", toggleMenu);
documentClickEventHandler();
if (thumbnailDiv.style.display !== "none") {
  thumbnailImagesClickHandler();
}
// show popup in desktop mode
if (window.screen.width > 375) {
  sliderImagesClickHandler();
  closeLighBox();
}

//#endregion
