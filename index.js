import { menuArray } from './data.js'

let orderedList = []
let sum = 0 
const orderedItemsList = document.querySelector('.items-list')
const paymentForm = document.getElementById('payment-form')
const thanksMessage = document.getElementById('thanks-message')
const ratingStars = [...document.getElementsByClassName("rating__star")];


paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    handlePayBtn()
})
document.addEventListener('click', function(e){
    if(e.target.id === 'add-to-order'){
        handleAddButton(e.target.dataset.addBtn)
    }
    else if (e.target.id === "remove-btn"){
        handleRemoveBtn(e.target.dataset.removeBtn)
    }
    else if (e.target.id === "complete-order-btn"){
        handleCompleteOrderBtn()
    }
    else if (e.target.id === "close-form-btn") {
        handleCloseFormBtn()
    }
    else if (e.target.id === "star") {
        executeRating(ratingStars)
    }
})
function executeRating(stars) {
  const starClassActive = "rating__star fas fa-star";
  const starClassInactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className===starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}
function totalPrice() {
    const totalPrice = document.getElementById('total-price')
    let discount = sum / 10 
    if(sum >= 50){
        totalPrice.innerHTML = `<span>Full price: $${sum}</span>  Discounted price: $${sum - discount}`
    }else {
        totalPrice.innerHTML = `$${sum}`   
    }
}
function handleCompleteOrderBtn() {
    document.getElementById("payment-form").classList.remove('hidden')
}
function handlePayBtn(){
    const formName = document.getElementById('form-name')
    thanksMessage.classList.remove('hidden')
    document.querySelector('.thanks-message-name').textContent = `
    Thanks, ${formName.value}! Your order is on its way!
    `
    document.getElementById("payment-form").classList.add('hidden')
    document.getElementById("order").classList.add('hidden')
    orderedList = []
    sum = 0 
}
function handleCloseFormBtn() {
    document.getElementById("payment-form").classList.add('hidden')
}
function handleAddButton(itemId) {
    const targetItemObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    orderedList.unshift(targetItemObj)
    thanksMessage.classList.add('hidden')
    sum += targetItemObj.price,
    totalPrice()
    renderOrderlist()
}
function renderOrderlist(){
    let feedList = ''
    if (orderedList.length != 0) {
        document.getElementById('order').classList.remove('hidden')
    } else { 
        document.getElementById('order').classList.add('hidden')
    }
    orderedList.forEach(function(item) {
        feedList += `
            <div class="added-item">
                <div class="added-item-details">
                    <h4>${item.name}</h4>
                    <button class="remove-btn" id="remove-btn" data-remove-btn=${item.id}>remove</button>
                </div>
                <h4>$${item.price}</h4>
            </div>
        `})

    orderedItemsList.innerHTML = feedList
}
function handleRemoveBtn(itemId) {
    const targetItemObj = orderedList.filter(function(item){
        return item.id == itemId
    })[0] 
    const itemIndex = orderedList.indexOf(targetItemObj);
    orderedList.splice(itemIndex, 1)
    sum -= targetItemObj.price
    totalPrice()
    renderOrderlist()
}
function getFeedHtml () {
    let feedHtml = ''
    
    menuArray.forEach(function(item){
        feedHtml += `
        <div class="menu-option" >
            <div class="option-details" >
                <img class="manu-option-image" src="./images/${item.name}.png" alt="image of ${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.ingredients.join(", ")}</p>
                    <h4>$${item.price}</h4>
                </div>
            </div>
            <button id="add-to-order" class="add-to-order" data-add-btn="${item.id}" >+</button>
        </div>
        `
    })
    return feedHtml
}
function render() {
    document.getElementById('menu').innerHTML = getFeedHtml()
}
render()