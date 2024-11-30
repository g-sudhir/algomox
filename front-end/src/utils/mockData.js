export const mockEvents = [
  {
    id: 1,
    name: "Tech Conference 2024",
    image: "https://picsum.photos/200",
    startDate: "2024-06-15",
    registrations: [
      {
        id: 1,
        userId: 1,
        userName: "John Doe",
        userEmail: "john@example.com",
        registeredAt: "2024-03-10T10:00:00Z"
      },
      {
        id: 2,
        userId: 2,
        userName: "Jane Smith",
        userEmail: "jane@example.com",
        registeredAt: "2024-03-11T15:30:00Z"
      }
    ]
  },
  {
    id: 2,
    name: "Web Development Workshop",
    image: "https://picsum.photos/201",
    startDate: "2024-07-20",
    registrations: []
  },
  {
    id: 3,
    name: "AI Summit",
    image: "https://picsum.photos/202",
    startDate: "2024-08-05",
    registrations: [
      {
        id: 3,
        userId: 3,
        userName: "Bob Wilson",
        userEmail: "bob@example.com",
        registeredAt: "2024-03-12T09:15:00Z"
      }
    ]
  }
];

export const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "user"
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  }
];