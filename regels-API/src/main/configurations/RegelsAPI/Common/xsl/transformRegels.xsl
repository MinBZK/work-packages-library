<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" indent="yes" omit-xml-declaration="yes" />
	
	<xsl:param name="count"/>

	<xsl:template match="/">
		<regels>
			<xsl:for-each select="*/*/row">
				<regel>
					<regelNaam><xsl:value-of select="field[@name='REGELING_NAME']"/></regelNaam>
					<startDatum><xsl:value-of select="field[@name='START_DATUM']"/></startDatum>
					<eindDatum><xsl:value-of select="field[@name='EIND_DATUM']"/></eindDatum>
					<startLeeftijd><xsl:value-of select="field[@name='START_LEEFTIJD']"/></startLeeftijd>
					<eindLeeftijd><xsl:value-of select="field[@name='EIND_LEEFTIJD']"/></eindLeeftijd>
					<plaats><xsl:value-of select="field[@name='PLAATS']"/></plaats>
					<inkomenTot><xsl:value-of select="field[@name='INKOMEN_TOT']"/></inkomenTot>
					<woonkostenTot><xsl:value-of select="field[@name='WOONKOSTEN_TOT']"/></woonkostenTot>
					<vermogenTot><xsl:value-of select="field[@name='VERMOGEN_TOT']"/></vermogenTot>
					<regelExecutie><xsl:value-of select="field[@name='REGELING_EXECUTIE']"/></regelExecutie>
				</regel>
			</xsl:for-each>
		</regels>
	</xsl:template>
</xsl:stylesheet>