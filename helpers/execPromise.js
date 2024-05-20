import { exec } from 'child_process';

export function execPromise(command) {
    return new Promise((resolve) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Execution Error:', error);
          resolve({ error, stdout, stderr });  // Возвращаем результат вместо отклонения промиса
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }