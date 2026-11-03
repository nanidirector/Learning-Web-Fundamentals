// Write your code below:
const API_URL = "https://crudcrud.com/api/5cf01ef06d8a455b9c29d838a02abe35/appointmentData";
document.addEventListener("DOMContentLoaded", () => {
    axios.get(API_URL)
        .then((response) => {
            response.data.forEach((user) => {
                displayUserOnScreen(user);
            });
        })
        .catch ((error) => {
        console.log(error);
    });
})
function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value
    };
    axios.post(API_URL, userDetails)
        .then((response) => {
            displayUserOnScreen(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}
function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
        document.createTextNode(
            `${userDetails.username}-${userDetails.email}-${userDetails.phone}`
        )
    );
    const delBtn = document.createElement("button");
    delBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(delBtn);
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
    delBtn.addEventListener("click", function () {
        axios.delete (`${API_URL
            }/${userDetails._id}`)
            .then(() => {
                userList.removeChild(userItem);
            })
            .catch((error) => {
                console.log(error);
            });
    })
}

// Do not touch the code below
module.exports = handleFormSubmit;
