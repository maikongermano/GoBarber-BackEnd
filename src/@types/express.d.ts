// sobrescrevendo uma tipagem dentro do Express (ovewride)
// adicionando uma informação nova dentro do Request
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
