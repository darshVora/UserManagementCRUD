﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserManagementApi.Core.ViewModel
{
    public record LoginModel
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string EmailAddress { get; set; }
    }
}
