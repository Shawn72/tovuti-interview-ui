﻿using System.Threading.Tasks;

namespace TovutiUI.EmailService
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
        Task SendEmailAsync(Message message);
    }
}
