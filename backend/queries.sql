BEGIN;
  DROP TABLE IF EXISTS ad;

  CREATE TABLE IF NOT EXISTS ad
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    owner TEXT NOT NULL,
    price INTEGER,
    picture TEXT,
    location TEXT,
    category TEXT,
    createdAt TEXT
  );

  INSERT INTO "ad" ("id", "title", "description", "owner", "price", "picture", "location", "category", "createdAt") VALUES
  (1, 'Sell bike', 'My bike is blue', 'Tom', 20, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Bordeaux', 'bike', '20/10/2019'),
  (2, 'Sell boat', 'My boat is red', 'Marge', 1000, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 'boat', '20/11/2020'),
  (3, 'Sell video games', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'Jerry', 50, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Lyon', 'video games', '20/10/2019'),
  (4, 'Sell bike', 'Donec pretium vulputate sapien nec sagittis', 'Laura', 25, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Bordeaux', 'bike', '14/01/2019'),
  (5, 'Sell bike', 'Venenatis urna cursus eget nunc', 'Yussuf', 30, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 'bike', '13/08/2019'),
  (6, 'Sell bike', 'Viverra tellus in hac habitasse platea.', 'Karim', 40, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 'bike', '12/07/2019'),
  (7, 'Sell bike', 'Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin.', 'Sylvain', 1000, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 'bike', '24/10/2019'),
  (8, 'Sell bike', 'Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin.', 'Tom', 5, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Lyon', 'bike', '10/03/2019'),
  (9, 'Sell bike', 'My bike is blue', 'Marjorie', 12, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Lyon', 'bike', '20/04/2019'),
  (10, 'Sell bike', 'My bike is violet', 'Florent', 12, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Lyon', 'bike', '11/10/2019'),
  (11, 'Sell bike', 'My bike is blue', 'Adrien', 11111, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Lyon', 'bike', '20/10/2019'),
  (12, 'Sell bike', 'My bike is blue', 'Tom', 5000, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Bordeaux', 'bike', '20/10/2019'),
  (13, 'Sell bike', 'My bike is blue', 'Lenny', 500, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 'bike', '20/10/2019'),
  (14, 'Sell bike', 'My bike is blue', 'Tom', 320, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 'bike', '20/10/2019'),
  (15, 'Sell bike', 'My bike is blue', 'Serge', 1312, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Bordeaux', 'bike', '20/10/2019'),
  (16, 'Sell bike', 'My bike is blue', 'Tom', 322, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 'bike', '20/10/2019'),
  (17, 'Sell bike', 'Venenatis urna cursus eget nunc', 'Lea', 450, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Bordeaux', 'bike', '20/10/2019'),
  (18, 'Sell bike', 'Id volutpat lacus laoreet non curabitur gravida arcu ac.', 'Sarah', 50, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 'bike', '20/10/2019'),
  (21, 'Sell bike', 'Nunc sed velit dignissim sodales ut', 'Marine', 50, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Bordeaux', 'bike', '20/10/2019'),
  (22, 'Sell bike', 'Id volutpat lacus laoreet non curabitur gravida arcu ac', 'Manon', 50, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Bordeaux', 'bike', '20/10/2019');

-- SELECT * FROM ad;

-- SELECT * FROM ad WHERE location = "Bordeaux";

-- DELETE FROM ad WHERE price > 40;

-- UPDATE ad SET price=0 WHERE createdAt='20/10/2019';

-- SELECT location, AVG(price)
-- FROM ad
-- WHERE location='Paris';

-- SELECT location, ROUND(AVG(price), 2) AS average_price
-- FROM ad
-- GROUP BY location;

COMMIT;



