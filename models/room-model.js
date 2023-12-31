const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
        topic: { type: String, required: true },
        roomType: { type: String, required: true },
        ownerId: { type: Schema.Types.ObjectId, ref: 'User' },//meeting host
        speakers: {type: Array, required: false, },//room members,
        date:{type:String},
        time:{type:String},
        speakersAllowed:{type:Number}

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Room', roomSchema, 'rooms');