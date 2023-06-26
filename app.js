$(document).ready(function() {

    //AddTodo
        var button = document.getElementById('AddButton');

        button.addEventListener('click',function () {
        var text = document.getElementById('textfeld').value;
        var listeElement = document.createElement('li');
        var textnode = document.createTextNode(text);
        listeElement.appendChild(textnode);
        document.getElementById('liste').appendChild(listeElement);
        document.getElementById('textfeld').value = '';

        button.classList.add('clicked');
        button.innerHTML = 'Added!';

        setTimeout(function (){
            button.classList.remove('clicked');
            button.innerHTML = '+';
        }, 2000);
    });

});
