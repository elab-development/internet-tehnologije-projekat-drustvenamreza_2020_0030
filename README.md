Sociopedia je društvena mreža na kojoj je moguće kačiti objave, deliti ih sa svojim prijateljima i gledati statistike vezano za korisnike i objave. 
Korisnici koji pristupaju aplikaciji mogu imati 3 role: korisnik, admin i moderator. Takođe postoji i neregistrovani korisnik, koji prvo mora da se registruje pre nego što pristupi logovanju. Admin i moderator ne mogu kačiti objave i dodavati prijatelje, oni su tu samo da vrše korekcije nad objavama i korisnicima. Admin moze brisati objave korisnika, kao i banovati korisnika na osnovu reportova koje dobija od moderatora. Takodje vidi broj lajkova, komentara i reportova za sve postove i korisnike preko specijalnog dashboarda. Moderator moze samo da reportuje postove. Korisnik može da kaći objave, komentariše, dodaje i briše prijatelje i vidi svoj profil.

U okviru aplikacije imaćemo 4 modela – User, Ban, Report i Post.


Glavne funkcionalnosti naše aplikacije uključuju: 
Sign up (Registracija) – stranica za registraciju korisnika koji želi da se priključi platformi. Ovde morate uneti svoje ime, prezime, lokaciju, zanimanje, sliku, mejl i lozinku, a postoji i dugme za registraciju.
Sign in – stranica za logovanje koja sadrži unos mejla i lozinke, kao i dugme za logovanje.
Feed – naslovna stranica koja služi korisniku za pregledanje najnovijih postova drugih korisnika, za dodavanje sopstvenih postova, za lajkovanje i komentarisanje tuđih postova, ali i za brzo preusmeravanje na profile korisnika koji su kreirali postove.
Profil – možemo videti sopstveni profil, ali i profil drugih korisnika gde nam se prikazuju informacije o lokaciji, zanimanju, postovi korisnika kao i friend list.
Admin dashboard – samo admin mu može pristupiti, i on ima opciju da vidi sve korisnike, sve postove, ali i da obriše postove.


Serverski deo aplikacije pokrece se komandom nodemon index.js, dok se klijentski deo pokrece komandom npm start.
