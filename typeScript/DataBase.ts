import { Server} from './DTO/servers';
import { v1 as uuidv1 } from 'uuid';
export class DbManger {
    constructor() {
    }
    readAll(): Server[] {
        return (JSON.parse(localStorage.getItem("servers")) as Server[]);
    }
    newServer():Server {
       let server= new Server();
       server.id=uuidv1();
       return server;
    }


}