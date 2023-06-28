

$(document).ready(function() {

        var todoList = [];

        var objectList = [];

        var timestamp = moment().unix(); // Moment.js-Objekt erstellen, das die aktuelle Zeit darstellt
        // var formattedDate = now.format('DD.MM.YYYY'); // Formatieren des Datums
        console.log(timestamp); // Ausgabe des formatierten Datums in der Konsole
    //AddTodo
        $(document).ready(function() {



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
                        showTodos();

                }

        //Abgeschlossen
                $('#liste').on('click', 'li', function() {
                        $(this).toggleClass('clicked');
                        sortListItems();
                });

                function sortListItems() {
                        var list = $('#liste');

                        var listItems = list.children('li').get();

                        listItems.sort(function(a, b) {
                                var isAClicked = $(a).hasClass('clicked');
                                var isBClicked = $(b).hasClass('clicked');

                                if (isAClicked && !isBClicked) {
                                        return -1; // a nach unten verschieben
                                } else if (!isAClicked && isBClicked) {
                                        return 1; // b nach unten verschieben
                                } else {
                                        return 0; // Reihenfolge beibehalten
                                }
                        });

                        $.each(listItems, function(index, listItem) {
                                list.append(listItem);
                        });

                }
                function showTodos() {
                        var $liste = $('#liste');
                        console.log('das ist meine liste', $liste)
                        $liste.empty();
                        console.log('Alle Werte zusammen', objectList)
                        console.log('Das hat ' + objectList.length + ' Einträge');
                        console.log('Eintag aus der objectList', objectList);
                        objectList.forEach(function(value, index) {
                                        var $listeElement = $('<li>').text(value.title);

                                        $listeElement.on('click', function() {
                                            console.log('object beim click in der forEAch', value);
                                            value.active = false;
                                            value.changed_at = moment().unix();
                                                console.log('object beim click in der forEAch', value);
                                                showTodos();
                                        });


                                        console.log('Boolean von ' + value.title, value.active)
                                        $('#liste').append($listeElement);
                        });


                }

                function addActiveElement(element) {

                }

                function unactiveElements(element) {

                }
        });
});