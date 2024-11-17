console.log("Lade Tierdaten und erstelle Karten");

$(document).ready(function () {
    // Funktion, um alle Karten anzuzeigen
    function displayAnimals(filteredData) {
        $('#wrapper').empty(); // Wrapper leeren, bevor neue Karten hinzugefügt werden

        // Schleife durch jedes Tier in der gefilterten Datenquelle
        $.each(filteredData, function (index, animal) {
            // Erstelle eine einzigartige ID für jede Karte
            let id = index + 1;

            // Erstelle das Karten-HTML dynamisch mit Daten aus animal
            let divBox = $(` <div class="card-wrapper">
                <div class="card-content">
                    <div class="card-number">F${id}</div>
                    <div class="card-title">${animal.name_german}</div> 
                    <img src="${animal.animal_image}" alt="${animal.name}" class="card-image" />
                    <div class="card-trivia">${animal.trivia_german}</div>

                    <!-- Gewicht -->
                    <div class="stat-icon">
                        <img src="images/icons/weight.png" alt="weight" />
                    </div>
                    <div class="stat-value">${animal.max_weight}</div>

                    <!-- Länge -->
                    <div class="stat-icon">
                        <img src="images/icons/length.png" alt="length" />
                    </div>
                    <div class="stat-value">${animal.max_length}</div>

                    <!-- Max Alter -->
                    <div class="stat-icon">
                        <img src="images/icons/age.png" alt="maximum age" />
                    </div>
                    <div class="stat-value">${animal.max_age}</div>

                    <!-- Geschwindigkeit -->
                    <div class="stat-icon">
                        <img src="images/icons/speed.png" alt="max speed" />
                    </div>
                    <div class="stat-value">${animal.top_speed}</div>

                    <!-- Wurfgröße -->
                    <div class="stat-icon">
                        <img src="images/icons/offspring.png" alt="offspring count per cycle" />
                    </div>
                    <div class="stat-value">${animal.litter_size}</div>

                    <!-- Todesfälle -->
                    <div class="stat-icon">
                        <img src="images/icons/death.png" alt="casualties per year" />
                    </div>
                    <div class="stat-value">${animal.intelligence}</div>
                </div>
            </div>
            `);

            // Füge die Karte in den Wrapper-Bereich hinzu
            $('#wrapper').append(divBox);
        });
    }

    // Initial alle Tiere anzeigen
    displayAnimals(data);

    // Event-Listener für die Buttons hinzufügen
    $('.category-button').click(function () {
        const category = $(this).data('category');
        console.log(`Kategorie ausgewählt: ${category}`);

        // Entferne die 'active' Klasse von allen Buttons
        $('.category-button').removeClass('active');

        // Füge die 'active' Klasse zum geklickten Button hinzu
        $(this).addClass('active');

        if (category === "Alle") {
            // Zeige alle Tiere, wenn der "Alle"-Button geklickt wird
            displayAnimals(data);
        } else {
            // Filtere die Tiere nach der ausgewählten Kategorie
            const filteredData = data.filter(function (animal) {
                return animal.groupname_german === category; // Vergleicht die Gruppenbezeichnung
            });

            // Zeige nur die gefilterten Tiere
            displayAnimals(filteredData);
        }
    });

    // Suchfunktion für Tiernamen
    function searchAnimal() {
        const searchQuery = $('#search').val().toLowerCase(); // Den Suchbegriff holen und in Kleinbuchstaben umwandeln

        // Filtere die Tiere basierend auf dem Suchbegriff
        const filteredData = data.filter(function (animal) {
            return animal.name_german.toLowerCase().includes(searchQuery); // Vergleiche den Suchbegriff mit dem Tiernamen
        });

        // Zeige nur die gefilterten Tiere an
        displayAnimals(filteredData);
    }

    // Event-Listener für das Suchfeld
    $('#search').on('input', function () {
        searchAnimal(); // Suche ausführen, wenn der Benutzer etwas eingibt
    });

    // Event-Listener für den Suchbutton
    $('#search-button').click(function () {
        searchAnimal(); // Suche ausführen, wenn der Benutzer auf den Suchbutton klickt
    });
});
