$(document).ready(function() {

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

                        if (text !== '') {
                                var listeElement = $('<li>').text(text);
                                $('#liste').append(listeElement);
                                $('#textfeld').val('');

                                $('#AddButton').addClass('clicked');

                                setTimeout(function() {
                                        $('#AddButton').removeClass('clicked');
                                }, 500);
                        }
                }
        });

        //Abgeschlossen
        $(document).ready(function() {
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
        });





});
