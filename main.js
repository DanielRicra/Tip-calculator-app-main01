var reset_button =document.querySelector('.button__reset');
//add and remove action input
let bill = document.getElementById('bill');
let num_people = document.getElementById('num-people');
let operations_input = document.querySelectorAll('.operations__input');

function addRemoveActiveOperation(){
    operations_input.forEach(operation => {operation.classList.remove('operations__input-active')});
    this.classList.add('operations__input-active');
}

bill.addEventListener('click', addRemoveActiveOperation);
num_people.addEventListener('click', addRemoveActiveOperation);

//getting value from inputs and printing results========================

let title_error = document.querySelector('.title__error'); //can't be zero, error message

let bill_input = document.getElementById('bill-input');
let num_peopleInput = document.getElementById('num-people-input');

let buttons = document.querySelectorAll('.button');
let custom = document.querySelector('.custom');
var button_percentage = 0;

function toggleButtons() {
    
    let item_class = this.className;
    custom.className = 'custom';
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].className = 'button';
    }
    if(item_class === 'button') {
        this.className = 'button button-active';
        button_percentage = parseFloat(this.innerText.split('%')[0]);
        button_percentage = button_percentage/100;
        makeOperations();
    }
    if(item_class === 'custom' || item_class === 'custom custom-active'){
        this.className = 'custom custom-active';
        custom.addEventListener('keyup', ()=>{
            if(custom.value != "") {
                button_percentage = parseFloat(custom.value);
                button_percentage = button_percentage/100;
                makeOperations();
            }
        });
        if(custom.value != "") {
            button_percentage = parseFloat(custom.value);
            button_percentage = button_percentage/100;
            makeOperations();
        }
    }
}

buttons.forEach((button)=> {
    button.addEventListener('click', toggleButtons);
});
custom.addEventListener('click', toggleButtons);

bill_input.addEventListener('keyup', verifyBillNum);
num_peopleInput.addEventListener('keyup', verifyNumPeople)
var numPeople_value = 0;
var bill_value = 0;
//verificamos que sea diferente de zero or empty input
function verifyBillNum() {
    bill_value = parseFloat(bill_input.value);
    if(bill_input.value == ""){bill_value = 0} 
    else {makeOperations()};
}

function verifyNumPeople() {
    numPeople_value = parseFloat(num_peopleInput.value);
    if(numPeople_value == 0 || num_peopleInput.value == ""){
        title_error.style.opacity = 1;
        operations_input[1].classList.add('operations__input-active-error');
    }
    else{
        title_error.style.opacity = 0; makeOperations();
        operations_input[1].classList.remove('operations__input-active-error');
    }
}

// making calculus to show in result
let tip_amount = document.getElementById('tip-amount');
let total = document.getElementById('total');
function makeOperations() {
    reset_button.classList.add('button__reset-active');
    let numero_tipAmount, numero_total;
    if(bill_value != 0 && numPeople_value != 0) {
        numero_tipAmount = (bill_value * button_percentage)/numPeople_value;
        numero_tipAmount = (Math.floor(numero_tipAmount*100,2)/100).toFixed(2);
        tip_amount.innerHTML = `$${numero_tipAmount}`

        numero_total = (bill_value+(bill_value* button_percentage))/numPeople_value;
        numero_total = (Math.round(numero_total*100,2)/100).toFixed(2);
        total.innerHTML = `$${numero_total}`;
    }else{tip_amount.innerHTML = "$0.00"; total.innerHTML = "$0.00"}
}

//===========RESET BUTTON===============
reset_button.addEventListener("click", ()=>{
    //we clean everything
    tip_amount.innerHTML = "$0.00"; total.innerHTML = "$0.00";
    bill_input.value = ""; num_peopleInput.value = ""; custom.value = "";
    button_percentage = 0;
    custom.className = 'custom';
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].className = 'button';
    }
    reset_button.classList.remove('button__reset-active');
    operations_input.forEach(operation => {operation.classList.remove('operations__input-active')});
});