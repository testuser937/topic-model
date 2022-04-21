using System;
using System.Net;
using System.Threading.Tasks;

namespace Tm.Sandbox
{
    public class Program
    {
        static async Task Main(string[] args)
        {
            var host = "185.209.230.179";
            var port = 447;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://google.ru");
            WebProxy myproxy = new WebProxy(host, port);

            myproxy.BypassProxyOnLocal = false;
            request.Proxy = myproxy;
            request.Method = "GET";
            request.Timeout = 100000;
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Console.WriteLine(response.StatusCode);
        }
    }
}
