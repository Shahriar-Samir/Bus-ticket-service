// html elements
const seats = document.getElementsByClassName('seat')
const totalSeats = document.getElementById('seats')
const seatsRemaining = document.getElementById('seats-remaining')  
const selectedSeats = document.getElementById('selected-seats')
const totalPrice = document.getElementById('total-price')
const grandTotal = document.getElementById('grand-total')
const nextBtn = document.getElementById('next')
const form = document.getElementById('form')
const phone = document.getElementById('phone')
const main = document.getElementById('main')
const modal = document.getElementById('modal')
const couponCode = document.getElementById('coupon-code')
const couponApply = document.getElementById('coupon-apply')
const couponField = document.getElementById("coupon-field")
const discountEl = document.getElementById('discount')
const continueBtn = document.getElementById('continue')

// disabled buttons
couponApply.setAttribute('disabled',true)
nextBtn.setAttribute('disabled', true)


// discount amount
let discount = 0 

// functions 

//  coupon apply button enabling function
function enableCouponApplyBtn(){
    if(parseFloat(totalSeats.innerText) > 3 ){
        couponApply.removeAttribute('disabled')
        couponApply.classList.remove('bg-[#1cd10060]')
        couponApply.classList.add('bg-[#1DD100]')
    }
    else{
        discountEl.classList.add('hidden')
        couponField.classList.remove('hidden')
        couponApply.setAttribute('disabled', true)
        couponApply.classList.remove('bg-[#1DD100]')
        couponApply.classList.add('bg-[#1cd10060]')
    }
}

// next button enabling function
function enableNextBtn(){
    if(parseFloat(totalSeats.innerText) > 0 && phone.value.length > 0){
        nextBtn.removeAttribute('disabled')
        nextBtn.classList.remove('bg-[#1cd10060]')
        nextBtn.classList.add('bg-[#1DD100]')

    }
       else{
        nextBtn.setAttribute('disabled', true)
        nextBtn.classList.remove('bg-[#1DD100]')
        nextBtn.classList.add('bg-[#1cd10060]')
    }
}


// coupon apply event and functionality
couponApply.addEventListener('click', function(){
     
        if(couponCode.value === 'NEW15'){
            couponCode.value = ''
            discount = (parseFloat(grandTotal.innerText)*15)/100
            grandTotal.innerText = parseFloat(grandTotal.innerText)-discount
            discountEl.classList.remove('hidden')
            discountEl.innerHTML = `<span>Discount price</span> <span>BDT ${discount}</span> `
            couponField.classList.add('hidden')
        }
        else if(couponCode.value === 'Couple 20'){
            couponCode.value = ''
            discountEl.classList.remove('hidden')
            discountEl.innerText = 'you got 20% discount'
            discount = (parseFloat(grandTotal.innerText)*20)/100
            grandTotal.innerText = parseFloat(grandTotal.innerText)-discount
            couponField.classList.add('hidden')
        }
        else{
            alert('Invalid coupon code')
        }
})

// form submit event and functionality
form.addEventListener('submit',(e)=>{
        e.preventDefault()
        main.classList.add('hidden')
        modal.classList.remove('hidden')
        modal.classList.add('flex')
})


//  for each seat button's event and functionality
for(const seat of seats){
            seat.addEventListener('click',(e)=>{  
           if(seat.classList.contains('selected')){
            grandTotal.innerText = parseFloat(grandTotal.innerText)+discount
            discount = 0
            document.getElementById(seat.innerText).remove()
            seatsRemaining.innerText = parseFloat(seatsRemaining.innerText)+1
            seat.classList.remove('selected')
            totalSeats.innerText = parseFloat(totalSeats.innerText)-1
            totalPrice.innerText = parseFloat(totalPrice.innerText)-550
            grandTotal.innerText = parseFloat(grandTotal.innerText)-550
           }
           else if(totalSeats.innerText < 4){
            seatsRemaining.innerText = parseFloat(seatsRemaining.innerText)-1
            seat.classList.add('selected')
            selectedSeats.innerHTML += `<tr id='${seat.innerText}'>
            <td class="p-0 py-2">${seat.innerText}</td>
            <td class="p-0 py-2">Economy</td>
            <td class="p-0 py-2 text-end">550</td>
            </tr>`
              totalSeats.innerText = parseFloat(totalSeats.innerText)+1
              totalPrice.innerText = parseFloat(totalPrice.innerText)+550
              grandTotal.innerText = parseFloat(grandTotal.innerText)+550
           }
           else{
            alert("You can't select more than 4 seats")
           }
            enableNextBtn()
            enableCouponApplyBtn()
        
    })
}


// phone input field's event and functionality
phone.addEventListener('keyup', function(){
        enableNextBtn()
})



// modal continue button's event and functionality
continueBtn.addEventListener('click', ()=>{
        discount = 0
        discountEl.classList.add('hidden')
        couponCode.value = ''
        phone.value = ''
        totalPrice.innerText = 0
        grandTotal.innerText = 0
        totalSeats.innerText = 0
        main.classList.remove('hidden')
        modal.classList.remove('flex')
        modal.classList.add('hidden')
        for(const seat of seats){
            if(seat.classList.contains('selected')===true){
            seat.classList.remove('selected')
            seat.classList.add('sold')
            seat.setAttribute('disabled',true)
            }
        }
        selectedSeats.innerHTML = ''
        enableCouponApplyBtn()
        enableNextBtn()

})

