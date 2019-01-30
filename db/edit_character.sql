UPDATE chars
SET name = $2, species = $3
WHERE id = $1;
SELECT * FROM chars
ORDER BY id ASC;