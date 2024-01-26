let BagItemsObjects;
const convenience_fee=99;
onLoad();
function onLoad() {
  loadBagItemsObjects();
  displayBagItems();
  displayBagSummary();
}
function displayBagSummary(){
  let bagSummaryElement=document.querySelector('.bag-summary');
  let totalItems=bagItems.length;
  let totalMRP=0;
  let TotalDiscount=0;
  let finalPayment=0;

  BagItemsObjects.forEach(bagItem=>{
    totalMRP+=bagItem.original_price;
    TotalDiscount+=bagItem.original_price-bagItem.curr_price;
  });
  finalPayment=totalMRP-TotalDiscount+convenience_fee;
  bagSummaryElement.innerHTML=`  <div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItems} items)</div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">₹ ${totalMRP}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value price-detail-base-discount">-₹ ${TotalDiscount} </span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">convenience fee</span>
    <span class="price-item-value">₹ ${convenience_fee} </span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">₹ ${finalPayment} </span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>`;
}
function loadBagItemsObjects() {
  console.log(bagItems);
  BagItemsObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(BagItemsObjects);
}
function displayBagItems() {
  let containerElement = document.querySelector(".bag-items-container");
  let innerHTML = "";
  BagItemsObjects.forEach((bagitem) => {
    innerHTML += generateItemHtml(bagitem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId){
  bagItems=bagItems.filter(bagItemId=> bagItemId != itemId);
  console.log('bagitemss',bagItems);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  loadBagItemsObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}

function generateItemHtml(item) {
  return `<div class="bag-item-container">
<div class="item-left-part">
  <img class="bag-item-img" src="../${item.item_image}" alt="">
</div>
<div class="item-right-part">
  <div class="company">${item.company_name}</div>
  <div class="item-name">${item.item_name}</div>
  <div class="price-container">
    <span class="curr-price">RS ${item.curr_price}</span>
    <span class="original-price">RS ${item.original_price}</span>
    <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
  </div>
  <div class="return-period">
    <span class="return-period-days">${item.return_period} Days</span>
    return Available
  </div>
  <div class="delivery-details">
    Delivery by
    <span class="delivery-details-days">${item.delivery_date}</span>
  </div>
</div>
<div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
</div>`;
}
