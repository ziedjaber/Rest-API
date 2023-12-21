import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
    },
   
   
);

export const User=mongoose.model('User',userSchema);