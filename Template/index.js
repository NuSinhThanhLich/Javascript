var block = document.querySelector('#music_list')

var api = " http://localhost:3000/music_list"

function start() {
    getList(function(music_list) {
        renderList(music_list)
    });
    handleInput()
}

start();

function getList(callback) {
    //function(music_list) = callback
    fetch(api)
        .then(function(response) {
            return response.json()
        })
        .then(callback)
}

function createItem(data, callback) {
    fetch(api, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

function handleDeleteCourse(id) {
    fetch(api + '/' + id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(function(response) {
            return response.json();
        })
        .then(getList(renderList));
}

function renderList(music_list) {
    var html = music_list.map(function(list) {
        return `<li class="item">
                    <h3>${list.name}</h3>
                    <h3>${list.author}</h3>
                    <a href=${list.link}>Link</a>
                    <button onclick="handleDeleteCourse(${list.id})">Delete</button>
                </li>
                `
    })
    var item = html.join('');
    block.innerHTML = item;
}

function handleInput () {
    var createBtn = document.querySelector('#create')
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value
        var author = document.querySelector('input[name="author"]').value
        var link = document.querySelector('input[name="link"]').value
       
        var data = {
            name: name,
            author: author,
            link: link,
        }
    
        createItem(data, getList(renderList));
    }
}

