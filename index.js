import { menuArray } from './data.js'

const orderedList = []
let sum = 0 

const paymentForm = document.getElementById('payment-form')

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
        handleCardDetails()
    }
    // else if (e.target.id === "payment-form") {
    //     e.preventDefault()
        

    // }
})

function handleAddButton(itemId) {

    let feedList = ''

    if (feedList.length === 0) {
        document.getElementById('order').classList.remove('hidden')
    } else { 
        document.getElementById('order').classList.add('hidden')
    }

    const targetItemObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]

    orderedList.push(targetItemObj)
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

    document.querySelector('.items-list').innerHTML = feedList
    sum += targetItemObj.price,
    totalPrice()
}

// function handleRemoveBtn(itemId) {
//     // const targetItemObj = orderedList.filter(function(item){
//     //     return item.id == itemId
//     // })[0]

    
//     for(let i = 0; i < orderedList.length; i++) {
//         if(orderedList[i].id === itemId){
//             console.log(orderedList[i])
//         }
//     }


     
    
//     // sum -= targetItemObj.price
//     // totalPrice()
// }

function totalPrice() {
    document.querySelector('#total-price').innerHTML = `$${sum}`    
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
function handleCardDetails() {
    document.getElementById("payment-form").classList.remove('hidden')
}
function handlePayBtn(){
    document.getElementById("thanks-message").classList.remove('hidden')
    document.getElementById("payment-form").classList.add('hidden')
    document.getElementById("order").classList.add('hidden')
    
}
function render() {
    document.getElementById('menu').innerHTML = getFeedHtml()
}
render()