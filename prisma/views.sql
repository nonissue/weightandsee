-- Get currentWeight for users
SELECT distinct on ("personId") "personId", "weighDate", "weight" FROM weighIns
ORDER BY "personId", "weighDate" DESC
LIMIT 5

-- Get currentWeight for a user
SELECT "personId", "weighDate", "weight" FROM weighIns WHERE "personId" = 1
ORDER BY "personId", "weighDate" DESC
LIMIT 1

-- Better? Gets name too
SELECT "personId", "weighDate", "weight", "name", People.id FROM weighIns, People WHERE "personId" = 15 AND people.id = 15
ORDER BY "personId", "weighDate" DESC
LIMIT 1

SELECT "personId", "weighDate", "weight", "name", People.id FROM weighIns, People WHERE "personId" = people.id
ORDER BY "personId", "weighDate" DESC
LIMIT 1

-- get all users current weights
SELECT distinct on ("personId") "weighDate", "weight", "name", People.id FROM weighIns, People WHERE "personId" = people.id
ORDER BY "personId", "weighDate" DESC