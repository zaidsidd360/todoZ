export type TodoType = {
    title: string;
    details?: string;
    id: number;
    completed: boolean;
  };
  
export  const defaultTodos: TodoType[] = [
    {
      title: "Star this project on GitHub.",
      details:
        "Check out the source code for this project and make sure you leave a star!",
      id: 1,
      completed: false,
    },
    {
      title: "Touch grass.",
      details: "GG WP",
      id: 2,
      completed: false,
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adip.",
      details: "consetetur adipiscing elit arc et dolor",
      id: 3,
      completed: false,
    },
    {
      title: "I am not in danger, Skyler! I AM the danger!",
      details:
        "A guy opens his door and gets shot and you think that of me? No. I am the one who knocks!",
      id: 4,
      completed: false,
    },
  ];