using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;
using System.Diagnostics;
using System.Windows.Forms;

namespace ExcelViewLauncher
{
    static class Program
    {
        private static HttpListener listener;
        private static string baseDirectory;
        private static int port = 54321;
        private static DateTime lastHeartbeat = DateTime.Now;
        private static DateTime startTime = DateTime.Now;
        private static Process browserProcess;
        private static Mutex singleInstanceMutex;

        [STAThread]
        static void Main(string[] args)
        {
            // Ensure single instance per machine
            bool createdNew;
            singleInstanceMutex = new Mutex(true, "ExcelViewPro_SingleInstance_Mutex", out createdNew);

            string currentDir = AppDomain.CurrentDomain.BaseDirectory;
            baseDirectory = Path.Combine(currentDir, "dist");

            if (!Directory.Exists(baseDirectory))
            {
                if (Directory.Exists(Path.Combine(currentDir, "..", "dist")))
                {
                    baseDirectory = Path.GetFullPath(Path.Combine(currentDir, "..", "dist"));
                }
                else
                {
                    MessageBox.Show(
                        "Không tìm thấy thư mục 'dist'. Vui lòng đảm bảo ứng dụng đã được build hoặc thư mục dist nằm cùng cấp với file ExcelView.exe.",
                        "ExcelView Pro - Lỗi",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Error
                    );
                    return;
                }
            }

            // Find an available port
            listener = new HttpListener();
            bool started = false;
            for (int p = 54321; p < 54400; p++)
            {
                try
                {
                    listener.Prefixes.Clear();
                    listener.Prefixes.Add("http://127.0.0.1:" + p + "/");
                    listener.Start();
                    port = p;
                    started = true;
                    break;
                }
                catch
                {
                    // Port in use, try next
                }
            }

            if (!started)
            {
                MessageBox.Show("Không thể khởi tạo cổng mạng cục bộ 127.0.0.1.", "ExcelView Pro - Lỗi", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            startTime = DateTime.Now;
            lastHeartbeat = DateTime.Now;

            // Start HTTP listener on a background thread
            Thread serverThread = new Thread(ListenLoop);
            serverThread.IsBackground = true;
            serverThread.Start();

            string appUrl = "http://127.0.0.1:" + port + "/";

            // Launch Browser in App Mode
            LaunchAppWindow(appUrl);

            // Heartbeat & Process Monitor Loop
            while (true)
            {
                Thread.Sleep(1000);

                // If browser process is still running with dedicated PID, keep alive
                if (browserProcess != null && !browserProcess.HasExited)
                {
                    continue;
                }

                // If browser process exited or was delegated, check heartbeat
                // Must give at least 15s grace period upon initial launch
                double totalRunTime = (DateTime.Now - startTime).TotalSeconds;
                double timeSinceHeartbeat = (DateTime.Now - lastHeartbeat).TotalSeconds;

                if (totalRunTime > 15)
                {
                    // If no heartbeat for more than 8 seconds, the window was closed
                    if (timeSinceHeartbeat > 8)
                    {
                        break;
                    }
                }
            }

            // Clean shutdown
            try
            {
                if (listener != null)
                {
                    listener.Stop();
                    listener.Close();
                }
            }
            catch { }
        }

        private static void LaunchAppWindow(string url)
        {
            string profileDir = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "ExcelViewPro",
                "Profile"
            );

            try
            {
                if (!Directory.Exists(profileDir))
                {
                    Directory.CreateDirectory(profileDir);
                }
            }
            catch { }

            // 1. Try Microsoft Edge (Installed on all Windows 10/11)
            string edgePath = @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe";
            if (!File.Exists(edgePath))
            {
                edgePath = @"C:\Program Files\Microsoft\Edge\Application\msedge.exe";
            }

            // 2. Try Google Chrome as fallback
            string chromePath = @"C:\Program Files\Google\Chrome\Application\chrome.exe";
            if (!File.Exists(chromePath))
            {
                chromePath = @"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe";
            }

            string targetBrowser = null;
            if (File.Exists(edgePath))
            {
                targetBrowser = edgePath;
            }
            else if (File.Exists(chromePath))
            {
                targetBrowser = chromePath;
            }

            if (targetBrowser != null)
            {
                try
                {
                    ProcessStartInfo psi = new ProcessStartInfo();
                    psi.FileName = targetBrowser;
                    // Passing --user-data-dir makes Chromium run as an independent, persistent process!
                    psi.Arguments = string.Format(
                        "--user-data-dir=\"{0}\" --app=\"{1}\" --window-size=1320,860 --app-id=ExcelViewPro",
                        profileDir,
                        url
                    );
                    psi.UseShellExecute = false;
                    browserProcess = Process.Start(psi);
                    return;
                }
                catch { }
            }

            // Fallback: Default Browser
            try
            {
                Process.Start(new ProcessStartInfo
                {
                    FileName = url,
                    UseShellExecute = true
                });
            }
            catch (Exception ex)
            {
                MessageBox.Show("Không thể mở trình duyệt: " + ex.Message, "Lỗi");
            }
        }

        private static void ListenLoop()
        {
            while (listener != null && listener.IsListening)
            {
                try
                {
                    HttpListenerContext context = listener.GetContext();
                    ThreadPool.QueueUserWorkItem((c) => HandleRequest((HttpListenerContext)c), context);
                }
                catch
                {
                    break;
                }
            }
        }

        private static void HandleRequest(HttpListenerContext context)
        {
            try
            {
                string rawUrl = context.Request.Url.AbsolutePath;

                // Handle heartbeat ping
                if (rawUrl == "/api/heartbeat")
                {
                    lastHeartbeat = DateTime.Now;
                    byte[] pong = Encoding.UTF8.GetBytes("{\"status\":\"ok\"}");
                    context.Response.ContentType = "application/json";
                    context.Response.ContentLength64 = pong.Length;
                    context.Response.StatusCode = 200;
                    context.Response.OutputStream.Write(pong, 0, pong.Length);
                    return;
                }

                if (string.IsNullOrEmpty(rawUrl) || rawUrl == "/")
                {
                    rawUrl = "/index.html";
                }

                rawUrl = rawUrl.TrimStart('/');
                rawUrl = Uri.UnescapeDataString(rawUrl);

                string filePath = Path.Combine(baseDirectory, rawUrl);

                if (!File.Exists(filePath))
                {
                    filePath = Path.Combine(baseDirectory, "index.html");
                }

                if (File.Exists(filePath))
                {
                    byte[] data = File.ReadAllBytes(filePath);
                    string ext = Path.GetExtension(filePath).ToLowerInvariant();
                    string contentType = GetMimeType(ext);

                    context.Response.ContentType = contentType;
                    context.Response.ContentLength64 = data.Length;
                    context.Response.StatusCode = 200;
                    context.Response.OutputStream.Write(data, 0, data.Length);
                }
                else
                {
                    context.Response.StatusCode = 404;
                }
            }
            catch
            {
                context.Response.StatusCode = 500;
            }
            finally
            {
                try
                {
                    context.Response.OutputStream.Close();
                }
                catch { }
            }
        }

        private static string GetMimeType(string ext)
        {
            switch (ext)
            {
                case ".html": return "text/html; charset=utf-8";
                case ".js": return "application/javascript; charset=utf-8";
                case ".css": return "text/css; charset=utf-8";
                case ".json": return "application/json; charset=utf-8";
                case ".svg": return "image/svg+xml";
                case ".png": return "image/png";
                case ".jpg":
                case ".jpeg": return "image/jpeg";
                case ".gif": return "image/gif";
                case ".ico": return "image/x-icon";
                case ".woff": return "font/woff";
                case ".woff2": return "font/woff2";
                case ".ttf": return "font/ttf";
                default: return "application/octet-stream";
            }
        }
    }
}
