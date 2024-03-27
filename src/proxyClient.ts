import { SocksProxyAgent } from "socks-proxy-agent";

const socks5Config = {
  host: process.env.SOCKS_HOST,
  port: process.env.SOCKS_PORT,
  username: process.env.SOCKS_USER,
  password: process.env.SOCKS_PASSWORD,
};

console.log(`socks5Config:`, socks5Config);

export const agent = new SocksProxyAgent(socks5Config);

export const useAgent = () => {
  return !!process.env.SOCKS_USER;
};
