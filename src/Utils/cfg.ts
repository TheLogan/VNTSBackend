export const dbConf = () => {
  let connString = process.env.DATABASE_URL;

  connString = connString?.replace('postgres://', '');
  "rhdnlfujihbwsp:9bf2129f12e929f38545621d5618ae549548b6cbb46d24d8c7121ba21d99a3ae@ec2-52-200-16-99.compute-1.amazonaws.com:5432/d6uichr6lna352"
  let [username] = connString?.split(':', 1) || [];
  connString = connString?.replace(username + ':', '');

  "9bf2129f12e929f38545621d5618ae549548b6cbb46d24d8c7121ba21d99a3ae@ec2-52-200-16-99.compute-1.amazonaws.com:5432/d6uichr6lna352"
  let [password] = connString?.split('@', 1) || [];
  connString = connString?.replace(password + '@', '');
  
  "ec2-52-200-16-99.compute-1.amazonaws.com:5432/d6uichr6lna352"
  let [host] = connString?.split(':', 1) || [];
  connString = connString?.replace(host + ':', '');

  "5432/d6uichr6lna352"
  let [port] = connString?.split('/', 1) || [];
  connString = connString?.replace(port, '');

  "d6uichr6lna352"
  let database = connString?.replace('/', '');


  let cfg = {
    host,
    port: Number(port),
    username,
    password,
    database,
  }

  return cfg;
}