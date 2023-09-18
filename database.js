class Database {
    LocalStorageKey = "TodoListLocal";

    constructor() {}

    load() {
        console.log('bin in der datenbank klasse und lade Daten');
        var retrievedValue = localStorage.getItem(this.LocalStorageKey);
        var retrievedArray = JSON.parse(retrievedValue);
        if (Array.isArray(retrievedArray)) {
             return retrievedArray;
        }
    }

    save() {

    }
}

// Exportieren Sie die Klasse, damit sie in anderen Dateien verwendet werden kann
export default Database;
