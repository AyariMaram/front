
export class Notification{

    id!:number
    sender_id!:number
    recipient_id!:number
    subject!:String
    content!:String
    sent_at!:Date
    clicked: boolean = false;
    lu !: number;
    }