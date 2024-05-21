// gas station schema

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Interface
export interface IStation extends Document {
    name: String,
    address: String,
    city: String,
    state: String,
    Gas_Price: Number,
    lat: Number,
    lng: Number,
    status: Boolean,
    created_by: String
}
// schema define
const gasStationSchema = new Schema<IStation>({
    name: String,
    address: String,
    city: String,
    state: String,
    Gas_Price: Number,
    lat: Number,
    lng: Number,
    status: Boolean,
    // created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    created_by: String
    // updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
});

const GasStation = mongoose.model('GasStation', gasStationSchema);

export default GasStation;