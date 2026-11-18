const apiURL = "https://crudcrud.com/api/45d4d18ecb014f40ada4a5025f40a2ed/bookings";

let editId = null;

// show all bookings
function loadBookings() {
    const list = document.getElementById("bookingList");
    list.innerHTML = "<p>Loading...</p>";

    axios.get(apiURL)
    .then(function(response) {
        console.log("Data from API:", response.data);

        list.innerHTML = "";

        if (response.data.length === 0) {
            list.innerHTML = "<p>No bookings yet. Try adding one!</p>";
            return;
        }

        for (let i = 0; i < response.data.length; i++) {
            const booking = response.data[i];
            const item = document.getElementById("bookingTemplate").content.cloneNode(true);

            item.querySelector(".b-name").textContent = booking.name;
            item.querySelector(".b-email").textContent = booking.email;
            item.querySelector(".b-phone").textContent = booking.phone;
            item.querySelector(".bus-badge").textContent = booking.bus;
            item.querySelector(".edit-btn").onclick = function() {
                editBooking(booking._id);
            };
            item.querySelector(".delete-btn").onclick = function() {
                deleteBooking(booking._id);
            };

            list.appendChild(item);
        }
    })
    .catch(function(error) {
        console.log("Error:", error);
        list.innerHTML = "<p style='color:red'>Error fetching data. Check console (F12).</p>";
    });
}

// add or update a booking
const form = document.getElementById("bookingForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const newBooking = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        bus: document.getElementById("busNumber").value
    };

    if (editId !== null) {
        newBooking._id = editId;
    }

    if (editId === null) {
        axios.post(apiURL, newBooking)
        .then(function(response) {
            console.log("Saved successfully:", response.data);
            form.reset();
            loadBookings();
        })
        .catch(function(error) {
            console.log("Save Error:", error);
            alert("Could not save data.");
        });
    } else {
        axios.put(apiURL + "/" + editId, newBooking)
        .then(function(response) {
            console.log("Updated successfully:", response.data);
            form.reset();
            editId = null;
            document.getElementById("submitBtn").innerText = "Book Now";
            loadBookings();
        })
        .catch(function(error) {
            console.log("Update Error:", error);
            alert("Could not update data.");
        });
    }
});

// delete a booking
function deleteBooking(id) {
    axios.delete(apiURL + "/" + id)
    .then(function() {
        console.log("Deleted successfully");
        loadBookings();
    })
    .catch(function(error) {
        console.log("Delete Error:", error);
    });
}

// fill the form with a booking so it can be edited
function editBooking(id) {
    axios.get(apiURL + "/" + id)
    .then(function(response) {
        const booking = response.data;

        document.getElementById("name").value = booking.name;
        document.getElementById("email").value = booking.email;
        document.getElementById("phone").value = booking.phone;
        document.getElementById("busNumber").value = booking.bus;

        editId = id;
        document.getElementById("submitBtn").innerText = "Update";
    })
    .catch(function(error) {
        console.log("Edit Error:", error);
    });
}

loadBookings();