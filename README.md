# Tagaz - Photo Carousel Module

> This module displays photos for a restaurant listing page on Tagaz!

## Related Projects

  - https://github.com/Tagaz/info-sidebar-service
  - https://github.com/Tagaz/tips-recommendations-service
  - https://github.com/Tagaz/similar-restaurants-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [API](#API)

## Usage

> Please see "Installing Dependencies" + "Development" sections

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- Express 4.17.1
- React 16.13.1
- ReactDOM 16.13.1
- Styled-Components 5.1.1
- Webpack 4.44.1
- Body-Parser 1.19.0
- Bootstrap 4.5.2
- Cors 2.8.5
- Faker 4.1.0
- jQuery 3.5.1
- MySQL 2.18.1
- Nodemon 2.0.4
- Path 0.12.7
- Prop-Types 15.7.2

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

- Initialize MySQL database + seed data
```sh
mysql.server start
mysql
source server/schema.sql
exit
npm run seed
```

- Build Webpack Bundle (and watch files)
```sh
npm run build
```

- Start Server on Port 3001
```sh
npm run start
```

- Testing
```sh
npm run test
```

## API

> Use the following routes for CRUD requests to the server:

### GET
```sh
/api/photos/:restaurantID
```
A GET request to the above endpoint will fetch an array of object containing the restaurant name and URLs for all photos associated with that restaurant.

### POST
```sh
/api/add-restaurant
```
A POST request to the above endpoint will create a new restaurant in the database with the supplied name.
The following JSON format is required in the POST request's body in order for the restaurant to be successfully created:

> {"name":"New Restaurant"}

### PUT
```sh
/api/update-restaurant/:id
```
A PUT request to the above endpoint will update an existing restaurant with the supplied ID.
The following JSON format is required in the PUT request's body in order for the restaurant to be successfully updated:

> {"name":"Updated Restaurant"}

### DELETE
```sh
/api/delete-restaurant/:id
```
A PUT request to the above endpoint will delete an existing restaurant with the supplied ID.
