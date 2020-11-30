var submitBtn = document.querySelector('.submit');
var textInput = document.querySelector('.text-input');
var dateInput = document.querySelector('.date-input');
var dateContainer = document.querySelector('.date-container');
var dataRow = document.querySelector('.data-row');
var modal = document.querySelector('.modal');
var countDownYear = document.querySelector('.year');
var countDownDay = document.querySelector('.day');
var countDownHour = document.querySelector('.hour');
var countDownMinute = document.querySelector('.minute');
var countDownSecond = document.querySelector('.second');
var eventName = document.querySelector('.event-name');
var eventWarn = document.querySelector('.event-warning');
var dateList = [];
var date = new Date;
var countDown;
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (textInput.value == '' || dateInput.value == '') {
        alert("Fields cannot be empty");
    }
    else {
        var newPickDate = {
            id: dateList.length + 1,
            name: textInput.value,
            date: dateInput.value,
            type: dateInput.value
        };
        dateList.push(newPickDate);
        dateList.sort(function (a, b) {
            if (a.date < b.date) {
                return -1;
            }
            if (a.date > b.date) {
                return 1;
            }
            return 0;
        });
        textInput.value = '';
        dateInput.value = '';
        textInput.focus();
        renderList();
    }
    deleteEvent();
    openModal();
    closeModal();
});
var openModal = function () {
    var dataRow = document.querySelectorAll('.data-row');
    dataRow.forEach(function (eventRow, index) {
        eventRow.addEventListener('dblclick', function () {
            modal.style.display = "flex";
            var renderModal = function () {
                var now = new Date();
                var eventDate = new Date(dateList[index].date);
                var distance = eventDate - now;
                if (distance > 0) {
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    var years = 0;
                    if (days > 365) {
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
                }
                else {
                    eventWarn.innerText = "your time is over";
                    eventName.innerText = dateList[index].name;
                    countDownYear.innerText = "0";
                    countDownDay.innerText = "0";
                    countDownHour.innerText = "0";
                    countDownMinute.innerText = "0";
                    countDownSecond.innerText = "0";
                }
            };
            renderModal();
            countDown = setInterval((function () { return renderModal(); }), 1000);
        });
    });
};
var closeModal = function () {
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearInterval(countDown);
        }
    };
};
var renderList = function () {
    dateContainer.innerHTML = '';
    dateList.map(function (date) {
        var dataRow = document.createElement('div');
        dataRow.className = "data-row";
        var eventTime = document.createElement('span');
        var eventContent = document.createElement('span');
        eventContent.innerText = date.name;
        eventTime.innerText = date.date;
        var deleneBtn = document.createElement('i');
        deleneBtn.className = 'delete-btn fas fa-trash-alt';
        dataRow.classList.add('newYearBg');
        // dataRow.style.backgroundImage = "url('../images/test.png')";
        dataRow.append(eventContent, deleneBtn, eventTime);
        dateContainer.appendChild(dataRow);
    });
};
var deleteEvent = function () {
    var deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(function (element, index) {
        element.addEventListener('click', function () {
            dateList.splice(index, 1);
            renderList();
            deleteEvent();
        });
    });
};
