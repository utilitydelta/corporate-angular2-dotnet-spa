using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace UtilityDelta.Backend.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var randomSeed = new Random(DateTime.UtcNow.Second);
            var iterations = randomSeed.Next(50);
            var data = new string[iterations];
            for (var i = 0; i < iterations; i++)
            {
                data[i] = randomSeed.Next(5000, 10000).ToString();
            }
            return data;
        }
    }
}