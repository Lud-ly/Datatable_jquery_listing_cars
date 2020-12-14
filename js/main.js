function constructTable() {
    var i;

    var sHTML = "";
    sHTML += "<thead>";
    sHTML += "<tr>";
    sHTML += "<td>Année</td>";
    sHTML += "<td>Marque</td>";
    sHTML += "<td>Modèle</td>";
    sHTML += "<td>Motorisation</td>";
    sHTML += "<td>CV</td>";
    sHTML += "<td>Editer</td>";
    sHTML += "<td>Supprimer</td>";
    sHTML += "</tr>";
    sHTML += "</thead>";
    sHTML += "<tbody>";
    

    for (i = 0; i < aOfCars.length; i++) {
        sHTML += "<tr>";
        sHTML += "<td>" + aOfCars[i]["annee"] + "</td>";
        sHTML += "<td>" + aOfCars[i]["marque"] + "</td>";
        sHTML += "<td>" + aOfCars[i]["modele"] + "</td>";
        sHTML += "<td>" + aOfCars[i]["motorisation"] + "</td>";
        sHTML += "<td>" + aOfCars[i]["cv"] + "</td>";
        sHTML += "<td class='icon' onClick=\"editcar(" + i + ")\"><img src='./img/edit_pencil.png'></td>";
        sHTML += "<td  class='icon' onClick=\"deleteCar(" + i + ")\"><img src='./img/trash.png'></td>";
        sHTML += "</tr>";
    }

    sHTML += "</tbody>";
    $('#table_cars').html(sHTML);
}

function addCar() {
    // Longueur actuel du tableau JS :
    var iLongueur = aOfCars.length;

    // ajout une voiture en fin de tableau JS
    aOfCars[iLongueur] = [];
    aOfCars[iLongueur]["annee"] = $('#annee').val();
    aOfCars[iLongueur]["marque"] = $('#marque').val();
    aOfCars[iLongueur]["modele"] = $('#modele').val();
    aOfCars[iLongueur]["motorisation"] = $('#motorisation').val();
    aOfCars[iLongueur]["cv"] = $('#cv').val();

    // Reconstruire le tableau HTML
    rebuildDatable();

    // Vider le formulaire
    clearForm();
}

function rebuildDatable() {
    $('#table_cars').html("");
    tables.clear();
    tables.destroy();
    constructTable();
    tables = $('#table_cars').DataTable(configuration);
}
//Fonction Vider le formulaire
function clearForm() {
    $("input").val(" ");

}

function majCar() {
    // Modifier les éléments du tableau dont l'indice est iIndiceEditEnCours
    // ajout la modif à l'indice iIndiceEditEnCours
    aOfCars[iIndiceEditEnCours]["annee"] = $('#annee').val();
    aOfCars[iIndiceEditEnCours]["marque"] = $('#marque').val();
    aOfCars[iIndiceEditEnCours]["modele"] = $('#modele').val();
    aOfCars[iIndiceEditEnCours]["motorisation"] = $('#motorisation').val();
    aOfCars[iIndiceEditEnCours]["cv"] = $('#cv').val();

    // Reconstruire le tableau HTML
    rebuildDatable();
    // Vider le formulaire
    clearForm();
    // Remettre mes boutons correctement
    // Montrer le bouton ajouter
    $(".btn_action").show();
    // Cacher le bouton modifier
    $(".btn_modif").removeClass('show');
    // Cacher le bouton annuler
    $(".btn_save").removeClass('show');
}

function deleteCar(iIndiceEditEnCours) {
    // Supprimer les éléments du tableau dont l'indice est iIndiceEditEnCours
    //console.log(aOfCars[iIndiceEditEnCours]);
    alert("Voulez vous vraiment supprimez " + aOfCars[iIndiceEditEnCours]["marque"] + " " + aOfCars[iIndiceEditEnCours]["modele"] + " ?");
    aOfCars.splice(iIndiceEditEnCours, 1);

    rebuildDatable();
}
//Annuler modif
function annulCar() {
    clearForm();
    // Reconstruire le tableau HTML
    rebuildDatable();

    // Remettre mes boutons correctement
    // Montrer le bouton ajouter
    $(".btn_action").show();
    // Cacher le bouton modifier
    $(".btn_modif").removeClass("show");
    // Cacher le bouton annuler
    $(".btn_save").removeClass("show");
}

var iIndiceEditEnCours;
//Modifier voiture
function editcar(iIndiceEdit) {
    alert("Modifier " + aOfCars[iIndiceEdit]["marque"] + " " + aOfCars[iIndiceEdit]["modele"] + " ?");
    iIndiceEditEnCours = iIndiceEdit;
    // J'édite la voiture en question
    $('#annee').val(aOfCars[iIndiceEdit]["annee"]);
    $('#marque').val(aOfCars[iIndiceEdit]["marque"]);
    $('#modele').val(aOfCars[iIndiceEdit]["modele"]);
    $('#motorisation').val(aOfCars[iIndiceEdit]["motorisation"]);
    $('#cv').val(aOfCars[iIndiceEdit]["cv"]);

    // cacher le bouton ajouter
    $(".btn_action").hide();
    // Montrer le bouton modifier
    $(".btn_modif").addClass("show");
    // Montrer le bouton annuler
    $(".btn_save").addClass("show");
}

// CONFIGURATION DATATABLE
const configuration = {
    "stateSave": false,
    "order": [[1, "asc"]],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [[5, 10, 25, 50, 100, -1], ["Cinq", "Dix", "Vingt cinq", "Cinquante", "Cent", "Ze total stp"]],
    "language": {
        "info": "Véhicules _START_ à _END_ sur _TOTAL_ sélectionnés",
        "emptyTable": "Aucun véhicule",
        "lengthMenu": "_MENU_ Véhicules par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Voitures 0 à 0 sur 0 sélectionné",
    },
    "columns": [
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": false
        },
        {
            "orderable": false
        }
    ],
    'retrieve': true
};

var tables;
$(document).ready(function () {
    constructTable();
    // INIT DATATABLE
    tables = $('#table_cars').DataTable(configuration);
});