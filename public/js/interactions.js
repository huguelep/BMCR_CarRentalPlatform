/*
Functions to hide/show INSERT menu
*/

function showAdd(element) {
    document.getElementById(`insert${element}`).style.display = 'block';
}

function hideAdd(element) {
    document.getElementById(`insert${element}`).style.display = 'none';
}

function showButton(element) {
    document.getElementById(element).style.display = 'block';
}
