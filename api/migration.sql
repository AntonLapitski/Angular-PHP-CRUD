CREATE TABLE todos
(
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  completed  BOOLEAN not null default 0
);

INSERT INTO todos (
  title
)
  VALUES
    (
      'Do job one'
    ),
    (
      'Do job two'
    ),
    (
      'Do job three'
    ),
    (
      'Do job four'
    ),
    (
      'Do job five'
    );
