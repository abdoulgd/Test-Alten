# Back-end

Développer un back-end permettant la gestion de produits définis plus bas. Vous pouvez utiliser la technologie de votre choix parmis la list suivante :

- nodejs/express
- Java/Spring Boot
- C#/.net Core
- Python/Flask

Le back-end doit gérer les API REST suivantes : 

| Resource           | POST                  | GET                            | PATCH                                    | PUT | DELETE           |
| ------------------ | --------------------- | ------------------------------ | ---------------------------------------- | --- | ---------------- |
| **/products**      | Create a new products | Retrieve all products          | X                                        | X   |     X            |
| **/products/1**    | X                     | Retrieve details for product 1 | Update details of product 1 if it exists | X   | Remove product 1 |

Un produit a les caractéristiques suivantes : 

``` typescript
class Product {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  inventoryStatus: string;
  category: string;
  image?: string;
  rating?: number;
}
```

Le back-end créé doit pouvoir gérer les produits dans une base de données SQL/NoSQL ou dans un fichier json.

Une liste de produits est disponible dans ce fichier : `front/assets/products.json`

Un front-end en Angular est disponible et permet d'utiliser l'API via cette adresse : `http://localhost:3000`

vous pouvez lancer le front-end angular avec la commande 'ng serve'

# Bonus

Vous pouvez ajouter des tests Postman ou Swagger pour valider votre API

# Travail réalisé

- Tous les fichiers JS sont dans `src/`.

- Le .env pour la déclaration des variable et la sécurité de notre     application se trouve dans la racine du back.

- Le port utilisé est celui de `5000` car `3000` été déjà utilisé.

- Les reoutes utilisées
  - GET `http://localhost:5000/api/products`
  - GET `http://localhost:5000/api/products/{id}`
  - POST `http://localhost:5000/api/products`
  - PUT `http://localhost:5000/api/products/{id}`
  - DELETE `http://localhost:5000/api/products/{id}`


# Choix du Backend

- Le choix du backend utilisé est le nodejs/express avec le modèle d'architecture
MVC.

- Le choix de la base de donnée pour gérer les produit est une BD NoSQL donc mongoDB qui stockera les données du produit à fin de pouvoir faire les requêtes(GET, POST, PUT, DELETE).

- l'extension de VS Code Rest Client a été utlisée pour tester les requêtes(GET, POST, PUT, DELETE) il se trouve dans `src/requests/product.http`.

# SWAGGER

- Les tests Swagger a été utilisés pour la documentation et les tests de l'API REST, il se trouve sur la route `http://localhost:5000/api-docs` qui explique pour chaque route.

# Pour compiler le Backend

Dans la racine du back
- `npm run dev` ou
- `npm start`