import { model, Schema } from "mongoose";
import { IAgent } from "./agent.interface";

const agentSchema = new Schema<IAgent>({
    agentNumber: {type: String, required: true},
    agentPassword: {type: String, required: true},
    amount: {type: String, required: true},
    userNumber: {type: String, required: true},
});

export const AgentModel = model("AgentModel", agentSchema);