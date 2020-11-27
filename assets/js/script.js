const submitBtn = document.querySelector('.submit');
const textInput = document.querySelector('.text-input');
const dateInput = document.querySelector('.date-input');
const dateContainer = document.querySelector('.date-container');
const dataRow = document.querySelector('.data-row');
const modal = document.querySelector('.modal');
const countDownYear = document.querySelector('.year');
const countDownDay = document.querySelector('.day');
const countDownHour = document.querySelector('.hour');
const countDownMinute = document.querySelector('.minute');
const countDownSecond = document.querySelector('.second');
const eventName = document.querySelector('.event-name');
const eventWarn = document.querySelector('.event-warning');
// const eventType = document.querySelector('.event-type');

let dateList = [];
const date = new Date;
let countDown;


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (textInput.value=='' || dateInput.value=='') {
        alert("Fields cannot be empty")
    }else{
        const newPickDate = {
            id: dateList.length+1,
            name: textInput.value,
            date: dateInput.value,
            type: dateInput.value,
        } 
        dateList.push(newPickDate);
        dateList.sort((a,b) => {
            if ( a.date < b.date ){
                return -1;
            }
            if ( a.date > b.date ){
                return 1;
            }
            return 0;
        })
        textInput.value = '';
        dateInput.value = '';
        textInput.focus();
        renderList();
        
    }
    deleteEvent();
    openModal();
    closeModal();    
})


const openModal = () => {
    const dataRow = document.querySelectorAll('.data-row');
    dataRow.forEach((eventRow, index) => {
        eventRow.addEventListener('dblclick', () => {
            modal.style.display="flex";
            const renderModal = () => {
                let now = new Date();
                let eventDate = new Date(dateList[index].date);
                let distance = eventDate - now;
                if (distance>0) {
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    var years = 0;
                    if (days>365) {
                        years = Math.floor(days / 365);
                        days = Math.floor(days % 365);
                    }
                    
                    eventWarn.innerText = dateList[index].date;
                    eventName.innerText = dateList[index].name;
                    countDownYear.innerText = years
                    countDownDay.innerText = days;
                    countDownHour.innerText = hours;
                    countDownMinute.innerText = minutes;
                    countDownSecond.innerText = seconds;
                }else{
                    eventWarn.innerText = "your time is over";
                    eventName.innerText = dateList[index].name;
                    countDownYear.innerText = 0
                    countDownDay.innerText = 0;
                    countDownHour.innerText = 0;
                    countDownMinute.innerText = 0;
                    countDownSecond.innerText = 0;
                }                
            }
            renderModal();
            countDown = setInterval((() => renderModal()), 1000);
            
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
        const deleneBtn = document.createElement('i');
        deleneBtn.className='delete-btn fas fa-trash-alt'
        dataRow.classList.add('newYearBg');
        // dataRow.style.backgroundImage = "url('../images/test.png')";
        dataRow.append(eventContent, deleneBtn, eventTime);
        dateContainer.appendChild(dataRow);
    })
}

const deleteEvent = () => {
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach((element, index) => {
        element.addEventListener('click', () => {
            dateList.splice(index, 1);
            renderList();
            deleteEvent();
        })
    });
}

