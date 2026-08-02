import { curricula } from "../src/lib/curriculum";

await Bun.write("/tmp/curricula.json", JSON.stringify(curricula, null, 2));
console.log("exported", curricula.length, "curricula");
