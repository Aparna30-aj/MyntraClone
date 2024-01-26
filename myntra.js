let bagItems;
onLoad();

function onLoad() {
  let bagItmsstr=localStorage.getItem('bagItems');
  bagItems=bagItmsstr ? JSON.parse(bagItmsstr):[];
  displayItemsOnHomepage();
  displayBagIcon();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  displayBagIcon();

}

function displayBagIcon() {
  let bagItemCountElement=document.querySelector('.bag-item-count');
  if(bagItems.length>0){
    bagItemCountElement.style.visibility='visible';
    bagItemCountElement.innerText=bagItems.length;
  }else{
    bagItemCountElement.style.visibility='hidden';
  }
}

function displayItemsOnHomepage() {
  let itemsContainerElement = document.querySelector(".items-container");
 if(!itemsContainerElement){
  return;
 }
  let innerHTML = "";
  items.forEach((item) => {
    innerHTML += `
  <div class="item-container">
  <img class="item-img" src="${item.item_image}" alt="item image">
  <div class="rating">
    ${item.rating.stars} ⭐ | ${item.rating.noOfReviews}
  </div>
  <div class="company-name">${item.company_name}</div>
  <div class="item-name">${item.item_name}</div>
  <div class="price">
    <span class="curr-price">Rs ${item.curr_price}</span>
    <span class="originalprice">Rs ${item.original_price}</span>
    <span class="discount">(${item.discount_percentage}% OFF)</span>
  </div>
  <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
  </div>`;
  });
  itemsContainerElement.innerHTML = innerHTML;
}
