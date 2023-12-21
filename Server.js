import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import {User} from '../REST_API_Checkpoint/models/User.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, 'config', '.env');
dotenv.config({ path: envPath });


const mongo_DBURL = process.env.mongo_DBURL;

const PORT=process.env.PORT;
//use express
const app = express();
app.use(express.json());


mongoose
    .connect(mongo_DBURL)
    .then(() => {
        console.log('connection to DB succefully');
        //Create server
      app.listen(PORT, () => {
          console.log(`your appliction run on 127.0.0.1:${PORT}`);
      });
    })
    .catch((err) => {
        console.log(err)
    });
    //   GET :  RETURN ALL USERS 
    app.get('/', async (req, res) => {
        try {
            const users = await User.find({});
    
            return res.status(200).json({
                count: users.length,
                data: users
            });
    
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
    
        }
    });
    // POST :  ADD A NEW USER TO THE DATABASE 
    app.post('/add', async (req, res) => {
        try {
            if (
                !req.body.name ||
                !req.body.lastName ||
                !req.body.age
            ) {
                return res.status(400).send({
                    message: 'Send all required fields: name, lastName, age'
                });
            }
            const newUser = {
                name: req.body.name,
                lastName: req.body.lastName,
                age: req.body.age,
            };
            const user = await User.create(newUser);
    
            return res.status(200).send(user);
    
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
        }
    });
    //PUT : EDIT A USER BY ID 
    app.put('/:id', async (req, res) => {

        try {
            if (
                !req.body.name ||
                !req.body.lastName ||
                !req.body.age
            ) {
                return res.status(400).send({
                    message: 'Send all required fields: name, lastName, age'
                });
            }
            const id = req.params.id;
            const result = await User.findByIdAndUpdate(id, req.body);
    
            if(!result){
                return res.status(404).json({message:'user not found'})
            }
    
            return res.status(200).send({message:'User update succefully'});
    
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
    
        }
    
    });
    // DELETE : REMOVE A USER BY ID 
    app.delete('/:id', async (req, res) => {

        try {
            
            const id = req.params.id;
            const result = await User.findByIdAndDelete(id);
    
            if(!result){
                return res.status(404).json({message:'User not found'})
            }
    
            return res.status(200).send({message:'user deleted succefully'});
    
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
    
        }
    
    });