
const bookingForm = document.getElementById("bookingForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const busInput = document.getElementById("busNumber");

const bookingList = document.getElementById("bookingList");
const filterBus = document.getElementById("filterBus");
const submitButton = document.getElementById("submitButton");

let bookings = [];

let editIndex = null;


// BOOK A BUS

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const booking = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        bus: busInput.value
    };

    if (editIndex === null) {

        bookings.push(booking);

    } else {

        bookings[editIndex] = booking;

        editIndex = null;

        submitButton.innerText = "Book";

    }

    bookingForm.reset();

    displayBookings();

});


// DISPLAY BOOKINGS

function displayBookings() {

    bookingList.innerHTML = "";

    const selectedBus = filterBus.value;

    bookings.forEach(function(booking, index) {

        if (selectedBus !== "All" && booking.bus !== selectedBus) {
            return;
        }

        const bookingElement = document.createElement("div");

        bookingElement.className = "booking";

        const name = document.createElement("span");
        name.innerText = booking.name;

        const email = document.createElement("span");
        email.innerText = booking.email;

        const phone = document.createElement("span");
        phone.innerText = booking.phone;

        const bus = document.createElement("span");
        bus.innerText = booking.bus;
        bus.style.fontWeight = "bold";

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "DELETE";

        deleteButton.addEventListener("click", function() {
            deleteBooking(index);
        });

        const editButton = document.createElement("button");
        editButton.innerText = "EDIT";

        editButton.addEventListener("click", function() {
            editBooking(index);
        });

        bookingElement.appendChild(name);
        bookingElement.appendChild(email);
        bookingElement.appendChild(phone);
        bookingElement.appendChild(bus);
        bookingElement.appendChild(deleteButton);
        bookingElement.appendChild(editButton);

        bookingList.appendChild(bookingElement);

    });

}


// DELETE BOOKING

function deleteBooking(index) {

    bookings.splice(index, 1);

    if (editIndex === index) {
        editIndex = null;
        bookingForm.reset();
        submitButton.innerText = "Book";
    } else if (editIndex !== null && index < editIndex) {
        editIndex--;
    }

    displayBookings();

}


// EDIT BOOKING

function editBooking(index) {

    const booking = bookings[index];

    nameInput.value = booking.name;
    emailInput.value = booking.email;
    phoneInput.value = booking.phone;
    busInput.value = booking.bus;

    editIndex = index;

    submitButton.innerText = "Update";

}


// FILTER BOOKINGS

filterBus.addEventListener("change", function() {

    displayBookings();

});
