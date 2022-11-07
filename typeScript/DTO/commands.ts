export enum commandServer {
    getOs = "egrep '^(VERSION|NAME)=' /etc/os-release"



}
export enum DbCommands {
    crateTable = ` create table if not exists Servers (name TEXT NOT NULL, address TEXT DEFAULT "0.0.0.0" NOT NULL, user TEXT DEFAULT "root" NOT NULL, password CHARACTER(20) , os CHARACTER(20) , qr CHARACTER(20)  , id INTEGER PRIMARY KEY)`
    , readAll = `SELECT * FROM Servers`

}