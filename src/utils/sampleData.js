export const sampleWorkbookData = {
  fileName: "Tai_Lieu_Hoc_Tap_Mau.xlsx",
  fileSize: 45280,
  sheets: [
    {
      name: "Sổ Tay Thuật Ngữ & Từ Vựng",
      headers: ["Thuật ngữ", "Phiên âm / Dịch", "Cấp độ", "Chủ đề", "Định nghĩa & Giải thích chi tiết", "Ví dụ áp dụng trong thực tế", "Ghi chú ghi nhớ"],
      totalRows: 10,
      totalCols: 7,
      columnMeta: [
        { key: "Thuật ngữ", label: "Thuật ngữ", type: "text", isLongText: false, idealWidth: 170, align: "left" },
        { key: "Phiên âm / Dịch", label: "Phiên âm / Dịch", type: "text", isLongText: false, idealWidth: 180, align: "left" },
        { key: "Cấp độ", label: "Cấp độ", type: "text", isLongText: false, idealWidth: 120, align: "left" },
        { key: "Chủ đề", label: "Chủ đề", type: "text", isLongText: false, idealWidth: 140, align: "left" },
        { key: "Định nghĩa & Giải thích chi tiết", label: "Định nghĩa & Giải thích chi tiết", type: "text", isLongText: true, idealWidth: 380, align: "left" },
        { key: "Ví dụ áp dụng trong thực tế", label: "Ví dụ áp dụng trong thực tế", type: "text", isLongText: true, idealWidth: 340, align: "left" },
        { key: "Ghi chú ghi nhớ", label: "Ghi chú ghi nhớ", type: "text", isLongText: true, idealWidth: 260, align: "left" }
      ],
      rows: [
        {
          _id: 1,
          "Thuật ngữ": "Single Page Application (SPA)",
          "Phiên âm / Dịch": "Ứng dụng một trang",
          "Cấp độ": "Trung cấp",
          "Chủ đề": "Web Development",
          "Định nghĩa & Giải thích chi tiết": "Mô hình ứng dụng web tải toàn bộ mã HTML, CSS và JavaScript một lần duy nhất. Khi người dùng tương tác chuyển trang, nội dung được cập nhật động bằng API mà không cần load lại cả trang trình duyệt.",
          "Ví dụ áp dụng trong thực tế": "Các nền tảng như Gmail, Google Maps, Dashboard quản trị xây dựng bằng Vue.js hoặc React.",
          "Ghi chú ghi nhớ": "Trải nghiệm mượt mà giống phần mềm desktop, chú ý cấu hình SEO."
        },
        {
          _id: 2,
          "Thuật ngữ": "Composition API",
          "Phiên âm / Dịch": "API tổng hợp (Vue 3)",
          "Cấp độ": "Căn bản",
          "Chủ đề": "Vue.js",
          "Định nghĩa & Giải thích chi tiết": "Cơ chế mới của Vue 3 cho phép gom nhóm logic theo tính năng (feature-based) thay vì chia cắt theo Options API (data, methods, computed). Sử dụng setup(), ref(), reactive().",
          "Ví dụ áp dụng trong thực tế": "Tách một hàm useExcelReader() để tái sử dụng logic đọc file ở nhiều component khác nhau.",
          "Ghi chú ghi nhớ": "Code linh hoạt, tái sử dụng tốt, hỗ trợ TypeScript hoàn hảo."
        },
        {
          _id: 3,
          "Thuật ngữ": "Responsive Web Design",
          "Phiên âm / Dịch": "Thiết kế tương thích đa thiết bị",
          "Cấp độ": "Căn bản",
          "Chủ đề": "Frontend UI/UX",
          "Định nghĩa & Giải thích chi tiết": "Phương pháp tiếp cận thiết kế web giúp giao diện tự động co giãn, điều chỉnh bố cục tối ưu trên màn hình từ điện thoại di động, máy tính bảng đến desktop lớn.",
          "Ví dụ áp dụng trong thực tế": "Sử dụng CSS Grid, Flexbox và breakpoint của Tailwind CSS như sm:, md:, lg:, xl:.",
          "Ghi chú ghi nhớ": "Luôn tư duy Mobile-first khi bắt đầu xây dựng layout."
        },
        {
          _id: 4,
          "Thuật ngữ": "Microservices Architecture",
          "Phiên âm / Dịch": "Kiến trúc vi dịch vụ",
          "Cấp độ": "Nâng cao",
          "Chủ đề": "System Design",
          "Định nghĩa & Giải thích chi tiết": "Kiểu kiến trúc phần mềm chia nhỏ hệ thống thành nhiều dịch vụ độc lập, mỗi dịch vụ chạy tiến trình riêng và giao tiếp qua HTTP REST hoặc gRPC.",
          "Ví dụ áp dụng trong thực tế": "Netflix chia tách hệ thống thành hàng trăm service nhỏ: xác thực, gợi ý phim, phát video, thanh toán.",
          "Ghi chú ghi nhớ": "Dễ mở rộng nhưng phức tạp trong việc quản lý phân tán."
        },
        {
          _id: 5,
          "Thuật ngữ": "Debounce Technique",
          "Phiên âm / Dịch": "Kỹ thuật chống nảy",
          "Cấp độ": "Trung cấp",
          "Chủ đề": "Performance",
          "Định nghĩa & Giải thích chi tiết": "Kỹ thuật lập trình trì hoãn việc thực thi một hàm cho đến sau khi một khoảng thời gian nhất định trôi qua kể từ lần gọi cuối cùng. Thường dùng cho thanh tìm kiếm.",
          "Ví dụ áp dụng trong thực tế": "Người dùng gõ vào ô tìm kiếm, hệ thống đợi 300ms sau khi ngừng gõ mới tiến hành lọc dữ liệu bảng.",
          "Ghi chú ghi nhớ": "Giảm tải CPU và tránh gọi API quá nhiều lần không cần thiết."
        },
        {
          _id: 6,
          "Thuật ngữ": "Virtual DOM",
          "Phiên âm / Dịch": "Cây DOM ảo",
          "Cấp độ": "Trung cấp",
          "Chủ đề": "Core Engine",
          "Định nghĩa & Giải thích chi tiết": "Bản sao trừu tượng hóa bằng JavaScript object của DOM thật trên trình duyệt. Khi trạng thái thay đổi, hệ thống so sánh (diffing) để chỉ cập nhật đúng node bị đổi.",
          "Ví dụ áp dụng trong thực tế": "Vue 3 sử dụng Virtual DOM kết hợp trình biên dịch tối ưu (compiler optimization) cho tốc độ render siêu tốc.",
          "Ghi chú ghi nhớ": "Giúp giao diện cập nhật mượt mà, hạn chế browser reflow & repaint."
        },
        {
          _id: 7,
          "Thuật ngữ": "Clean Code",
          "Phiên âm / Dịch": "Mã nguồn sạch",
          "Cấp độ": "Căn bản",
          "Chủ đề": "Best Practices",
          "Định nghĩa & Giải thích chi tiết": "Mã nguồn dễ đọc, dễ hiểu, có tính tổ chức cao và dễ bảo trì bởi các lập trình viên khác trong tương lai.",
          "Ví dụ áp dụng trong thực tế": "Đặt tên biến và hàm có ý nghĩa rõ ràng (ví dụ: parseExcelFile thay vì p()), viết hàm ngắn gọn làm đúng một nhiệm vụ.",
          "Ghi chú ghi nhớ": "Code viết cho người đọc trước, cho máy tính chạy sau."
        },
        {
          _id: 8,
          "Thuật ngữ": "Zero-Config Parser",
          "Phiên âm / Dịch": "Bộ phân tích không cần cấu hình",
          "Cấp độ": "Trung cấp",
          "Chủ đề": "Data Processing",
          "Định nghĩa & Giải thích chi tiết": "Cơ chế tự động đọc và nhận diện kiểu dữ liệu, độ rộng cột và cấu trúc bảng của file Excel mà không đòi hỏi người dùng phải khai báo trước schema.",
          "Ví dụ áp dụng trong thực tế": "Ứng dụng ExcelView tự động phát hiện cột nào là số, cột nào là ngày, cột nào có nội dung dài để dàn trang tối ưu.",
          "Ghi chú ghi nhớ": "Tạo cảm giác tiện dụng và kỳ diệu ngay từ lần đầu sử dụng."
        }
      ]
    },
    {
      name: "Kế Hoạch Khóa Học & Điểm Số",
      headers: ["Mã môn", "Tên môn học", "Số tín chỉ", "Giảng viên", "Điểm quá trình", "Điểm thi cuối kỳ", "Điểm tổng kết", "Xếp loại", "Trạng thái"],
      totalRows: 6,
      totalCols: 9,
      columnMeta: [
        { key: "Mã môn", label: "Mã môn", type: "text", isLongText: false, idealWidth: 120, align: "left" },
        { key: "Tên môn học", label: "Tên môn học", type: "text", isLongText: false, idealWidth: 260, align: "left" },
        { key: "Số tín chỉ", label: "Số tín chỉ", type: "number", isLongText: false, idealWidth: 110, align: "right" },
        { key: "Giảng viên", label: "Giảng viên", type: "text", isLongText: false, idealWidth: 170, align: "left" },
        { key: "Điểm quá trình", label: "Điểm quá trình", type: "number", isLongText: false, idealWidth: 130, align: "right" },
        { key: "Điểm thi cuối kỳ", label: "Điểm thi cuối kỳ", type: "number", isLongText: false, idealWidth: 140, align: "right" },
        { key: "Điểm tổng kết", label: "Điểm tổng kết", type: "number", isLongText: false, idealWidth: 130, align: "right" },
        { key: "Xếp loại", label: "Xếp loại", type: "text", isLongText: false, idealWidth: 120, align: "left" },
        { key: "Trạng thái", label: "Trạng thái", type: "text", isLongText: false, idealWidth: 130, align: "left" }
      ],
      rows: [
        {
          _id: 1,
          "Mã môn": "CS101",
          "Tên môn học": "Cấu trúc dữ liệu & Giải thuật nâng cao",
          "Số tín chỉ": 4,
          "Giảng viên": "TS. Nguyễn Văn Hùng",
          "Điểm quá trình": 9.2,
          "Điểm thi cuối kỳ": 8.8,
          "Điểm tổng kết": 9.0,
          "Xếp loại": "Xuất sắc",
          "Trạng thái": "Đã hoàn thành"
        },
        {
          _id: 2,
          "Mã môn": "WEB202",
          "Tên môn học": "Lập trình Web hiện đại với Vue 3 & Vite",
          "Số tín chỉ": 3,
          "Giảng viên": "ThS. Trần Thị Mai",
          "Điểm quá trình": 9.5,
          "Điểm thi cuối kỳ": 9.6,
          "Điểm tổng kết": 9.6,
          "Xếp loại": "Xuất sắc",
          "Trạng thái": "Đã hoàn thành"
        },
        {
          _id: 3,
          "Mã môn": "DB303",
          "Tên môn học": "Cơ sở dữ liệu phân tán & NoSQL",
          "Số tín chỉ": 3,
          "Giảng viên": "TS. Lê Hoàng Nam",
          "Điểm quá trình": 8.0,
          "Điểm thi cuối kỳ": 8.4,
          "Điểm tổng kết": 8.2,
          "Xếp loại": "Giỏi",
          "Trạng thái": "Đã hoàn thành"
        },
        {
          _id: 4,
          "Mã môn": "AI404",
          "Tên môn học": "Nhập môn Trí tuệ Nhân tạo & LLMs",
          "Số tín chỉ": 4,
          "Giảng viên": "GS. Phạm Tuấn Kiệt",
          "Điểm quá trình": 9.0,
          "Điểm thi cuối kỳ": 9.3,
          "Điểm tổng kết": 9.2,
          "Xếp loại": "Xuất sắc",
          "Trạng thái": "Đã hoàn thành"
        },
        {
          _id: 5,
          "Mã môn": "ENG505",
          "Tên môn học": "Tiếng Anh chuyên ngành Công nghệ Thông tin",
          "Số tín chỉ": 2,
          "Giảng viên": "ThS. Emma Watson",
          "Điểm quá trình": 8.5,
          "Điểm thi cuối kỳ": 8.7,
          "Điểm tổng kết": 8.6,
          "Xếp loại": "Giỏi",
          "Trạng thái": "Đã hoàn thành"
        }
      ]
    },
    {
      name: "Tài Liệu & Đầu Sách Cần Đọc",
      headers: ["Tên sách / Tài liệu", "Tác giả", "Thể loại", "Tóm tắt cốt lõi", "Ghi chú ứng dụng"],
      totalRows: 4,
      totalCols: 5,
      columnMeta: [
        { key: "Tên sách / Tài liệu", label: "Tên sách / Tài liệu", type: "text", isLongText: false, idealWidth: 240, align: "left" },
        { key: "Tác giả", label: "Tác giả", type: "text", isLongText: false, idealWidth: 160, align: "left" },
        { key: "Thể loại", label: "Thể loại", type: "text", isLongText: false, idealWidth: 140, align: "left" },
        { key: "Tóm tắt cốt lõi", label: "Tóm tắt cốt lõi", type: "text", isLongText: true, idealWidth: 380, align: "left" },
        { key: "Ghi chú ứng dụng", label: "Ghi chú ứng dụng", type: "text", isLongText: true, idealWidth: 320, align: "left" }
      ],
      rows: [
        {
          _id: 1,
          "Tên sách / Tài liệu": "Clean Architecture",
          "Tác giả": "Robert C. Martin (Uncle Bob)",
          "Thể loại": "Kiến trúc phần mềm",
          "Tóm tắt cốt lõi": "Quy tắc thiết kế hệ thống phân tầng (Layered architecture), nguyên lý phụ thuộc đảo ngược (Dependency Inversion), giữ cho core business logic độc lập với framework và cơ sở dữ liệu.",
          "Ghi chú ứng dụng": "Cực kỳ hữu ích khi cấu trúc các dự án phần mềm có quy mô vừa và lớn."
        },
        {
          _id: 2,
          "Tên sách / Tài liệu": "Refactoring: Improving the Design of Existing Code",
          "Tác giả": "Martin Fowler",
          "Thể loại": "Kỹ năng lập trình",
          "Tóm tắt cốt lõi": "Hướng dẫn các kỹ thuật cải tiến cấu trúc mã nguồn cũ mà không làm thay đổi hành vi bên ngoài, giúp code ngày càng sạch và ngăn ngừa tích tụ nợ kỹ thuật (technical debt).",
          "Ghi chú ứng dụng": "Đọc để luyện thói quen viết unit test và chuẩn hóa code hàng ngày."
        },
        {
          _id: 3,
          "Tên sách / Tài liệu": "Designing Data-Intensive Applications",
          "Tác giả": "Martin Kleppmann",
          "Thể loại": "Dữ liệu & Phân tán",
          "Tóm tắt cốt lõi": "Cuốn kinh thánh về cách xây dựng hệ thống xử lý dữ liệu lớn, tin cậy, có thể mở rộng và dễ bảo trì. Đi sâu vào cơ chế lưu trữ, chỉ mục, sao chép (replication), và đồng thuận phân tán.",
          "Ghi chú ứng dụng": "Phù hợp để nghiên cứu khi chuẩn bị thiết kế hệ thống backend quy mô lớn."
        },
        {
          _id: 4,
          "Tên sách / Tài liệu": "Don't Make Me Think",
          "Tác giả": "Steve Krug",
          "Thể loại": "UI/UX & Trải nghiệm",
          "Tóm tắt cốt lõi": "Nguyên tắc thiết kế giao diện đơn giản, trực quan đến mức người dùng không cần phải đắn đo suy nghĩ khi thao tác. Giảm bớt số lần nhấp chuột và loại bỏ chi tiết thừa.",
          "Ghi chú ứng dụng": "Rất quan trọng để thiết kế giao diện bảng đọc Excel dễ nhìn, thoáng mắt và dễ tra cứu."
        }
      ]
    }
  ]
}
