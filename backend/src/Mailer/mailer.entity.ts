export class Mailer {
    constructor(
      public emailSender: string,
      public nameSender: string,
      public usernameSender: string,
      public addressSender: string,
      public emailReceiver: string,
      public nameReceiver: string,
      public serviceType: string,
      public serviceDescription: string,
      public servicePrice: number,
      public postContent: string,
    ) {}
}