import { SocksProxyAgent } from "socks-proxy-agent";

const socks5Config = {
  host: process.env.SOCKS_HOST,
  port: process.env.SOCKS_PORT,
  username: process.env.SOCKS_USER,
  password: process.env.SOCKS_PASSWORD,
};

export const agent = process.env.SOCKS_HOST
  ? new SocksProxyAgent(socks5Config)
  : null;
