import Dexie, { type EntityTable } from "dexie";

interface User {
  id?: number;
  name: string;
  email: string;
  request: string;
  imageUrl: string;
  quantity: number;
  ticketType: string;
  imageWidth: number;
  imageHeight: number;
  event: string;
  dateBooked: string;
}
const db = new Dexie("userTicketInfo") as Dexie & {
  user: EntityTable<
    User,
    "id" // primary key "id" (for the typings only)
  >;
};
db.version(5).stores({
  user: "++id, name, email, request, imageUrl, quantity, ticketType, imageWidth, imageHeight, event, dateBooked",
});
db.open();
interface AvailableTickets {
  id: number;
  name: string;
  free: number;
  vip: number;
  vvip: number;
}

const db2 = new Dexie("availabletickets") as Dexie & {
  tickets: EntityTable<AvailableTickets, "id">;
};
db2.version(5).stores({
  tickets: "id, name, free, vip, vvip",
});
db2.on("populate", () => {
  db2.tickets.bulkAdd([
    { id: 1, name: "Techember", free: 100, vip: 100, vvip: 100 },
    { id: 2, name: "ValentineSplash", free: 100, vip: 100, vvip: 100 },
  ]);
});
db2.open();
export { db, db2 };
