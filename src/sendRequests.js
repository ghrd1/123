const axios = require('axios');

async function addTasks() {
  const tasks = [
    axios.post('http://localhost:3000/tasks/add', { name: 'Regular Task 1' }),
    axios.post('http://localhost:3000/tasks/add', { name: 'Regular Task 2' }),

    axios.post('http://localhost:3000/tasks/add-math', { num1: 5, num2: 10 }),
    axios.post('http://localhost:3000/tasks/add-math', { num1: 20, num2: 30 }),

    axios.post('http://localhost:3000/tasks/add-delay', { delay: 2000 }),
    axios.post('http://localhost:3000/tasks/add-delay', { delay: 3000 }),
  ];

  try {
    await Promise.all(tasks);
    console.log('All tasks sent!');
  } catch (error) {
    console.error('Error sending tasks:', error);
  }
}

addTasks();
