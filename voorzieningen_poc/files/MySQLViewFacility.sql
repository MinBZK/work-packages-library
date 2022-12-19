--
-- View Voorzieningen: `facility_view`
--
DROP VIEW IF EXISTS facility_view; 
CREATE VIEW facility_view
AS
SELECT 
  g.g_name as g_name,
  p.p_name as p_name,
  the.the_name as the_name,  
  f.*
FROM facility as f 
LEFT JOIN co_group as g ON f.fac_g_intermediair_uid = g.g_uid 
LEFT JOIN co_person as p ON f.fac_p_contact_uid = p.p_uid 
LEFT JOIN co_theme as the ON f.fac_the_uid = the.the_uid
-- LEFT JOIN facility_rule as r ON f.fac_facr_uid = r.facr_uid