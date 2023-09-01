const RoomDto = require('../dtos/room-dto');
const roomService = require('../services/room-service');
const Room = require('../models/room-model')
const User = require('../models/user-model'
)

class RoomsController {
    async create(req, res) {
        // room
        const { topic, roomType ,ownerId,  date, time,speakersAllowed} = req.body;

        if (!topic || !roomType ||!date ||!time) {
            return res
                .status(400)
                .json({ message: 'All fields are required!' });
        }
        console.log(date,time)

        const room = await roomService.create({
            topic,
            roomType,
            ownerId,//'64ae8e584ec706c8581d886b',//req.user._id
            date,
            time,
            speakersAllowed,
        });

        return res.json(new RoomDto(room));
    }

    async index(req, res) {
        const rooms = await roomService.getAllRooms(['open']);
        const allRooms = rooms.map((room) => new RoomDto(room));
        return res.json(allRooms);
    }

    async show(req, res) {
        const room = await roomService.getRoom(req.params.roomId);

        return res.json(room);
    }

    async sheduleMeeting(req,res){
        try{
      const {roomid,userid}=req.body;
      const room= await Room.findById(roomid)
      if(!room){
        return res.status(401).send('no such room exist')
      }
      const user = await User.findById(userid)
      if(!user){
        return  res.status(402).send('no such user exist')
      }
      const host = await User.findById(room.ownerId)


      const d = new Date();
      let cdate = d.getDate();
      let  cmonth= d.getMonth()+1
      let cyear =d.getFullYear()
    

const hours = d.getHours(); // Get the hours (in 24-hour format)
const minutes = d.getMinutes(); // Get the minutes

// Format the time as HH:MM
const currentime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

      console.log('roomdate',room.date)
      
     const[rdate,rmonth,ryear]=room.date.split('/')
     function convertAMPMto24HR(timeAMPM) {
      const [time, period] = timeAMPM.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
    
      let hours24 = hours;
      if (period.toLowerCase() === 'pm' && hours !== 12) {
        hours24 += 12;
      } else if (period.toLowerCase() === 'am' && hours === 12) {
        hours24 = 0;
      }
    
      return `${hours24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
 
    const roomTime = convertAMPMto24HR(room.time)
  
     console.log(cdate,cmonth,cyear)//coing same
     console.log(rdate,rmonth,ryear)//comingsame
   
    
           
      if(rdate==cdate && rmonth==cmonth && ryear==cyear ){
         
        const [targetHours, targetMinutes] = roomTime.split(':').map(Number);
        const [currentHours, currentMinutes] = currentime.split(':').map(Number);

        if (currentHours < targetHours) {
          room.speakers=[]
          return res.status(401).json({message:"Meeting not started yet.."}) // Target time has not been reached yet
        } else if (currentHours === targetHours && currentMinutes < targetMinutes) {
          room.speakers=[]
          return res.status(401).json({message:"Meeting not started yet.."})// Target time has not been reached yet
        }
        //time has reached
        console.log(room.speakers.length)
        console.log(room.speakersAllowed)
         
      if(room.speakers.length < room.speakersAllowed){

          const hostPresent= room.speakers.map((speaker)=>  speaker === host)
          if(hostPresent.length==0){
            room.speakers.push(host)
            await room.save()
          }
         const already= room.speakers.map((speaker)=>  speaker === user)
          if(already.length>1){
            return res.json({msg:"user already in meeting speakers"})
          }
          
          room.speakers.push(user)
          await room.save()
          // console.log(room.speakers);
          return res.status(200).json({message:"user added in speakers",user})//reached
      }
     else{
      res.status(403).send('no more speakers allowed')
     }
  
      }
        
      else{
      room.speakers=[]
        return res.status(404).json({message:"Meeting not started yet..today is not meeting day"})}
    }catch(error){

        console.log(error)
        res.status(400).json({error})
    }}

}

module.exports = new RoomsController();