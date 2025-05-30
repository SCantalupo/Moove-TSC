// CLASSE Mezzo
var Mezzo = /** @class */ (function () {
    function Mezzo(id, tipo) {
        this.stato = 'disponibile';
        this.id = id;
        this.tipo = tipo;
    }
    Mezzo.prototype.assegnaUtente = function (utente) {
        if (this.stato === 'disponibile') {
            this.stato = 'in uso';
            console.log("Il mezzo ".concat(this.id, " (").concat(this.tipo, ") \u00E8 stato assegnato a ").concat(utente.nome, " ").concat(utente.cognome, "."));
        }
        else {
            console.log("Il mezzo ".concat(this.id, " \u00E8 gi\u00E0 in uso."));
        }
    };
    return Mezzo;
}());
// CLASSE Utente
var Utente = /** @class */ (function () {
    function Utente(nome, cognome, email, metodoPagamento) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.metodoPagamento = metodoPagamento;
    }
    Utente.prototype.prenotaMezzo = function (mezzo) {
        if (mezzo.stato === 'disponibile') {
            mezzo.assegnaUtente(this);
        }
        else {
            console.log("".concat(this.nome, " ").concat(this.cognome, " non pu\u00F2 prenotare il mezzo ").concat(mezzo.id, " perch\u00E9 non \u00E8 disponibile."));
        }
    };
    return Utente;
}());
// CLASSE Citta
var Citta = /** @class */ (function () {
    function Citta(nome) {
        this.mezziDisponibili = [];
        this.nome = nome;
    }
    Citta.prototype.aggiungiMezzo = function (mezzo) {
        this.mezziDisponibili.push(mezzo);
        console.log("Aggiunto ".concat(mezzo.tipo, " (ID: ").concat(mezzo.id, ") alla citt\u00E0 di ").concat(this.nome, "."));
    };
    return Citta;
}());
// ---------- TEST DEL SISTEMA ---------- //
// Istanzia mezzi
var mezzo1 = new Mezzo("M001", "bici");
var mezzo2 = new Mezzo("M002", "scooter");
var mezzo3 = new Mezzo("M003", "monopattino");
// Istanzia utenti
var utente1 = new Utente("Anna", "Rossi", "anna.rossi@email.com", "Carta di credito");
var utente2 = new Utente("Luca", "Verdi", "luca.verdi@email.com", "PayPal");
// Istanzia città
var milano = new Citta("Milano");
// Aggiungi mezzi alla città
milano.aggiungiMezzo(mezzo1);
milano.aggiungiMezzo(mezzo2);
milano.aggiungiMezzo(mezzo3);
// Prenotazioni
utente1.prenotaMezzo(mezzo1); // dovrebbe riuscire
utente2.prenotaMezzo(mezzo1); // dovrebbe fallire, mezzo già in uso
// Aggiunta nuovo mezzo e prenotazione
var mezzo4 = new Mezzo("M004", "scooter");
milano.aggiungiMezzo(mezzo4);
utente2.prenotaMezzo(mezzo4); // dovrebbe riuscire
