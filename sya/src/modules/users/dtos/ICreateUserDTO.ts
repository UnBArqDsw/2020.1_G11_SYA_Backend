export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  business_area: string;
  business_name: string;
  cpf: string;
  initial_hour: Date;
  finish_hour: Date;
  operating_day: string;
}
