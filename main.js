stepOne.style.display = 'none';
secondBooking.style.display = 'none';


// Step 1 
let x = 0;
step1.addEventListener('click', function (event) {
    event.preventDefault();
    secondBooking.style.display = 'none';

    if (x === 0) {
        stepOne.style.display = 'none';
        x = 1;
    } else {
        stepOne.style.display = 'grid';
        x = 0;
    }
});

next1.addEventListener('click', function (event) {
    event.preventDefault();
    // let numberOfPeople = Number(people.value);
    // let bookingDate = bookDate.value;
    stepOne.style.display = 'none';
    secondBooking.style.display = 'grid';

});

// Step 2 
let y = 0;
step2.addEventListener('click', function (event) {
    event.preventDefault();
    stepOne.style.display = 'none';

    if (y === 0) {
        secondBooking.style.display = 'none';
        y = 1;
    } else {
        secondBooking.style.display = 'grid';
        y = 0;
    }
});

next2.addEventListener('click', function (event) {
    event.preventDefault();
    secondBooking.style.display = 'none';
});

/* Calculating the map height based on the screen width and aspect ration */

window.addEventListener('resize', function () {
    var div = document.querySelector('.booking-content');
    div.style.height = div.offsetWidth * (6 / 16) + 'px'; // Calculate the height based on the width and aspect ratio
});

// Trigger the resize event initially to set the initial height
window.dispatchEvent(new Event('resize'));



next1.addEventListener('click', function (event2) {
    event2.preventDefault();
    let noPeople = Number(people.value);
    if (noPeople > 0) {
        let resetBackGround = document.querySelectorAll('.booking-content p');
        for (let r = 0; r < resetBackGround.length; r++) {
            resetBackGround[r].style.backgroundColor = ' rgba(255, 166, 0, 0.4)';
        }
    }
    if (noPeople === 8) {
        let spacenumber = document.querySelectorAll('.n8');
        for (let n = 0; n < spacenumber.length; n++) {
            spacenumber[n].style.backgroundColor = 'lightgreen';
        }
    }
    else if (noPeople === 4) {
        let spacenumber = document.querySelectorAll('.n4');
        for (let n = 0; n < spacenumber.length; n++) {
            spacenumber[n].style.backgroundColor = 'hotpink';
        }
    }
    else if (noPeople === 2) {
        let spacenumber = document.querySelectorAll('.n2');
        for (let n = 0; n < spacenumber.length; n++) {
            spacenumber[n].style.backgroundColor = 'lightblue';
        }
    }
    else if (noPeople === 1) {
        let spacenumber = document.querySelectorAll('.n1');
        for (let n = 0; n < spacenumber.length; n++) {
            spacenumber[n].style.backgroundColor = 'grey';
        }
    }
}

)
