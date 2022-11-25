# Blueriq: The business rules model is the IT application
The Blueriq Platform enables product owners (process owners, application owners) to easily build a model of all the applicable business rules and execute it as an IT application. 
The evident advantages are:-
-	Short deliverable time for new IT applications (business rules based);
-	Using the same ‘’language’’ as is used in the business, same data definitions;
-	Transparent view of business rules used, no technical IT knowledge needed;
-	Ensuring consistent use of business rules. All layers of the Blueriq Platform use the same model;
-	Creating agile systems. It’s easy and fast to change the business rules.
 
## ‘Virtueel Inkomstenloket’
For the ‘Virtueel Inkomstenloket’ Blueriq  realized calculating the  ‘individuele inkomenstoeslag’ based on the defined business rules (https://open-regels.nl/Rapportages/Rapportage_Individuele_Inkomenstoeslag.html).  
The following executable model was build in the Blueriq Platform, based on these specifications within days.  
The annual change of business rules, like ‘bovengrens_inkomen_alleenstaande’ is easy to add. Also if the applications is used by more entities (like cities or region’s) with the same rules (model) but different values, this would we easy to add. 
### ‘Individuele inkomenstoeslag’ in decision tables and knowledge rules
A decision table is used to determine the values of the parameters:  
![parameter decision table](/Blueriq-virtueel-inkomensloket/images/Parameter_Decisiontable.png "parameter decision table")  
A knowledge rule is used to determine whether someone is eligible for a surcharge (toeslag).  
![eligible for surcharge](/Blueriq-virtueel-inkomensloket/images/RechtOpToeslag2022.png "eligible for surcharge")  
A decision table is used to calculate the surcharge (toeslag). This decision table calculates the amount of the surcharge (can also be zero).  
![surcharge 2021](/Blueriq-virtueel-inkomensloket/images/BerekeningToeslag2021.png "surcharge 2021")  
A decision table is used for feedback. This indicates whether and how much surcharge has been calculated.  
![surcharge 2022](/Blueriq-virtueel-inkomensloket/images/BerekeningToeslag2022.png "surcharge 2022")  
