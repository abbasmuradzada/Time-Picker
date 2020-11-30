interface IEvent {
    id: number;
    name: string;
    date: string;
    type: string;
}

const submitBtn:HTMLInputElement = document.querySelector('.submit');
const textInput:HTMLInputElement = document.querySelector('.text-input');
const dateInput:HTMLInputElement = document.querySelector('.date-input');
const dateContainer:HTMLDivElement = document.querySelector('.date-container');
const dataRow:HTMLDivElement = document.querySelector('.data-row');
const modal:HTMLDivElement = document.querySelector('.modal');
const countDownYear:HTMLSpanElement = document.querySelector('.year');
const countDownDay:HTMLSpanElement = document.querySelector('.day');
const countDownHour:HTMLSpanElement = document.querySelector('.hour');
const countDownMinute:HTMLSpanElement = document.querySelector('.minute');
const countDownSecond:HTMLSpanElement = document.querySelector('.second');
const eventName:HTMLDivElement = document.querySelector('.event-name');
const eventWarn:HTMLDivElement = document.querySelector('.event-warning');

const dateList:IEvent[] = [];
const date:Date = new Date;
let countDown: number;


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (textInput.value=='' || dateInput.value=='') {
        alert("Fields cannot be empty")
    }else{
        const newPickDate:IEvent = {
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
                let now:any = new Date();
                let eventDate:any = new Date(dateList[index].date);
                let distance:number = eventDate - now;
                if (distance>0) {
                    var days:number = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours:number = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes:number = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds:number = Math.floor((distance % (1000 * 60)) / 1000);
                    var years:number = 0;
                    if (days>365) {
                        years = Math.floor(days / 365);
                        days = Math.floor(days % 365);
                    }
                    
                    eventWarn.innerText = dateList[index].date;
                    eventName.innerText = dateList[index].name;
                    countDownYear.innerText = years.toString();
                    countDownDay.innerText = days.toString();
                    countDownHour.innerText = hours.toString();
                    countDownMinute.innerText = minutes.toString();
                    countDownSecond.innerText = seconds.toString();
                }else{
                    eventWarn.innerText = "your time is over";
                    eventName.innerText = dateList[index].name;
                    countDownYear.innerText = "0"
                    countDownDay.innerText = "0";
                    countDownHour.innerText = "0";
                    countDownMinute.innerText = "0";
                    countDownSecond.innerText = "0";
                }                
            }
            renderModal();
            countDown = setInterval((() => renderModal()), 1000);
            
        })  
    });
}

const closeModal = () => {
    window.onclick = function(event:Event) {
        if (event.target == modal) {
          modal.style.display = "none";
          clearInterval(countDown);
        }
    }
}

const renderList = () => {
    dateContainer.innerHTML='';
    dateList.map((date) => {
        const dataRow:HTMLDivElement = document.createElement('div');
        dataRow.className="data-row";
        const eventTime:HTMLSpanElement = document.createElement('span');
        const eventContent:HTMLSpanElement = document.createElement('span');
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
    const deleteBtns:NodeList = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach((element, index) => {
        element.addEventListener('click', () => {
            dateList.splice(index, 1);
            renderList();
            deleteEvent();
        })
    });
}