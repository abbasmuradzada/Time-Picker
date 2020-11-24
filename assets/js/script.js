const submitBtn = document.querySelector('.submit');
const textInput = document.querySelector('.text-input');
const dateInput = document.querySelector('.date-input');
const timeInput = document.querySelector('.time-input');
const dateContainer = document.querySelector('.date-container');

let dateList = [];
var date = new Date;


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (textInput.value=='' || dateInput.value=='' || timeInput.value=='') {
        alert("Fields cannot be empty")
    }else{

        let newPickDate = {
            id: dateList.length+1,
            name: textInput.value,
            date: dateInput.value,
            time: timeInput.value
        } 
        dateList.push(newPickDate);
        textInput.value = '';
        dateInput.value = '';
        timeInput.value = '';
        textInput.focus();
        renderList();
    }
})


// console.log("2021" - date.getFullYear());
// console.log(date.getMonth()+1);
// console.log(date.getHours());


const renderList = () => {
    dateContainer.innerHTML='';
    dateList.map((date) => {
        let dataRow = document.createElement('div');
        dataRow.className="data-row";
        let span = document.createElement('span');
        dataRow.innerText= date.name;
        span.innerText = `${date.date} / ${date.time}`
        dataRow.appendChild(span);
        dateContainer.appendChild(dataRow);
    })
}

renderList();