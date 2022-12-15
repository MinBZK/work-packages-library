-- -------------------------------------------
-- View structuur voor TERM + SCHEMA
--
DROP VIEW IF EXISTS term_view_voorzieningen;
CREATE VIEW term_view_voorzieningen
AS 
SELECT 
  s.term_name as schema_name, 
  s.term_label as schema_label,
  s.term_order as schema_order,
  s.term_iri as schema_iri,  
  t.*
FROM cc_term as t 
INNER JOIN cc_term as s ON t.term_schema_uid = s.term_uid 
WHERE s.term_name = 'openbare_voorzieningen_registratie'
;