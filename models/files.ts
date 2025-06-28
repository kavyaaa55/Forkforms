
import mongoose from "mongoose"

const ScriptSchema = new mongoose.Schema({
  slog: { type: String, required: true },
  script: { type: String, required: true },

})

export default mongoose.models.Files || mongoose.model("Files", ScriptSchema)

