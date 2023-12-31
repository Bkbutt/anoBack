class RoomDto {
    id;
    topic;
    roomType;
    speakers;
    ownerId;
    date;
    time;
    speakersAllowed;
    createdAt;

    constructor(room) {
        this.id = room._id;
        this.topic = room.topic;
        this.roomType = room.roomType;
        this.ownerId = room.ownerId;
        this.speakers = room.speakers;
        this.createdAt = room.createdAt;
        this.date= room.date;
        this.time= room.time;
        this.speakersAllowed=room.speakersAllowed;
    }
}
module.exports = RoomDto;