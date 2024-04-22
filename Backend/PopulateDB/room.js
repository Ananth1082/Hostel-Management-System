let roomList = [];
const roomTypes = ["Single-Non-Ac", "Double-Non-Ac", "Single-AC", "Double-AC"];
for (let i = 1; i <= 22; i++) {
  for (let j = 1; j <= 4; j++) {
    roomList.push({
      id: j * 100 + i,
      capacity: Math.floor(Math.random() * 2) + 1,
      type: roomTypes[Math.floor(Math.random() * 4)],
      block: 1,
    });
  }
}
exports.roomList = roomList;
