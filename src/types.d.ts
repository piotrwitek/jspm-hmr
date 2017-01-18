declare module 'http-proxy' {
  interface Proxy {
    web(req: any, res: any, options: any): void;
    on(ev: any, cb: (err: Error) => void): void;
  }
  export function createProxyServer(): Proxy;
}

declare module 'opener' {
  const main: (url: string, options?: { command?: string }) => void;
  export = main;
}

declare module 'chokidar-socket-emitter' {
  interface Options {
    app: any;
    port?: number;
    path?: string;
    quiet?: boolean;
    chokidar?: { usePolling: boolean };
  }

  const Main: (options: Options) => any;

  export = Main;
}

declare module 'connect-history-api-fallback';

