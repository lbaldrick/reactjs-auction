This project was set up to help me learn reactjs and redux. I use the project as a sandbox to try out new things I want to learn or concepts I have read, not only when it comes to react but also other technologies. I am currently in process of learning docker and have decided to help me learn I will try to dockerise this app. After that I plan to add jest tests as they are badly needed when I refatcor code and I also plan to write a fully functioning middleware layer for this and will be using graphql instead of REST just so I can try out graphql as I find the specificaton and idea very interesting. 

To run app:

- webpack-dev-server --inline --hot - to have hot reload or perferrably run 'node server' and project will be served on
  localhost:3003 proxying through to webpack-dev-server

- node server/api/api.js - run mock server with mock endpoints servered on localhost:3000

- webpack - to bundle code to bundle.js


TODO:

- Dockerise app
- Add jest tests
- Upgrade to latest version of react
- Refactor code to be more performant

