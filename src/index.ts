import bugsnag from '@frontapp/infra-bugsnag';
import { spawn } from 'child_process';
import readline from 'readline';

export class Spawner {
  async spawn(fail: boolean = false): Promise<string> {
    const sp = spawn('./spawned.sh', [`${fail ? '' : 'success'}`], {
      stdio: ['ignore', 'pipe', 'pipe'],
      cwd: '/Users/tim/Code/spawn-rejections'
    });

    // Stream the stdout
    const rl = readline.createInterface({input: sp.stdout});
    rl.on('line', (line: string) => {
      console.debug('Got a line event on stdout');
      console.log(line);
    });

    // Stream the stderr and create 'stderr' string
    const rle = readline.createInterface({input: sp.stderr});
    const errLines: string[] = [];
    let stderr = '';
    rle
      .on('line', (line: string) => {
        console.debug('Got a line event on stderr');
        console.error(line);
        errLines.push(line);
      })
      .on('close', () => {
        stderr = errLines.join('\n');
      });

      // Return a promise that will reject on error.
    return new Promise((resolve, reject) => {
      sp.on('error', (_err: Error) => {
        console.debug('rejecting on spawn _error_ event');
        reject(new Error(stderr));
      });
      sp.on('close', (code: number) => {
        if (code === 0) {
          resolve('spawn call succeeded');
        } else {
          console.debug('rejecting on spawn _close_ event');
          reject(new Error(stderr));
        }
      });
    });
  }
}

async function main() {
  const sp = new Spawner();
  await sp.spawn(true);
}

main().then(
  () => process.exit(0),
  error => {
    if (error) {
      bugsnag.notify(error);
      console.error(error);
    }
    process.exit(1);
  }
);
