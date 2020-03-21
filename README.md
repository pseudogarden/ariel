# ariel
:two_hearts: graphql backend project

## Overview
This project focuses on the implementation of [graphql](https://graphql.org/) on a backend express-mnode server. This project should act as a guide to help others fully implement graphql for server technology.

## Project
The application will be a backend book shelf. The user of the shelf can get a book by:
```javascript
  book {
    title
    author {
      name
      birth_date
    }
    publish_date
    description
  }

  author {
    name
    birth_date
    books {
      title
      publish_date
      description
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
- user signup/login
- get books by user
- add book to user shelf
- edit book in user shelf
- remove a book from user shelf
- remove all books by an author from user shelf

## Queries
@ localhost:3000/graphql
### Signup
request
```javascript
mutation {
  signup(username: "fin", email: "fin@test.com", password: "password") {
    id
    username
    email
  }
}
```
response
```json
{
  "data": {
    "signup": {
      "id": 12,
      "username": "dan",
      "email": "dan@test.com"
    }
  }
}
```

### Login
request
```javascript
mutation {
    login(email: "dan@test.com", password: "password") {
        user {
            id
            email
            username
        }
    }
}
```
response
```json
{
    "data": {
        "login": {
            "user": {
                "id": 12,
                "email": "dan@test.com",
                "username": "dan"
            }
        }
    }
}
```

### Add Book
request
```javascript
mutation {
    addBook(
        title: "For Whom The Bell Tolls",
        author: "Ernest Hemmingway",
        description: "A Novel about war in sapin",
        publishDate: "1940-10-21"
    ) {
        id
        title
        author
        description
        user {
            id
            username
        }
    }
}
```
response
```json
{
    "data": {
        "addBook": {
            "id": 7,
            "title": "For Whom The Bell Tolls",
            "author": "Ernest Hemmingway",
            "description": "A Novel about war in sapin",
            "user": {
                "id": 12,
                "username": "dan"
            }
        }
    }
}
```

### Current User
this simply feeds you the current logged in user

request
```javascript
{
    currentUser {
        id
        username
        email
    }
}
```
response
```json
{
    "data": {
        "currentUser": {
            "id": 12,
            "username": "dan",
            "email": "dan@test.com"
        }
    }
}
```

### Get Books
books of logged in user

request
```javascript
{
    getBooks {
        id
        title
        author
        description
        user {
            id
            username
        }
    }
}
```
response
```json
{
    "data": {
        "getBooks": [
            {
                "id": 7,
                "title": "For Whom The Bell Tolls",
                "author": "Ernest Hemmingway",
                "description": "A Novel about war in sapin",
                "user": {
                    "id": 12,
                    "username": "dan"
                }
            }
        ]
    }
}
```
books of any user via username

request
```javascript
{
    getBooks(username: "john") {
        id
        title
        author
        description
        user {
            id
            username
        }
    }
}
```
response
```json
{
    "data": {
        "getBooks": [
            {
                "id": 1,
                "title": "On the Origin of Species",
                "author": "Charles Darwin",
                "description": "Textbook about evolution",
                "user": {
                    "id": 11,
                    "username": "john"
                }
            }
        ]
    }
}
```

