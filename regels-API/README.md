# Regels
Dit project is gemaakt voor [Regels](regels.overheid.nl). Het bevat een Frank en een Angular Frontend.

## Start het Frank!Framework
 - Clone dit Regels project en de [Frank-runner](https://github.com/ibissource/frank-runner) in dezelfde map.
 - Dubbel klik op de restart.bat op windows of de restart.sh op linux in het Regels project en ga naar [localhost/webcontent/RegelsAPI](http://localhost:8081/webcontent/RegelsAPI) voor de frontend.
 - Ga naar de Frank!Console[Frank!Console](http://localhost:8081) als je de status van de Frank wilt bekijken.
 
 ## Stop het Frank!Framework
 - Om de Frank te stoppen op windows sluit het tomcat venster. Om de Frank te stoppen op linux run het stop.sh bestand.

## Werken aan de frontend
Navigeer naar de frontend map(src/frontend) en run `ng serve` voor een lokale testomgeving. Surf naar `http://localhost:4200/`. Zodra er bestanden aangepast worden in de frontend folder zullen deze automatisch gebuild worden.

## Build
Om de applicatie te bouwen run  `ng build` in de frontend map. Dit commando zal de frontend builden en in de Frank neerzetten, om de veranderingen in de Frank te zien moet deze opnieuw worden opgestart.