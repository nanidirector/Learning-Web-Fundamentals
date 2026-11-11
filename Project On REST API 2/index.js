// Your API URL with /bookings at the end
const apiURL = "https://crudcrud.com/api/fe9dc1e0aa2f43909fb045cf8d9cbd80/bookings";

const form = document.getElementById("bookingForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const busInput = document.getElementById("busNumber");
const list = document.getElementById("bookingList");
const submitBtn = document.getElementById("submitBtn");

let editId = null;

// 1. GET DATA (AXIOS)
function loadBookings() {
    list.innerHTML = "<p>Loading...</p>";

    axios.get(apiURL)
    .then(function(response) {
        // Log to console so you can see the data
        console.log("Data from API:", response.data);

        list.innerHTML = ""; // Clear loading text

        // If data is empty
        if (response.data.length === 0) {
            list.innerHTML = "<p>No bookings yet. Try adding one!</p>";
            return;
        }

        // Loop through data and show it
        for (let i = 0; i < response.data.length; i++) {
            let booking = response.data[i];
            let div = document.createElement("div");
            div.className = "booking-item";

            div.innerHTML = `
                <span><b>${booking.name}</b></span>
                <span>${booking.email}</span>
                <span>${booking.phone}</span>
                <span class="bus-badge">${booking.bus}</span>
                <button onclick="editBooking('${booking._id}')">Edit</button>
                <button onclick="deleteBooking('${booking._id}')">Delete</button>
            `;
            list.appendChild(div);
        }
    })
    .catch(function(error) {
        console.log("Error:", error);
        list.innerHTML = "<p style='color:red'>Error fetching data. Check console (F12).</p>";
    });
}

// 2. ADD OR UPDATE (AXIOS)
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let newBooking = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        bus: busInput.value
    };

    // If we are editing, CrudCrud requires the _id in the body
    if (editId !== null) {
        newBooking._id = editId; 
    }

    if (editId === null) {
        // --- POST (Create) ---
        axios.post(apiURL, newBooking)
        .then(function(response) {
            console.log("Saved successfully:", response.data);
            form.reset();       // Clear form
            loadBookings();     // Refresh screen instantly
        })
        .catch(function(error) {
            console.log("Save Error:", error);
            alert("Could not save data.");
        });
    } else {
        // --- PUT (Update) ---
        axios.put(apiURL + "/" + editId, newBooking)
        .then(function(response) {
            console.log("Updated successfully:", response.data);
            form.reset();
            editId = null;
            submitBtn.innerText = "Book Now";
            loadBookings();     // Refresh screen instantly
        })
        .catch(function(error) {
            console.log("Update Error:", error);
            alert("Could not update data.");
        });
    }
});

// 3. DELETE (AXIOS)
function deleteBooking(id) {
    axios.delete(apiURL + "/" + id)
    .then(function() {
        console.log("Deleted successfully");
        loadBookings(); // Refresh screen instantly
    })
    .catch(function(error) {
        console.log("Delete Error:", error);
    });
}

// 4. EDIT (AXIOS)
function editBooking(id) {
    axios.get(apiURL + "/" + id)
    .then(function(response) {
        let booking = response.data;
        
        nameInput.value = booking.name;
        emailInput.value = booking.email;
        phoneInput.value = booking.phone;
        busInput.value = booking.bus;

        editId = id;
        submitBtn.innerText = "Update";
    })
    .catch(function(error) {
        console.log("Edit Error:", error);
    });
}

// Run on page load
loadBookings();