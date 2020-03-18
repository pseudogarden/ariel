# ariel
:two_hearts: graphql backend project

## Overview
This project focuses on the implementation of [graphql](https://graphql.org/) on a backend express-mnode server. This project should act as a guide to help others fully implement graphql for server technology.

## Project
The application will be a backend book shelf. The user of the shelf can get a book by:
```javascript
  // book
  book {
    title
    author {
      name
      birth_date
    }
    publish_date
    publisher {
      name
      address
    }
    number_of_pages
    description
  }

  // author
  author {
    name
    birth_date
    books {
      title
      publish_date
      publisher
      description
      number_of_pages
    }
  }

```
## :wrench: Installation
Clone repo and navigate to project
```
git clone https://github.com/pseudogarden/ariel.git && cd ariel
```
Install latest version of node
```
nvm install
```
Install dependencies
```
npm i
```
Run development server
```
npm run start:dev
```

## Queries
The client side should be able to
- get books by title / author / price
- add book to shelf
- edit book in shelf
- remove a book from shelf
- remove all books by an author from a shelf
- get all book authors from a shelf
