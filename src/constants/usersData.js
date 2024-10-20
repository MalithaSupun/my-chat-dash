export const users = [
  {
    userId: 1,
    name: "zoyza",
    message: "Whats the status?",
    time: "Today, 9.52pm",
    notification: 0,
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "delivered",
    chatData: [
      { id: 1, sender: "Anil", message: "Whats the status?", time: "Today, 9.52pm", isSender: false },
      { id: 2, sender: "You", message: "Working on it.", time: "Today, 9.53pm", isSender: true },
      { id: 3, sender: "Anil", message: "ok", time: "Today, 9.55pm", isSender: false },
    ]
  },
  {
    userId: 2,
    name: "Chuuthiya",
    message: "Can we connect?",
    time: "Today, 12.11pm",
    notification: 1,
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    status: "read",
    chatData: [
      { id: 1, sender: "Chuuthiya", message: "Can we connect?", time: "Today, 12.11pm", isSender: false },
      { id: 2, sender: "You", message: "Sure! What time works for you?", time: "Today, 12.12pm", isSender: true },
    ]
  },
  {
    userId: 3,
    name: "Marie",
    message: "You have to report it...",
    time: "Today, 2.40pm",
    notification: 1,
    img: "https://randomuser.me/api/portraits/men/3.jpg",
    status: "unread",
    chatData: [
      { id: 1, sender: "Marie", message: "You have to report it...", time: "Today, 2.40pm", isSender: false },
      { id: 2, sender: "You", message: "I will submit it by EOD.", time: "Today, 2.41pm", isSender: true },
    ]
  },
  {
    userId: 4,
    name: "Bill Gates",
    message: "Will I be able to get the report...",
    time: "Yesterday, 12.31pm",
    notification: 15,
    img: "https://randomuser.me/api/portraits/men/4.jpg",
    status: "unread",
    chatData: [
      { id: 1, sender: "Bill Gates", message: "Will I be able to get the report...", time: "Yesterday, 12.31pm", isSender: false },
      { id: 2, sender: "You", message: "I'm working on it.", time: "Yesterday, 12.32pm", isSender: true },
    ]
  },
  {
    userId: 5,
    name: "Elon Musk",
    message: "Interested in buying Twitter...",
    time: "Yesterday, 9:45am",
    notification: 3,
    img: "https://randomuser.me/api/portraits/men/5.jpg",
    status: "read",
    chatData: [
      { id: 1, sender: "Elon Musk", message: "Interested in buying Twitter...", time: "Yesterday, 9:45am", isSender: false },
      { id: 2, sender: "You", message: "That would be a huge move!", time: "Yesterday, 9:46am", isSender: true },
    ]
  },
  {
    userId: 6,
    name: "Jeff Bezos",
    message: "Going to space next week!",
    time: "Yesterday, 10:12am",
    notification: 1,
    img: "https://randomuser.me/api/portraits/men/6.jpg",
    status: "unread",
    chatData: [
      { id: 1, sender: "Jeff Bezos", message: "Going to space next week!", time: "Yesterday, 10:12am", isSender: false },
      { id: 2, sender: "You", message: "That's awesome! Can't wait to hear about it.", time: "Yesterday, 10:13am", isSender: true },
    ]
  },
  {
    userId: 7,
    name: "Mark Zuckerberg",
    message: "Metaverse is the future...",
    time: "Yesterday, 11:03am",
    notification: 5,
    img: "https://randomuser.me/api/portraits/men/7.jpg",
    status: "read",
    chatData: [
      { id: 1, sender: "Mark Zuckerberg", message: "Metaverse is the future...", time: "Yesterday, 11:03am", isSender: false },
      { id: 2, sender: "You", message: "Excited to see where it goes!", time: "Yesterday, 11:04am", isSender: true },
    ]
  },
  {
    userId: 8,
    name: "Bill Gates",
    message: "Will I be able to get the report...",
    time: "Yesterday, 12:31pm",
    notification: 15,
    img: "https://randomuser.me/api/portraits/men/8.jpg",
    status: "unread",
    chatData: [
      { id: 1, sender: "Bill Gates", message: "Will I be able to get the report...", time: "Yesterday, 12:31pm", isSender: false },
      { id: 2, sender: "You", message: "I'm finalizing it today.", time: "Yesterday, 12:32pm", isSender: true },
    ]
  },
  {
    userId: 9,
    name: "Sundar Pichai",
    message: "Google's AI is getting smarter...",
    time: "Today, 8:00am",
    notification: 2,
    img: "https://randomuser.me/api/portraits/men/9.jpg",
    status: "unread",
    chatData: [
      { id: 1, sender: "Sundar Pichai", message: "Google's AI is getting smarter...", time: "Today, 8:00am", isSender: false },
      { id: 2, sender: "You", message: "Looking forward to the updates!", time: "Today, 8:01am", isSender: true },
    ]
  }
];

export const groups = [
  {
    groupId: 1,
    name: "Team Granders",
    message: "Yesss",
    time: "Today, 9:52pm",
    notification: 4,
    img: "https://picsum.photos/150/150?random=1",
    chatData: [
      { id: 1, sender: "Alice", message: "Yesss", time: "Today, 9:52pm", isSender: false },
      { id: 2, sender: "You", message: "Excited to work together!", time: "Today, 9:53pm", isSender: true },
    ]
  },
  {
    groupId: 2,
    name: "Analysts",
    message: "I dont think we can",
    time: "Yesterday, 12:31pm",
    notification: 0,
    img: "https://picsum.photos/150/150?random=2",
    chatData: [
      { id: 1, sender: "Bob", message: "I dont think we can", time: "Yesterday, 12:31pm", isSender: false },
      { id: 2, sender: "You", message: "We need to analyze the data first.", time: "Yesterday, 12:32pm", isSender: true },
    ]
  },
  {
    groupId: 3,
    name: "Team Swedens",
    message: "We are planning this friday",
    time: "Wednesday, 9:12am",
    notification: 0,
    img: "https://picsum.photos/150/150?random=3",
    chatData: [
      { id: 1, sender: "Charlie", message: "We are planning this Friday", time: "Wednesday, 9:12am", isSender: false },
      { id: 2, sender: "You", message: "What time are we meeting?", time: "Wednesday, 9:13am", isSender: true },
    ]
  },
  {
    groupId: 4,
    name: "Marketing Team",
    message: "Can we schedule a meeting?",
    time: "Today, 4:30pm",
    notification: 2,
    img: "https://picsum.photos/150/150?random=4",
    chatData: [
      { id: 1, sender: "Diana", message: "Can we schedule a meeting?", time: "Today, 4:30pm", isSender: false },
      { id: 2, sender: "You", message: "I'm available after 3 PM.", time: "Today, 4:31pm", isSender: true },
    ]
  },
  {
    groupId: 5,
    name: "Product Development",
    message: "New features coming soon!",
    time: "Yesterday, 8:45am",
    notification: 1,
    img: "https://picsum.photos/150/150?random=5",
    chatData: [
      { id: 1, sender: "Eve", message: "New features coming soon!", time: "Yesterday, 8:45am", isSender: false },
      { id: 2, sender: "You", message: "Can we get a demo?", time: "Yesterday, 8:46am", isSender: true },
    ]
  },
  {
    groupId: 6,
    name: "Team Launchers",
    message: "Project launch is confirmed",
    time: "Monday, 10:15am",
    notification: 0,
    img: "https://picsum.photos/150/150?random=6",
    chatData: [
      { id: 1, sender: "Alice", message: "Project launch is confirmed.", time: "Monday, 10:15am", isSender: false },
      { id: 2, sender: "Bob", message: "Great news!", time: "Monday, 10:16am", isSender: false },
      { id: 3, sender: "You", message: "Looking forward to it!", time: "Monday, 10:17am", isSender: true },
      { id: 4, sender: "Charlie", message: "What are the next steps?", time: "Monday, 10:18am", isSender: false },
      { id: 5, sender: "You", message: "We need to finalize the timeline.", time: "Monday, 10:19am", isSender: true },
    ]
  }
];
