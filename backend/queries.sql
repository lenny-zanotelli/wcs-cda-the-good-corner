
  -- DROP TABLE IF EXISTS ad;
  -- DROP TABLE IF EXISTS category;

  -- CREATE TABLE IF NOT EXISTS "ad"
  -- (
  --   id INTEGER PRIMARY KEY AUTOINCREMENT,
  --   title TEXT NOT NULL,
  --   description TEXT,
  --   owner TEXT NOT NULL,
  --   price INTEGER,
  --   picture TEXT,
  --   location TEXT,
  --   category_id INTEGER NOT NULL,
  --   FOREIGN KEY(category_id) REFERENCES category(id),
  --   createdAt TEXT
  -- );

  -- CREATE TABLE IF NOT EXISTS "category" 
  -- (
  --   id INTEGER PRIMARY KEY AUTOINCREMENT,
  --   name TEXT NOT NULL
  -- );
  --INSERT INTO "category" ("id", "name") VALUES
-- (1, 'bike'),
--   (2, 'boat'),
--   (3, 'phone');

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

--   SELECT ad.id, ad.title, ad.owner, ad.location, category.name AS category
--   FROM ad
--   INNER JOIN category
--   ON ad.category_id = category.id;

BEGIN;

INSERT INTO "ad" ("title", "description", "owner", "price", "picture", "location", "categoryId") VALUES
  ('Sell bike', 'My bike is blue', 'Tom', 20, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Bordeaux', 2),
  ('Sell boat', 'My boat is red', 'Marge', 1000, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 5),
  ('Sell video games', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'Jerry', 50, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Lyon', 14),
  ('Sell bike', 'Donec pretium vulputate sapien nec sagittis', 'Laura', 25, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Bordeaux', 5),
  ('Sell bike', 'Venenatis urna cursus eget nunc', 'Yussuf', 30, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 7),
  ('Sell bike', 'Viverra tellus in hac habitasse platea.', 'Karim', 40, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 14),
  ('Sell bike', 'Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin.', 'Sylvain', 1000, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 2),
  ('Sell bike', 'Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin.', 'Tom', 5, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Lyon', 6),
  ('Sell bike', 'My bike is blue', 'Marjorie', 12, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Lyon', 6),
  ('Sell bike', 'My bike is violet', 'Florent', 12, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Lyon', 6),
  ('Sell bike', 'My bike is blue', 'Adrien', 11111, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Lyon', 3),
  ('Sell bike', 'My bike is blue', 'Tom', 5000, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Bordeaux', 5),
  ('Sell bike', 'My bike is blue', 'Lenny', 500, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 5),
  ('Sell bike', 'My bike is blue', 'Tom', 320, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 2),
  ('Sell bike', 'My bike is blue', 'Serge', 1312, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Bordeaux', 2),
  ('Sell bike', 'My bike is blue', 'Tom', 322, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 2),
  ('Sell bike', 'Venenatis urna cursus eget nunc', 'Lea', 450, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Bordeaux', 2),
  ('Sell bike', 'Id volutpat lacus laoreet non curabitur gravida arcu ac.', 'Sarah', 50, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Paris', 2),
  ('Sell bike', 'Nunc sed velit dignissim sodales ut', 'Marine', 50, 'https://unsplash.com/fr/photos/tG36rvCeqng', 'Bordeaux', 2);

COMMIT;







