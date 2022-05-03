const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

//Hnadling uncaught exception

process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("shutting down the srver duee to uncaught exception");
    process.exit(1);
})

//config

dotenv.config({path:"backend/config/config.env"});

//connecting to database
connectDatabase()





app.listen(process.env.PORT,()=>{

    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

//Unhandled promise rejection

process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("shutting down the srver duee to unhandeled promise rejection");

    ServiceWorkerRegistration.close(()=>{
        process.exit(1);
    });
});