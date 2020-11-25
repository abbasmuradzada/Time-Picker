const submitBtn = document.querySelector('.submit');
const textInput = document.querySelector('.text-input');
const dateInput = document.querySelector('.date-input');
const dateContainer = document.querySelector('.date-container');
const dataRow = document.querySelector('.data-row');
const modal = document.querySelector('.modal');
const countDownYear = document.querySelector('.year')
const countDownMonth = document.querySelector('.month')
const countDownDay = document.querySelector('.day')
const countDownHour = document.querySelector('.hour')
const countDownMinute = document.querySelector('.minute')
const countDownSecond = document.querySelector('.second')
const eventName = document.querySelector('.event-name');
const eventType = document.querySelector('.event-type');

console.log(eventType.value);

let dateList = [];
var date = new Date;
let countDown;


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (textInput.value=='' || dateInput.value=='') {
        alert("Fields cannot be empty")
    }else{
        let newPickDate = {
            id: dateList.length+1,
            name: textInput.value,
            date: dateInput.value,
            type: dateInput.value,
        } 
        dateList.push(newPickDate);
        textInput.value = '';
        dateInput.value = '';
        textInput.focus();
        renderList();
    }
    openModal();
    closeModal();

    // Test
    

})


const openModal = () => {
    const dataRow = document.querySelectorAll('.data-row');
    dataRow.forEach((eventRow, index) => {
        eventRow.addEventListener('click', () => {
            modal.style.display="flex";
        
            countDown = setInterval(() => {
                let now = new Date();
                let eventDate = new Date(dateList[index].date);
                let distance = eventDate - now;
                
                
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                var years = Math.floor(days / 365);
                var months = Math.floor((days % 365) / 12);
                var days = Math.floor(distance / (1000 * 60 * 60 * 24) % 30.4);

                eventName.innerText = dateList[index].name;
                countDownYear.innerText = years
                countDownMonth.innerText = months;
                countDownDay.innerText = days;
                countDownHour.innerText = hours;
                countDownMinute.innerText = minutes;
                countDownSecond.innerText = seconds;
            }, 1000);
            
        })
    });
}

const closeModal = () => {
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
          clearInterval(countDown);
        }
    }
}

const renderList = () => {
    dateContainer.innerHTML='';
    dateList.map((date) => {
        const dataRow = document.createElement('div');
        dataRow.className="data-row";
        const eventTime = document.createElement('span');
        const eventContent = document.createElement('span');
        eventContent.innerText = date.name;
        eventTime.innerText = date.date;
        dataRow.appendChild(eventContent);
        dataRow.appendChild(eventTime);
        dateContainer.appendChild(dataRow);
    })
}

renderList();