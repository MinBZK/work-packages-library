# Voorzieningen
Openbare voorzieningen registratie
## Inleiding

### Optimaal gebruik van voorzieningen overheid

Voorzieningen, bij de overheid ook wel ‘regelingen’ genoemd, zijn alle vormen van ondersteuning aan inwoners die geboden worden door nationale of gemeentelijke overheden en charitatieve instellingen. Het vindbaar maken van voorzieningen en het vereenvoudigen van het doen van een aanvraag dragen bij aan het gebruik maken van deze voorzieningen.
![image](https://user-images.githubusercontent.com/25812095/188638312-d234631b-5c16-4079-a442-a15a6af28634.png)
In het eerste halfjaar 2022 is er een onderzoek uitgevoerd naar een Gemeentelijk Gegevenswoordenboek (GGw). Daarbij werd een grote verscheidenheid aan gegevensstructuren zichtbaar op tal van plaatsen in de informatievoorziening van de overheid. De behoefte aan "harmonisatie" van al deze modellen kwam duidelijk naar voren, waartoe het concept van de "Harmonisator" is ontwikkeld. Ook de Voorzieningen zoals bedoeld door regels.overheid.nl steunen op gegevensstructuren. 

### Aanpak traject

- PoC Harmonisator: Maken van een Proof of Concept om de principes vanuit de Harmonisator toe te passen op een ontwerp van de Voorzieningen registratie;
- PoC regels: Koppelen van regels aan voorzieningen, die de voorwaarden voor het recht op een voorziening toepassen;
- Afhankelijk uitkomsten PoC's verdere stappen.  

## Voorzieningen demo omgeving

Op www.ccoverheid.nl/demo/voorzieningen staat een demo-omgeving voor de voorzieningen-toepassing. Deze Scriptcase- applicatie gebruikt een kopie van de database in de ontwikkelomgeving. De structuur en inhoud kan/zal - zonder aankondiging vooraf - geregeld worden gewijzigd. Je kan dus om te testen wel records aanmaken of wijzigen maar deze worden niet definitief bewaard. 
Met de API kan je dan al deze gegevens ophalen, toevoegen of wijzigen.

### MySQL database

- Met tabellen en views volgens het concept van de Harmonisator, van waaruit het voorzieningen-gegevensmodel is opgebouwd (met prefix cc_ van **C**ommon **C**oncepts)
  - cc_term, cc_triple, triple_term_view
- Met tabellen en views voor de toepassing zelf
  - facility, facility_view
- Met tabellen uit het domein van 'Samenwerken' (met prefix co van **co**öperatie) voor de relaties van een voorziening met organisaties, personen en thema's
  - co_group (generieke naam voor organisatie, team, netwerkgroep, etc), co_person en co_theme (thema, domein, context).

De database kan alleen via de API en het Scriptcase demoprogramma worden benaderd. 

De structuur is te vinden in /files/

- MySQLCreateInsertFaciltiyAndCOoperationTables.sql
- MySQLCreateInsertHarmonisatorTables.sql
- MySQLViewFacility.sql
- MySQLViewTerm.sql

### API

We gebruiken vooralsnog de API.php van Maurits van der Schee voor het verkennen van de structuur van de gegevens van voorzieningen. Uitgebreide documentatie over de API.php is te vinden op https://github.com/mevdschee/php-crud-api 

De entiteit Voorziening (facility) is te benaderen en te verkennen op https://ccoverheid.nl/demo/voorzieningen/api.php/records/facility, b.v. met Postman.

Voorbeelden:

```
GET /records/facility/1
GET /records/facility?filter=fac_label,cs,zwemmen
GET /records/facility?filter=fac_target_group_code,eq,kind
GET /records/facility_view
GET /records/facility_view?filter=g_name,cs,jeugdfonds

GET /records/term_view_voorzieningen?include=term_label,term_definition

POST /records/facility
{
    "fac_label": "Bijles, huiswerkbegeleiding",
    "fac_description": "Extra les op specifieke schoolvakken en/of begeleiding bij het maken van huiswerk",
    "fac_target_group_code": "Kind"
}

```

## Demo-applicatie

De demo-applicatie is gemaakt met [Scriptcase](https://www.scriptcase.net/). Dit is een PHP-code generator, vooral nuttig voor prototyping en kleine low cost applicaties.

https://ccoverheid.nl/demo/voorzieningen/menu.



## Toelichting bestanden

### Kwaliteit gegevens

De gegevens in de hier geplaatste bestanden zijn voor een deel compleet, voor zover nodig voor de Proof of Concept. Zo zijn niet bij alle termen de definities ingevuld. Ook zijn de proefgegevens van Vught deels dummy-gegevens. 
De MySQL-database is binnen de PoC-scope **niet** geoptimaliseerd (indexen, views).

### Taal

In algemene zin is de landstaal leidend voor het beschrijven van termen en relaties. 
De meer intern gerichte ICT termen zijn Engelstalig (en-US); dat sluit aan bij de taal voor uitwisseling en hergebruik op Europees/internationaal niveau.

**Naamgevingsconventies**

Uitgangspunt voor namen binnen het Harmonisator-concept (schema's, termen, entiteit- en attribuutnamen, coderingen, etc) is om deze te schrijven in snake_case. Vandaar uit kunnen alle andere schrijfwijzen naar behoefte worden afgeleid. Daarnaast heeft iedere term een leesbaar 'label'.
