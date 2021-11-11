/*create third table 
subtract difference nineteen minus sixteen
*/

DROP TABLE IF EXISTS sixteen; 
DROP TABLE IF EXISTS nineteen; 
DROP TABLE IF EXISTS difference;

CREATE TABLE sixteen (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    state VARCHAR(512) NOT NULL,
    population BIGINT NOT NULL,
    year INTEGER NOT NULL,
    idapi VARCHAR(512) NOT NULL

);

CREATE TABLE nineteen (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    state VARCHAR(512) NOT NULL,
    population BIGINT NOT NULL,
    year INTEGER NOT NULL,
    idapi VARCHAR(512) NOT NULL
);

CREATE TABLE difference (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    state VARCHAR(512) NOT NULL,
    sixteen_pop BIGINT NOT NULL,
    nineteen_pop BIGINT NOT NULL,
    pop_difference BIGINT NOT NULL,
    pct_difference DECIMAL (10,2) NOT NULL,
    idapi VARCHAR(512) NOT NULL
);
