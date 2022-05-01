
// BALANCE INCOME OUTCOME

const totalBalance = document.getElementById('total-balance');
const totalIncome = document.getElementById('total-income');
const totalOutcome = document.getElementById('total-outcome');

// PAGES: Expenses Income All

const expensesPage = document.getElementById('tab1');
const incomePage = document.getElementById('tab2');
const allPage = document.getElementById('tab3');

// WRAPPERS

const listWrapper = document.querySelector('.list');

const expenseList = document.querySelector('#expenseList .list')
const incomeList = document.querySelector('#incomeList .list')
const allList = document.querySelector('#allList .list')




const expenseWrapper = document.querySelector('.item-expense-wrapper');
const incomeWrapper = document.querySelector('.item-income-wrapper');
const allWrapper = document.querySelector('.item-all-wrapper');

// ADD-BUTTONS

const addExpense = document.getElementById('add-expense-button');
const addIncome = document.getElementById('add-income-button');

// DELETE-EDIT BUTTONS

const deleteButton = document.getElementById('delete-button');
const editButton = document.getElementById('edit-button');

// INPUTS
const expenseInputTitle = document.getElementById('input-expense-title');
const expenseInputAmount = document.getElementById('input-expense-amount');
const incomeInputTitle = document.getElementById('input-income-title');
const incomeInputAmount = document.getElementById('input-income-amount');

// VARIABLES

let income = 0;
let outcome = 0;
let balance = 0;
let sum = 0;

let itemArr = JSON.parse(localStorage.getItem('key')) || [];

updateUI();



// FUNCTIONS

function active(page){
    page.classList.add('active');
}

function inactive(arr){
    arr.forEach((page) => {
        page.classList.remove('active');
    })
}

function show(wrapper){
    wrapper.classList.remove('hide');
}

function hide(arr){
    arr.forEach((wrapper) => {
        wrapper.classList.add('hide');
    })
}

function updateUI(){
    income = calcTotal('income', itemArr);
    outcome = calcTotal('expenses', itemArr);
    balance = Math.abs(income - outcome);

    const sign = (income < outcome) ? '-$':'$';

    totalBalance.innerHTML = `<span>${sign}</span>${balance}`;
    totalIncome.innerHTML = `$${income}`;
    totalOutcome.innerHTML = `$${outcome}`;

    clearTemplate([expenseList, incomeList, allList]);

    itemArr.forEach((element, index) =>{
        if(element.type == 'expenses'){
            createTemplate(expenseList, element.type, element.title, element.amount, index);
        }
        else if(element.type == 'income'){
            createTemplate(incomeList, element.type, element.title, element.amount, index);
        }
        createTemplateForAll(allList, element.type, element.title, element.amount, index);
    })
    updateCircle(income, outcome);
    localStorage.setItem('key',JSON.stringify(itemArr));
}

function calcTotal(type, arr){
    sum = 0;
    arr.forEach((element) =>{
        if(element.type == type)
            sum+=parseFloat(element.amount);
    })
    return sum;
}
function clearTemplate(arr){
    arr.forEach((element) => {
        element.innerHTML = '';
    })

}


function createTemplate(list, type, title, amount, index){
   
    const htmlTemp = `  <li id=${index} class="li ${type}">
                    <div class="item" id="${type}">
                        ${title}:$${amount}
                    <button type="button" id="delete-button"></button>
                    <button type="button" id="edit-button">edit</button>
                 </div>
            </li>`;
   
    list.insertAdjacentHTML('afterbegin',htmlTemp);
   
}

function createTemplateForAll(list, type, title, amount, index){
    const htmlAllTemp = `  <li id=${index} class="li ${type}">
                <div class="item" id="${type}">
                 ${title}:$${amount}
                <button type="button" id="delete-button"></button>
                </div>
            </li>`;
            
    list.insertAdjacentHTML('afterbegin',htmlAllTemp);

}

function clearInput(arr){
    arr.forEach((element) =>{
        element.value='';
    })
}

function deleteOrEdit(event){
    console.log(event.target.closest("li").id)
    console.log(event.target.id)
    if(event.target.id == 'delete-button'){
        deleteElement(event.target.closest("li").id);
    }
    else if(event.target.id == 'edit-button'){
        editElement(event.target.closest("li").id);
    }
}

function deleteElement(index){
    itemArr.splice(index, 1);
    updateUI();
}

function editElement(index){
    if(itemArr[index].type == 'expenses'){
        expenseInputTitle.value = itemArr[index].title;
        expenseInputAmount.value = itemArr[index].amount;
    }
    else if(itemArr[index].type == 'income'){
        incomeInputTitle.value = itemArr[index].title;
        incomeInputAmount.value = itemArr[index].amount;
    }
    deleteElement(index);
}

// EVENT LISTENERS

expensesPage.addEventListener('click', () => {
    active(expensesPage);
    inactive([incomePage, allPage]);
    show(expenseWrapper);
    hide([incomeWrapper, allWrapper]);
})

incomePage.addEventListener('click', () => {
    active(incomePage);
    inactive([expensesPage, allPage]);
    show(incomeWrapper);
    hide([expenseWrapper, allWrapper]);
})

allPage.addEventListener('click', () => {
    active(allPage);
    inactive([expensesPage, incomePage]);
    show(allWrapper);
    hide([expenseWrapper, incomeWrapper]);
})

addExpense.addEventListener('click', () => {
    if(!expenseInputTitle.value || !expenseInputAmount.value) return;
    const budgetObj = {
        type: 'expenses',
        title: expenseInputTitle.value,
        amount: expenseInputAmount.value
    }
    itemArr.push(budgetObj);
    clearInput([expenseInputTitle, expenseInputAmount]);
    updateUI();
})

addIncome.addEventListener('click', () => {
    if(!incomeInputTitle.value || !incomeInputAmount.value) return;
    const budgetObj = {
        type: 'income',
        title: incomeInputTitle.value,
        amount: incomeInputAmount.value
    }
    itemArr.push(budgetObj);
    clearInput([incomeInputTitle, incomeInputAmount]);
    updateUI();
})


expenseList.addEventListener('click', deleteOrEdit);
incomeList.addEventListener('click', deleteOrEdit);
allList.addEventListener('click', deleteOrEdit);








