# Spacele
### Wordle for Astronomy

This is an app like Wordle, but for guessing deep sky objects based on an image.

A new deep sky object is available each day, and users have 6 attempts to guess it. Objects are randomly selected from a list of several hundred galaxies and nebulae.
<br/>
Objects are selected either from the Messier or NGC catalogue.

## Contributing
If you want more features or notice a bug on the website, please open an issue.

## Setup
This app was built with React JS and Typescript. 
Install and start to run.

Server:
```sh
npm i
npm run build
npx tsc server.ts
npm start
```

Testing frontend:
```sh
npm run dev
```

Required environment variables (.env):
```sh
DB_URL=<url of mongodb database>
URL="http://localhost:3001"
```