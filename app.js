$(document).ready(function () {

    var todoList = [];

    var objectList = [];


    var timestamp = moment().unix();
    var Date = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(Date); // Ausgabe des formatierten Datums in der Konsole
    console.log(objectList);

    var LocalStorageKey = "TodoListLocal";

    //AddTodo
    $(document).ready(function () {
        LoadTodo();


        $('#AddButton').click(function () {
            addToList();
        });

        $('#textfeld').keyup(function (event) {
            if (event.keyCode === 13) { // Überprüfen, ob die gedrückte Taste die Eingabetaste ist
                addToList();
            }
        });

        function addToList() {
            var text = $('#textfeld').val().trim();
            if (text === '') {
                return;
            }

            var timestamp = moment().unix();
            objectList.push({
                title: text,
                active: true,
                created_at: timestamp,
                changed_at: timestamp
            });
            $('#textfeld').val('');
            $('#AddButton').addClass('clicked');
            setTimeout(function () {
                $('#AddButton').removeClass('clicked');
            }, 500);
            SaveTodo();
            showTodos();

        }

        function showTodos() {
            objectList.sort(function (a, b) {
                return b.changed_at - a.changed_at;
            });
            $('#listeActive').empty();
            $('#listeDone').empty();
            console.log('Eintag aus der objectList', objectList);

            var isActive = [];
            var isDeactivated = [];


            objectList.forEach(function (value, index) {
                if (value.active === true) {
                    isActive.push(value);
                } else {
                    isDeactivated.push(value);
                }
            });

            console.log('isActiveList', isActive);
            console.log('isDeactived', isDeactivated);

            isActive.forEach(function (value, index) {
                addTodoToList(value);
            });

            isDeactivated.forEach(function (value, index) {
                addTodoToList(value);
            });


        }

        function addTodoToList(value) {
            var $listeElement = $('<li>').text(value.title);
            let $button = $('<button id="openBtn">');
            $button.append('<i class="fas fa-trash-alt"></i>');
            $listeElement.append($button);
            $button.hide();


            $button.on('click', function (event) {
                event.preventDefault();
                $('#popup').show();
                $('#closeBtn').on('click', function() {
                    $('#popup').hide();
                });
            });

            $('#yesButton').on('click', function () {
                let index = objectList.findIndex(function (todo) {
                    console.log('LOG index todo', todo);

                    return todo.title === value.title;
                });
                if (index !== -1) {
                    console.log('Index: ', index);
                    objectList.splice(index, 1); // Entferne das Element aus der Liste
                    SaveTodo(); // Aktualisiere den Local Storage
                    showTodos(); // Aktualisiere die angezeigte Liste
                }
            });


            $listeElement.hover(
                function () {
                    $button.show();
                },
                function () {
                    $button.hide();
                }
            );

            if (value.active === false) {
                $('#listeDone').append($listeElement);
            } else {
                $('#listeActive').append($listeElement);
            }

            $listeElement.on('click', function () {
                console.log('object beim click in der forEAch', value);
                value.changed_at = moment().unix();
                console.log('object beim click in der forEAch', value);
                if (value.active === false) {
                    value.active = true;
                } else {
                    value.active = false;
                }
                showTodos();
                SaveTodo();

            });
        };

        function SaveTodo() {
            var LocalStorageValue = JSON.stringify(objectList);
            localStorage.setItem(LocalStorageKey, LocalStorageValue);
        }

        function LoadTodo() {
            var retrievedValue = localStorage.getItem(LocalStorageKey);
            var retrievedArray = JSON.parse(retrievedValue);
            if (Array.isArray(retrievedArray)) {
                objectList = retrievedArray;
            }
            showTodos();

        }
    });
});