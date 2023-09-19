class Database {
    LocalStorageKey = "TodoListLocal";

    constructor() {}

    load() {
        var retrievedValue = localStorage.getItem(this.LocalStorageKey);
        var retrievedArray = JSON.parse(retrievedValue);
        if (Array.isArray(retrievedArray)) {
             return retrievedArray;
        }
    }

    save(objectList) {
        var LocalStorageValue = JSON.stringify(objectList);
        localStorage.setItem(this.LocalStorageKey, LocalStorageValue);
    }
}

// Exportieren Sie die Klasse, damit sie in anderen Dateien verwendet werden kann
export default Database;
