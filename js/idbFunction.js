var nama_tabel = "idTeam";
const dbPromise = idb.open("team", 1, function(db){
    db.createObjectStore(nama_tabel);
});

function addTeam(id, name, url){
    dbPromise.then(function(db){
        var tx = db.transaction(nama_tabel, 'readwrite');
        var store = tx.objectStore(nama_tabel);
        var item = {
            idTeam : id,
            nameTeam   : name,
            urlTeam    : url
        };

        store.put(item, id);
        return tx.complete;
    }).then(function(){
        console.log("Simpan berhasil");
        showAddNotification(name);
    }).catch(function(){
        console.log("Gagal menyimpan")
    })
}

function getTeam(){
    dbPromise.then(function(db){
        var tx = db.transaction(nama_tabel, 'readonly');
        var store = tx.objectStore(nama_tabel);
        return store.getAll();
    }).then(function (items){
        getTeamFavourite(items);
    })
}

function delTeam(id){
    dbPromise.then(function(db){
        var tx = db.transaction(nama_tabel, 'readwrite');
        var store = tx.objectStore(nama_tabel);
        store.delete(id);
        return tx.complete;
    }).then(function(){
        console.log("Item : " + id + " delete");
        showDelNotification();
        document.location.reload();
    })
}