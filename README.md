# Tagaz - Photo Carousel Module

> This module displays photos for a restaurant listing page on Tagaz!

## Related Projects

  - https://github.com/Tagaz/info-sidebar-service
  - https://github.com/Tagaz/tips-recommendations-service
  - https://github.com/Tagaz/similar-restaurants-service

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
1. [API](#API)

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
- Mongoose 5.10.2
- pg 8.3.3
- Popper.js 1.16.1

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### Generating Data

> Data will be generated for 10 million primary records and saved to a CSV file in server/database/__data/

From within the root directory of the repo, run this command to generate the data. This process should not take longer than 15 minutes.

```sh
npm run generate
```

Once complete, open the CSV file and add a newline to the top with the following text. This specifies the column names as they will be named within the PSQL table schema.

```sh
name, images
```

### Installing & Setting up PostgreSQL

> Data from the CSV file will be copied directly into PostgreSQL "Tagaz" database

1. From within the root directory of the repo, run these commands to set up PSQL with Homebrew:

```sh
brew doctor
brew update
brew install postgres
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
```

2. Create two new aliases to start and stop your postgres server. They could look something like this:

```sh
alias pg_start="launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"
alias pg_stop="launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"
```

3. Create database Tagaz and enter PSQL CLI:

```sh
pg_start
createdb 'tagaz'
psql tagaz
```

4. Run schema file to create table "restaurant" with the correct schema:

```sh
\i server/database/postgres/schema.sql;
```

5. Copy CSV data into restaurants table

```sh
COPY restaurants(id, name, images)
FROM <path to CSV file from your computer root directory>
DELIMITER ','
CSV HEADER;
```

- For troubleshooting, refer to this setup guide: https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3

- Or this guide on copying CSV data to PSQL: https://www.postgresqltutorial.com/import-csv-file-into-posgresql-table/

### Build Webpack Bundle (and watch files)
```sh
npm run build
```

### Start Server on Port 3001
```sh
npm run start
```

### Testing
```sh
npm run test
```

## API

> Use the following routes for CRUD requests to the server:

### GET

> Endpoint: /restaurant/:id

A GET request to /restaurant/:id will fetch an object containing the restaurant name and an array of URLs for all photos associated with that restaurant.

### POST

> Endpoint: /restaurant

A POST request to the above endpoint will create a new restaurant in the database with the supplied name. The following JSON format is required in the POST request's body in order for the restaurant to be successfully created:

```sh
{ "name":"New Restaurant Name", "images":"0000:0001:0002:0003:0004:0005" }
```

Upon success, the ID of the new restaurant will be returned in the server response in this format:

```sh
{ "newId": "New ID: 10000001" }
```

### PUT

> Endpoint: /api/update-restaurant/:id

A PUT request to the above endpoint will update an existing restaurant with the supplied ID.
The following JSON format is required in the PUT request's body in order for the restaurant to be successfully updated:

```sh
{"name":"Updated Restaurant"}
```

### DELETE

> Endpoint: /api/delete-restaurant/:id

A PUT request to the above endpoint will delete an existing restaurant with the supplied ID.
