$(document).ready(function () {

    var todoList = [];

    var clickedID;
    var objectList = [];
    let $ToDoContainer = $('#ToDoContainer');
    let isModeArchived = false;
    // var objectToDelete;

    var timestamp = moment().unix();
    var Date = moment().format('MMMM Do YYYY, h:mm:ss a');

    var LocalStorageKey = "TodoListLocal";

    //AddTodo
    LoadTodo();

    $('#AddButton').click(function () {
        addToList();
    });

    $('#textfeld').keyup(function (event) {
        if (event.keyCode === 13) { // Überprüfen, ob die gedrückte Taste die Eingabetaste ist
            addToList();
        }
    });
    $('#archButton').click(function () {
        let $archButton = document.getElementById("archButton")

        if (!isModeArchived) {
            showArchived();
            $('#archButton').addClass('clicked')
            $archButton.textContent = "< Archiv >";
            isModeArchived = !isModeArchived;
        } else {
            showTodos();
            $('#archButton').removeClass('clicked')
            $archButton.textContent = "< ToDo >";
            isModeArchived = !isModeArchived;
        }
    });


    function addToList() {
        var text = $('#textfeld').val().trim();
        if (text === '') {
            return;
        }
        isModeArchived = false;
        var timestamp = moment().unix();
        // Hier kommt noch ein Attribut zum Objekt dazu (archived). Damit kannst du dann prüfen, ob der Eintrag
        // bereits gelöscht wurde oder nicht.
        objectList.push({
            id: generateUUID(),
            title: text,
            active: true,
            created_at: timestamp,
            changed_at: timestamp,
            archived: false
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
        // Remove list
        $ToDoContainer.empty();
        let $Heading = $('#Todo-Archived');
        $Heading.text('ToDo');
        $Heading.removeClass('archived-heading');
        $('.container').removeClass('archived-container')

        $('.container-eingabe').show();

        let $ToDoListe = $('<div class="ToDoListe"></div>');
        $ToDoListe.append('<ul id="listeActive"></ul>').append('<ul id="listeDone"></ul>');

        $ToDoContainer.append($ToDoListe);

        objectList.sort(function (a, b) {
            return b.changed_at - a.changed_at;
        });

        var isActive = [];
        var isDeactivated = [];

        objectList.forEach(function (value, index) {
            if (value.active === true) {
                isActive.push(value);
            } else {
                isDeactivated.push(value);
            }
        });


        isActive.forEach(function (value, index) {
            addTodoToList(value);
        });

        isDeactivated.forEach(function (value, index) {
            addTodoToList(value);
        });

        console.log("isActive:", isActive);

    }

    function showArchived(value) {
        // ToDoContainer wird geleert
        $ToDoContainer.empty();

        let $Heading = $('#Todo-Archived');
        $Heading.text('Archived');
        $Heading.addClass('archived-heading');
        $('.container').addClass('archived-container')


        $('.container-eingabe').hide();

        // var $listeElement = $('<li>').text(value.title);
        // $listeElement.data('id', value.id);

        // Füge neues Element zur Liste inklusive dem Listen-Container
        let $ToDoListe = $('<div class="ToDoListe"></div>');
        $ToDoListe.append('<ul id="listeArchived"></ul>');

        //Element in Hauptcontainer einfügen
        $ToDoContainer.append($ToDoListe);

        // Sortieren
        objectList.sort(function (a, b) {
            return b.changed_at - a.changed_at;
        });

        // Iteriere über die Elemente des Arrays
        objectList.forEach(function (value, index) {
            // gehe in function addArchivedToList falls das object archiviert wurde
            if (value.archived) {
                addArchivedToList(value);
            }
        });

    };

    function addArchivedToList(value) {
        // Hier direkt am Anfang auf archived prüfen und einfach einen "return;" machen, falls "archived === false"
        // Dann wird das Element nicht in die Liste übernommen.

        // Baue Listenelement und füge den Titel und die ID hinzu
        var $listeElement = $('<li>').text(value.title);
        $listeElement.data('id', value.id);
        $listeElement.addClass('archived-liste');

        // Neuer Button für den Delete -  Muss jetzt aber ein anderes Icon bekommen.
        // Hier könnte die Rücknahme von Archived passieren!!!!!!!!!
        let $button = $('<button id="openBtn">');
        $button.append('<i class="fas fa-trash-alt"></i>');
        $listeElement.append($button);
        $button.hide();

        let $Abfrage = $('#Abfrage');
        $Abfrage.text('Wiederhinzufügen');

        $button.on('click', function (event) {
            clickedID = $button.parent().data('id');
            event.stopPropagation();
            $('#popup').show();


            $('#closeBtn').on('click', function () {
                $('#popup').hide();
            });
        });

        $('#noButton').on('click', function () {
            $('#popup').hide();
        });
        $('#yesButton').on('click', function () {
            objectList.forEach(entry => {
                if (clickedID === entry.id) {
                    entry.archived = false;
                }
            });
            SaveTodo();
            showArchived();
            $('#popup').hide();

        });

        $listeElement.hover(
            function () {
                $button.show();
            },
            function () {
                $button.hide();
            }
        );

        // Füge Listenelement in Archived
        $('#listeArchived').append($listeElement);

    }

    function addTodoToList(value) {
        // Hier direkt am Anfang auf archived prüfen und einfach einen "return;" machen, falls "archived === false"
        // Dann wird das Element nicht in die Liste übernommen.
        if (value.archived) {
            return;
        }

        let $Abfrage = $('#Abfrage');
        $Abfrage.text('Wirklich Löschen?');

        var $listeElement = $('<li>').text(value.title);
        $listeElement.data('id', value.id);

        let $button = $('<button id="openBtn">');
        $button.append('<i class="fas fa-trash-alt"></i>');
        $listeElement.append($button);
        $button.hide();


        $button.on('click', function (event) {
            clickedID = $button.parent().data('id');
            event.stopPropagation();
            $('#popup').show();

            $('#closeBtn').on('click', function () {
                $('#popup').hide();
            });
        });

        $('#noButton').on('click', function () {
            $('#popup').hide();
        });
        $('#yesButton').on('click', function () {
            objectList.forEach(entry => {
                if (clickedID === entry.id) {
                    entry.archived = true;
                }
            });
            // Am besten hier direkt mit der variable "value" arbeiten und auf "archived = false" setzen. Dann kannst
            // ganz einfach beim addTodoToList() auf das archived achten und die, die archived = false sind, erst gar
            // nicht in der Liste anzeigen lassen. Die Daten bleiben dabei konsistent.
            showTodos();
            SaveTodo();
            $('#popup').hide();

            // let index = objectList.findIndex(function (todo) {
            //     console.log('LOG index todo', todo);
            //
            //     return todo.title === value.title;
            // });
            // if (index !== -1) {
            //     console.log('Index: ', index);
            //     objectList.splice(index, 1); // Entferne das Element aus der Liste
            //     SaveTodo(); // Aktualisiere den Local Storage
            //     showTodos(); // Aktualisiere die angezeigte Liste
            // }
        });


        $listeElement.hover(
            function () {
                $button.show();
            },
            function () {
                $button.hide();
            }
        );

        // Füge Listenelement in Archived
        $('#listeArchived').append($listeElement);
        if (value.active === false) {
            $('#listeDone').append($listeElement);
        } else {
            $('#listeActive').append($listeElement);
        }

        $listeElement.on('click', function () {
            console.log('object beim click in der forEAch', value);
            value.changed_at = moment().unix();
            if (value.active === false) {
                value.active = true;
            } else {
                value.active = false;
            }
            showTodos();
            SaveTodo();

        });
    }

    function SaveTodo() {
        console.log('speichern der ObjectListe', objectList);
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

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function animate() {
        const element = $('#archButton')
        let position = 0;

        position += 1;
        element.style = position + 'px';

        if (position < 200) {
            requestAnimationFrame(animate)
        }
    }
    animate();

});
