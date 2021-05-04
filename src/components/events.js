const now = new Date()

export default [
  { //example id ยังไงก้ได้ไม่มีผลอะไร แต่กุยังไม่ได้ทำให้มันแบบ fetch มาอยู่ในหน้าตาแบบนี้
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  { //example
    id: 15,
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
]