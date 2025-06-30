import mongoose,{Document,Schema} from "mongoose";

interface IEvent extends Document {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  isDraggable: boolean;
  clientName: string;
  price: number;
}
const EventSchema = new Schema(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    allDay: { type: Boolean, default: false },
    isDraggable: { type: Boolean, default: false },
    clientName: { type: String, required: true },
    price: { type: Number, required: true }
  }
);
const EventModel = mongoose.model<IEvent>('Event', EventSchema);
export { EventSchema, EventModel, IEvent };