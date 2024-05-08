import express, { request, response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDbURL } from "./config.js";

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDbURL);
    console.log("Database Connected");
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });
}

const UserSchema = new mongoose.Schema({
    name: String,
    price: String
})

const UserModel = mongoose.model("books", UserSchema)

const app = express();
app.use(cors());
app.use(express.json())

app.post("/saveBooks", async (request, response) => {
    let book = new UserModel();
    book.name = request.body.name;
    book.price = request.body.price;
    const doc = await book.save();
    response.json({ "responseMessage": "Data Inseted Successfully", "data": doc });    
})

app.get("/getBooks", (request, response) => {
    UserModel.find({}).then((books) => {
        response.json({ "responseMessage": "Data fetched successfully", "data": books })
    })
        .catch((error) => {
            console.log("Data Fetching Failed : ", error);
        })
})

app.get("/getBookById/:id", (request, response) => {
    const { id } = request.params;
    UserModel.findById(id).then((books) => {
        if (!books) {
            response.status(404).json({ "responseMessage": "Data not found" });
        } else {
            response.json({ "responseMessage": "Data fetched by id successfully", "data": books });
        }
    })
        .catch((error) => {
            console.log("Data Fetching by id Failed : ", error);
        })
})

app.put("/updateBookById/:id", (request, response) => {
    const { id } = request.params;
    UserModel.findByIdAndUpdate(id, request.body).then((updateBook) => {
        if (!updateBook) {
            response.json({ "responseMessage": "Data not found" })
        }
        else {
            UserModel.findById(id).then((books) => {
                response.json({ "responseMessage": "Data fetched by id successfully", "data": books })
            })
        }
    })
        .catch((error) => {
            console.log("Data Fetching by id Failed : ", error);
        })
})

app.delete("/deleteBookById/:id", (request, response) => {
    const { id } = request.params;
    UserModel.findByIdAndDelete(id).then((deletedBook) => {
        if (!deletedBook) {
            response.status(404).json({ "responseMessage": "Data not found" });
        } else {
            response.json({ "responseMessage": "Data deleted successfully" });
        }
    })
})

app.get("/", (request, response) => {
    return response.status(200).send("Welcome to MERN Stack");
})