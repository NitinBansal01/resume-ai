require("dotenv").config() //this is used to load environment variables from a .env file into process.env. It allows us to keep sensitive information like database credentials, API keys, etc. in a separate file and not hardcode them in our codebase. By using this line of code, we can access the environment variables defined in the .env file using process.env.VARIABLE_NAME in our application.

const app = require("./src/app") // we need to import the app variable from the app.js file so that we can use it to start our server and listen for incoming requests.
// the difference between . and .. is that . refers to the current directory while .. refers to the parent directory. In this case, since our app.js file is located in the src folder which is a subfolder of the current directory, we need to use ./src/app to import it correctly. If we were to use ../src/app, it would look for the app.js file in the parent directory which does not exist and would result in an error.
const connectToDB = require("./src/config/database")// we need to import the connectToDB function from the database.js file 

connectToDB() // this is called here because we want to establish a connection to the database before starting the server and listening for incoming requests. If we were to call it after starting the server, there is a chance that the server would start accepting requests before the database connection is established, which could lead to errors and unexpected behavior in our application.


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}) // this line of code is used to start the server and listen for incoming requests on port 3000. The first argument is the port number and the second argument is a callback function that will be executed once the server is successfully started. In this case, we are simply logging a message to the console to indicate that the server is running.