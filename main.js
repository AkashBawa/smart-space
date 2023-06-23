stepOne.style.display = 'none';
secondBooking.style.display = 'none';


// Step 1 
let x = 0;
step1.addEventListener('click', function (e) {
    e.preventDefault();
    secondBooking.style.display = 'none';

    if (x === 0) {
        stepOne.style.display = 'none';
        x = 1;
    } else {
        stepOne.style.display = 'grid';
        x = 0;
    }
});

next1.addEventListener('click', function (e) {
    e.preventDefault();
    // let numberOfPeople = Number(people.value);
    // let bookingDate = bookDate.value;
    stepOne.style.display = 'none';
    secondBooking.style.display = 'grid';

});

// Step 2 
let y = 0;
step2.addEventListener('click', function (e) {
    e.preventDefault();
    stepOne.style.display = 'none';

    if (y === 0) {
        secondBooking.style.display = 'none';
        y = 1;
    } else {
        secondBooking.style.display = 'grid';
        y = 0;
    }
});

next2.addEventListener('click', function (e) {
    e.preventDefault();
    secondBooking.style.display = 'none';
});

/* Calculating the map height based on the screen width and aspect ration */

window.addEventListener('resize', function () {
    var div = document.querySelector('.booking-content');
    div.style.height = div.offsetWidth * (6 / 16) + 'px'; // Calculate the height based on the width and aspect ratio
});

// Trigger the resize event initially to set the initial height
window.dispatchEvent(new Event('resize'));

next1.addEventListener('click', function (e) {
    e.preventDefault();
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


/* The Pos/Neg Button Code for Power Outlet */


let posOutlet = document.querySelector('#filter1 .pos');
let negOutlet = document.querySelector('#filter1 .neg');
let countOutlet = document.querySelector('#filter1 .counter');


posOutlet.addEventListener('click', function (e) {
    e.preventDefault();
    countOutlet.innerHTML = "1"
})

negOutlet.addEventListener('click', function (e) {
    e.preventDefault();
    countOutlet.innerHTML = "0"
})



/* The Pos/Neg Button Code for Monitor */


let posMonitor = document.querySelector('#filter3 .pos');
let negMonitor = document.querySelector('#filter3 .neg');
let countMonitor = document.querySelector('#filter3 .counter');


posMonitor.addEventListener('click', function (e) {
    e.preventDefault();
    countMonitor.innerHTML = "1"
})

negMonitor.addEventListener('click', function (e) {
    e.preventDefault();
    countMonitor.innerHTML = "0"
})


/* The Pos/Neg Button Code for Projector */


let posProjector = document.querySelector('#filter4 .pos');
let negProjector = document.querySelector('#filter4 .neg');
let countProjector = document.querySelector('#filter4 .counter');


posProjector.addEventListener('click', function (e) {
    e.preventDefault();
    countProjector.innerHTML = "1"
})

negProjector.addEventListener('click', function (e) {
    e.preventDefault();
    countProjector.innerHTML = "0"
})


/* The Pos/Neg Button Code for Computers */


let posComputer = document.querySelector('#filter2 .pos');
let negComputer = document.querySelector('#filter2 .neg');
let countComputer = document.querySelector('#filter2 .counter');
let counterComputer = parseInt(countComputer.textContent);

posComputer.addEventListener('click', function (event) {
    event.preventDefault();
    if (counterComputer < 8) {
        counterComputer++;
    }
    countComputer.textContent = counterComputer.toString();
})

negComputer.addEventListener('click', function (event) {
    event.preventDefault();
    if (counterComputer > 0) {
        counterComputer--;
    }
    countComputer.textContent = counterComputer.toString();

})


/* The Pos/Neg Button Code for Chairs */


let posChairs = document.querySelector('#filter5 .pos');
let negChairs = document.querySelector('#filter5 .neg');
let countChairs = document.querySelector('#filter5 .counter');
let counterChairs = parseInt(countChairs.textContent);

posChairs.addEventListener('click', function (event) {
    event.preventDefault();
    if (counterChairs < 8) {
        counterChairs++;
    }
    countChairs.textContent = counterChairs.toString();
})

negChairs.addEventListener('click', function (event) {
    event.preventDefault();
    if (counterChairs > 0) {
        counterChairs--;
    }
    countChairs.textContent = counterChairs.toString();

})


next2.addEventListener('click', function (event5) {
    let noPeople = Number(people.value);

    if (countOutlet > 1) {
        let resetBackGround = document.querySelectorAll('.booking-content p');
        for (let r = 0; r < resetBackGround.length; r++) {
            resetBackGround[r].style.backgroundColor = ' rgba(255, 166, 0, 0.4)';
        }
    }

}

)