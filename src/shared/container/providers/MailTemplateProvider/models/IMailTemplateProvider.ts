import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  // Método
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
