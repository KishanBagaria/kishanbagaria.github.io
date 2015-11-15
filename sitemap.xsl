<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
	<xsl:template match="/">
		<html>
			<head>
				<title>XML Sitemap</title>
				<style>
					table{font-size:14px;width:100%}
					th{text-align:left}
					tr:nth-child(even){background-color:whitesmoke}					
					a{color:black}
				</style>
			</head>
			<body>
				<xsl:apply-templates></xsl:apply-templates>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match="sitemap:urlset">
		<table cellpadding="5">
			<tr>
				<th>URL</th>
				<th>Last modified</th>
			</tr>
			<xsl:for-each select="./sitemap:url">
				<tr>
					<td>
						<xsl:variable name="itemURL">
							<xsl:value-of select="sitemap:loc"/>
						</xsl:variable>
						<a href="{$itemURL}">
							<xsl:value-of select="sitemap:loc"/>
						</a>
					</td>
					<td>
						<xsl:value-of select="sitemap:lastmod"/>
					</td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>
</xsl:stylesheet>