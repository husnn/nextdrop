import CreateBotRequest from './CreateBotRequest';

export default interface ICreateBot {
  execute(props: CreateBotRequest): Promise<void>;
}