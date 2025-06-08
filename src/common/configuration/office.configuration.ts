import { registerAs } from "@nestjs/config";

export default registerAs("office", () => ({
  uri: process.env.OFFICE_URI,
}));
