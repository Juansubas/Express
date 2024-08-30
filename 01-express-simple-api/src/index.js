import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
       return JSON.parse(data);
    } catch(error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}

const port = 3000;

app.get('/', (req, res) => {
    res.send("Welcome to my first Api with Node.js")
})

app.get('/books', (req, res) => {
    const data = readData();
    res.json(data)
});

app.get('/books/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const book = data.Books.find((book) => book.id === id);
    res.json(book);
});

app.post('/books', (req, res) => {
    const data = readData();
    const body = req.body;
    const newBook = {
        id: data.Books.length + 1,
        ...body
    };
    data.Books.push(newBook);
    writeData(data);
    res.json(newBook);
});

app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const body = req.body;
    const data = readData();
    const bookIndex = data.Books.findIndex((book) => book.id === id)
    data.Books[bookIndex] = {
        ...data.Books[bookIndex],
        ...body
    };
    writeData(data);
    res.json({ message: 'Book Updated Succesfully'});
});

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readData();
    const bookIndex = data.Books.findIndex((book) => book.id === id);
    data.Books.splice((bookIndex), 1);
    writeData(data);
    res.json({ message: 'Book Deleted Succesfully'});
});

app.listen(port, () => {
    console.log('Server listening on port 3000')
});