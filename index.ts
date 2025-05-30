// INTERFACCIA IMezzo
interface IMezzo {
  id: string;
  tipo: 'bici' | 'scooter' | 'monopattino';
  stato: 'disponibile' | 'in uso';
  assegnaUtente(utente: IUtente): void;
}

// INTERFACCIA IUtente
interface IUtente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamento: string;
  prenotaMezzo(mezzo: IMezzo): void;
}

// INTERFACCIA ICitta
interface ICitta {
  mezziDisponibili: IMezzo[];
  aggiungiMezzo(mezzo: IMezzo): void;
}

// CLASSE Mezzo
class Mezzo implements IMezzo {
  id: string;
  tipo: 'bici' | 'scooter' | 'monopattino';
  stato: 'disponibile' | 'in uso' = 'disponibile';

  constructor(id: string, tipo: 'bici' | 'scooter' | 'monopattino') {
    this.id = id;
    this.tipo = tipo;
  }

  assegnaUtente(utente: IUtente): void {
    if (this.stato === 'disponibile') {
      this.stato = 'in uso';
      console.log(`Il mezzo ${this.id} (${this.tipo}) è stato assegnato a ${utente.nome} ${utente.cognome}.`);
    } else {
      console.log(`Il mezzo ${this.id} è già in uso.`);
    }
  }
}

// CLASSE Utente
class Utente implements IUtente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamento: string;

  constructor(nome: string, cognome: string, email: string, metodoPagamento: string) {
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.metodoPagamento = metodoPagamento;
  }

  prenotaMezzo(mezzo: IMezzo): void {
    if (mezzo.stato === 'disponibile') {
      mezzo.assegnaUtente(this);
    } else {
      console.log(`${this.nome} ${this.cognome} non può prenotare il mezzo ${mezzo.id} perché non è disponibile.`);
    }
  }
}

// CLASSE Citta
class Citta implements ICitta {
  nome: string;
  mezziDisponibili: IMezzo[] = [];

  constructor(nome: string) {
    this.nome = nome;
  }

  aggiungiMezzo(mezzo: IMezzo): void {
    this.mezziDisponibili.push(mezzo);
    console.log(`Aggiunto ${mezzo.tipo} (ID: ${mezzo.id}) alla città di ${this.nome}.`);
  }
}

// ---------- TEST DEL SISTEMA ---------- //

// Istanzia mezzi
const mezzo1 = new Mezzo("M001", "bici");
const mezzo2 = new Mezzo("M002", "scooter");
const mezzo3 = new Mezzo("M003", "monopattino");

// Istanzia utenti
const utente1 = new Utente("Anna", "Rossi", "anna.rossi@email.com", "Carta di credito");
const utente2 = new Utente("Luca", "Verdi", "luca.verdi@email.com", "PayPal");

// Istanzia città
const milano = new Citta("Milano");

// Aggiungi mezzi alla città
milano.aggiungiMezzo(mezzo1);
milano.aggiungiMezzo(mezzo2);
milano.aggiungiMezzo(mezzo3);

// Prenotazioni
utente1.prenotaMezzo(mezzo1); // dovrebbe riuscire
utente2.prenotaMezzo(mezzo1); // dovrebbe fallire, mezzo già in uso

// Aggiunta nuovo mezzo e prenotazione
const mezzo4 = new Mezzo("M004", "scooter");
milano.aggiungiMezzo(mezzo4);
utente2.prenotaMezzo(mezzo4); // dovrebbe riuscire
