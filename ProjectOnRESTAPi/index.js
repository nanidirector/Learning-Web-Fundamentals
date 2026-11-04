
const blogForm = document.getElementById("blogForm");

const imageUrl = document.getElementById("imageUrl");
const blogTitle = document.getElementById("blogTitle");
const blogDescription = document.getElementById("blogDescription");

const blogContainer = document.getElementById("blogContainer");
const totalBlogs = document.getElementById("totalBlogs");

let blogs = [];

blogForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const blog = {
        image: imageUrl.value,
        title: blogTitle.value,
        description: blogDescription.value
    };

    blogs.push(blog);

    displayBlogs();

    blogForm.reset();

});

function displayBlogs() {

    blogContainer.innerHTML = "";

    blogs.forEach(function(blog, index) {

        const blogElement = document.createElement("div");

        blogElement.className = "blog";

        blogElement.innerHTML = `
            <h2>${blog.title}</h2>

            <img src="${blog.image}" alt="Blog Image">

            <p>${blog.description}</p>

            <button onclick="editBlog(${index})">
                Edit Blog
            </button>

            <button onclick="deleteBlog(${index})">
                Delete Blog
            </button>
        `;

        blogContainer.appendChild(blogElement);

    });

    totalBlogs.innerText = blogs.length;

}

function deleteBlog(index) {

    blogs.splice(index, 1);

    displayBlogs();

}

function editBlog(index) {

    const blog = blogs[index];

    imageUrl.value = blog.image;
    blogTitle.value = blog.title;
    blogDescription.value = blog.description;

    blogs.splice(index, 1);

    displayBlogs();

}
