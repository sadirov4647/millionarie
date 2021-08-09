'use strict';

const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionaire = document.getElementById("show-millionaire");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

getRandomUser()

let data = [];

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };
    addData(newUser)
}


// double money
function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 }
    });
    updateDom()
}

// filter only millonaires
function showMillionaires() {
    data = data.filter((user) => user.money > 1000000);

    updateDom()
}

// add new obj  to data arr
function addData(obj) {
    data.push(obj)

    updateDom()
}

// sort by richest 
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDom();
}

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthElement = document.createElement('div');

    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

function updateDom(providetData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providetData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element)
    })
}

// format money as money
function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// eventListener

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionaire.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);