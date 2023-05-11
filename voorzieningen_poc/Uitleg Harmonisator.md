# Korte uitleg Harmonisator

In de zomer van 2022 is het concept van de "Harmonisator" ontwikkeld, dat is gebaseerd op generieke principes en theorieën en dat momenteel bestaat uit een metamodel ontologie waaruit een gegevensmodel voor termen en relaties is gegenereerd, een database met een beheer app en diverse exportfuncties (RDF/XML, HTML, JSON, definitielijst, etc.). Voorbeelden van schema's zijn gebruikt om het model te testen en om de werking zichtbaar te maken. 

Meer uitleg volgt binnenkort op een aparte website.

# Conceptueel gegevensmodel

De kracht van de Harmonisator is de vereenvoudigde gegevensstructuur van het metamodel, met een beperkt aantal objecttypen, een set gestandaardiseerde attributen per term en een triple-formaat voor de relaties tussen termen. Daarmee sluit het aan op de internationale standaards zoals RDF, SKOS, OWL en Linked Data, en op nationale concepten zoals NORA, GEMMA, Common Ground. 

<img src="https://user-images.githubusercontent.com/38116193/205630323-debf0250-ca85-4650-a932-5a4b9adb0867.png" width=600>

## Samenhang Voorzieningen en Harmonisator 

In het onderstaande schema staan de op te leveren producten vanuit de Harmonisator in geel. De Harmonisator verzamelt en analyseert de termen en relaties in het domein/context van de "Voorzieningen van de overheid". Concreet in de vorm van de voorbeeld-spreadsheets. De termen en relaties worden ingevoerd in de Harmonisator-database, daarbij voorzien van de standaard kenmerken, waaronder definitie, omschrijving, datatype, etc. 
Uit de database genereren we de benodigde producten.

![ConceptHarmonisator](https://user-images.githubusercontent.com/25812095/188638539-e20c0c7d-97c2-41d0-99d0-66c534fd7e8e.png)

### Standaard attributen uit Harmonisator

De Harmonisator heeft in de kern drie hoofdentiteiten:

<img src="https://user-images.githubusercontent.com/25812095/188639069-c1facb5d-3a80-4457-94ed-9f06918d95f1.png" width=600>

Er zijn 40 standaard attributen van een Term:

![TermAttributen](https://user-images.githubusercontent.com/38116193/205875248-27bce908-4be2-458a-b824-b8ded65b44aa.png)

### Producten uit de Harmonisator

Als de termen uit een bepaald domein zijn opgenomen in een schema, voorzien van de relevante attributen en onderling in relatie gebracht, kunnen verschillende producten uit de ontologie worden gegenereerd, b.v. voor Voorzieningen:

- [ ] Schema "Voorzieningen" 
- [ ] Definitielijst als begrippenkader Voorzieningen
- [ ] Conceptueel gegevensmodel Voorzieningen
- [ ] Logisch gegevensmodel Voorzieningen (entiteiten en attributen) 
- [ ] Technisch gegevensmodel Voorzieningen voor gebruik met relationele database in MySQL
- [ ] JSON schema van voorzieningen 
- [ ] API van voorzieningen

Met deze producten kan een informatiesysteem worden gebouwd, in de technische omgeving van keuze. Voor de PoC van Voorzieningen is dit uitgevoerd in een relationele database MySQL. Deze is met een Restful API ontsloten en CRUD-functies zijn gemaakt met een specifiek low-code ontwikkelplatform:

- [ ] CRUD-onderhoudsfuncties in PHP (met codegenerator Scriptcase) voor invoer proefgegevens
- [ ] Set proefgegevens uit spreadsheets Vught
- [ ] Zoek app als demo  
