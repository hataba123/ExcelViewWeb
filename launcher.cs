using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;
using System.Diagnostics;
using System.Collections.Generic;

namespace ExcelViewLauncher
{
    class Program
    {
        static HttpListener listener;
        static string baseDirectory;
        static int port = 54321;
        static Process browserProcess;

        static void Main(string[] args)
        {
            // Base directory where dist folder resides
            string currentDir = AppDomain.CurrentDomain.BaseDirectory;
            baseDirectory = Path.Combine(currentDir, "dist");

            if (!Directory.Exists(baseDirectory))
            {
                // Fallback: check if we are in another directory
                if (Directory.Exists(Path.Combine(currentDir, "..", "dist")))
                {
                    baseDirectory = Path.GetFullPath(Path.Combine(currentDir, "..", "dist"));
                }
                else
                {
                    System.Windows.Forms.MessageBox.Show(
                        "Không tìm thấy thư mục 'dist'. Vui lòng đảm bảo ứng dụng đã được build hoặc thư mục dist nằm cùng cấp với file ExcelView.exe.",
                        "ExcelView Pro - Lỗi",
                        System.Windows.Forms.MessageBoxButtons.OK,
                        System.Windows.Forms.MessageBoxIcon.Error
                    );
                    return;
                }
            }

            // Find an open port
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
                    // Try next port
                }
            }

            if (!started)
            {
                System.Windows.Forms.MessageBox.Show("Không thể khởi tạo cổng mạng cục bộ.", "Lỗi");
                return;
            }

            // Start HTTP listener in background thread
            Thread serverThread = new Thread(ListenLoop);
            serverThread.IsBackground = true;
            serverThread.Start();

            string appUrl = "http://127.0.0.1:" + port + "/";

            // Launch Edge in App Mode for dedicated, frameless window
            string edgePath = @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe";
            if (!File.Exists(edgePath))
            {
                edgePath = @"C:\Program Files\Microsoft\Edge\Application\msedge.exe";
            }

            if (File.Exists(edgePath))
            {
                ProcessStartInfo psi = new ProcessStartInfo();
                psi.FileName = edgePath;
                psi.Arguments = string.Format("--app=\"{0}\" --window-size=1320,860 --app-id=ExcelViewPro", appUrl);
                psi.UseShellExecute = false;
                browserProcess = Process.Start(psi);

                if (browserProcess != null)
                {
                    browserProcess.WaitForExit();
                }
            }
            else
            {
                // Fallback: Open in default browser
                Process.Start(new ProcessStartInfo
                {
                    FileName = appUrl,
                    UseShellExecute = true
                });

                // Keep alive until user closes or 24 hours
                Thread.Sleep(86400000);
            }

            try
            {
                listener.Stop();
            }
            catch { }
        }

        static void ListenLoop()
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

        static void HandleRequest(HttpListenerContext context)
        {
            try
            {
                string rawUrl = context.Request.Url.AbsolutePath;
                if (string.IsNullOrEmpty(rawUrl) || rawUrl == "/")
                {
                    rawUrl = "/index.html";
                }

                // Decode URL path
                rawUrl = rawUrl.TrimStart('/');
                rawUrl = Uri.UnescapeDataString(rawUrl);

                string filePath = Path.Combine(baseDirectory, rawUrl);

                if (!File.Exists(filePath))
                {
                    // SPA fallback: return index.html
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

        static string GetMimeType(string ext)
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
