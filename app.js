

$(document).ready(function() {

        var todoList = [];

        var objectList = [];


        var timestamp = moment().unix(); // Moment.js-Objekt erstellen, das die aktuelle Zeit darstellt
        // var formattedDate = now.format('DD.MM.YYYY'); // Formatieren des Datums
        console.log(timestamp); // Ausgabe des formatierten Datums in der Konsole
        console.log(objectList);

        var LocalStorageKey= "TodoListLocal";

    //AddTodo
        $(document).ready(function() {
                LoadTodo();


                $('#AddButton').click(function() {
                        addToList();
                });

                $('#textfeld').keyup(function(event) {
                        if (event.keyCode === 13) { // Überprüfen, ob die gedrückte Taste die Eingabetaste ist
                                addToList();
                        }
                });

                function addToList() {
                        var text = $('#textfeld').val().trim();
                        console.log('textfeld', $('#textfeld'))
                        console.log('val', $('#textfeld').val())
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
                        setTimeout(function() {
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
                        console.log('Alle Werte zusammen', objectList)
                        console.log('Das hat ' + objectList.length + ' Einträge');
                        console.log('Eintag aus der objectList', objectList);

                        var isActive = [];
                        var isDeactivated = [];



                        objectList.forEach(function(value, index) {
                            if (value.active === true) {
                                    isActive.push(value);
                            } else {
                                    isDeactivated.push(value);
                            }
                        });

                        console.log('isActiveList', isActive);
                        console.log('isDeactived', isDeactivated);

                        isActive.forEach(function(value, index) {
                            addTodoToList(value);
                        });

                        isDeactivated.forEach(function(value, index) {
                                addTodoToList(value);
                        });


                }

                function addTodoToList(value) {
                        var $listeElement = $('<li>').text(value.title);
                        if (value.active === false) {
                                $('#listeDone').append($listeElement);
                        } else {
                                $('#listeActive').append($listeElement);
                        }

                        $listeElement.on('click', function() {
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

                                console.log('neue ObjectList vielleicht mit dem richtigen Wert?', objectList);
                        });
                }

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

                        console.log("Array",retrievedArray);
                        console.log("Value",retrievedValue);
                        console.log(objectList);


                }
        });
});