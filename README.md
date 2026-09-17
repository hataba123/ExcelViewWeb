# 📊 ExcelView Web - Trình Đọc & Học Tập Từ File Excel Hiện Đại

> **Biến bảng tính Excel thô cứng thành giao diện đọc tài liệu, học từ vựng và nghiên cứu trực quan, đẹp mắt và êm dịu cho mắt.**

![ExcelView Web](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SheetJS](https://img.shields.io/badge/SheetJS-0.18-green?style=for-the-badge)

---

## ✨ Điểm Nổi Bật & Tối Ưu Cho Học Tập

Khi mở file Excel truyền thống để học tập, người dùng thường gặp ức chế vì chữ bị che khuất, viền ô xám xịt khó nhìn, không hỗ trợ chế độ đọc và đau mắt khi nhìn lâu. **ExcelView Web** được thiết kế đặc thù để giải quyết triệt để vấn đề này:

### 1. 📖 Trải Nghiệm Chữ Viết & Typography Tối Thượng
- **Font chữ Be Vietnam Pro**: Được thiết kế chuẩn xác cho ngôn ngữ Tiếng Việt, hiển thị dấu thanh và ký tự tròn trịa, sắc nét.
- **Tùy chỉnh cỡ chữ linh hoạt**: Hỗ trợ 4 nấc cỡ chữ `A-` (13px), `A` (15px), `A+` (17px), `A++` (19px).
- **Khoảng cách dòng khoa học**: Chọn giữa `Gọn`, `Chuẩn` hoặc `Thoáng` (giúp đọc các đoạn giải thích dài cực kỳ thoải mái).
- **Chế độ Xuống Dòng Thông Minh (Text Wrap)**: Không bao giờ bị mất chữ như Excel, tự động ngắt dòng êm ái.

### 2. 🛡️ Chế Độ Đọc Bảo Vệ Mắt (Eye-Care Theme)
- **🍵 Chế độ Sepia / Ấm dịu**: Nền giấy ngà ấm áp kết hợp màu mực nâu sẫm mô phỏng trang sách giấy, loại bỏ ánh sáng xanh gây mỏi mắt trong những buổi học kéo dài.
- **☀️ Chế độ Sáng (Light)**: Tươi sáng, thanh lịch với tông màu Slate & Emerald hiện đại.
- **🌙 Chế độ Đêm (Dark)**: Dịu nhẹ trong môi trường thiếu sáng.

### 3. 📐 Co Giãn Cột Tự Động & Thích Ứng Dữ Liệu
- Hệ thống tự động phân tích 100 dòng dữ liệu đầu tiên để tính toán độ dài lý tưởng cho từng cột.
- Cột ngắn (mã số, điểm, trạng thái) được co gọn gàng; cột dài (định nghĩa, ví dụ, ghi chú học tập) được tự động ưu tiên không gian rộng rãi.
- Cố định dòng tiêu đề (**Sticky Header**) và cố định cột số thứ tự (**Sticky Row ID**) khi cuộn bảng lớn.

### 4. 📇 Thẻ Học Chi Tiết (Flashcard / Row Detail Reader)
- Click vào bất kỳ dòng nào để mở **Thẻ Đọc Toàn Diện**: Trình bày từng trường thông tin to rõ dưới dạng thẻ học.
- Hỗ trợ phím tắt mũi tên `[←]` `[→]` để lướt qua từng dòng như học flashcard, phím `[Esc]` để đóng.
- Tích hợp nút sao chép nhanh nội dung vào clipboard.

### 5. 🔍 Tìm Kiếm Thông Minh & Highlight Tức Thì
- Thanh tìm kiếm toàn văn tìm kiếm tức thì trên mọi cột dữ liệu.
- Từ khóa trùng khớp được **highlight rực rỡ** (`<mark>`), giúp bạn nhanh chóng định vị thuật ngữ cần tra cứu.

### 6. 🗂️ Quản Lý Đa Trang Tính (Multi-Sheet Tabs) & Nhận Diện Tag Tự Động
- Tự động trích xuất mọi Sheet trong file Excel và tạo thanh tab chuyển đổi mượt mà.
- Tự động nhận diện các trạng thái học tập (*Xuất sắc*, *Hoàn thành*, *Nâng cao*, *Đang học*...) để tạo **Pill Badges** màu sắc sinh động.
- Tự động tính toán số dòng, số cột và **thời gian đọc ước tính** của trang tính.

### 7. 🔒 Bảo Mật Tuyệt Đối (100% Client-Side)
- Toàn bộ file Excel/CSV được phân tích trực tiếp trên trình duyệt bằng Web APIs và SheetJS.
- Không có bất kỳ dữ liệu nào được tải lên máy chủ hoặc bên thứ ba.

---

## 🚀 Cài Đặt & Khởi Chạy

### Yêu cầu môi trường
- Đã cài đặt [Node.js](https://nodejs.org/) (khuyến nghị phiên bản 18+ trở lên).

### Các bước khởi chạy

#### Cách 1: Chạy trực tiếp bằng file `ExcelView.exe` (Khuyên dùng - Nhanh nhất!) ⚡
- Nhấp đúp trực tiếp vào file **`ExcelView.exe`** trong thư mục dự án hoặc shortcut **`ExcelView Pro`** ngoài màn hình Desktop.
- Ứng dụng sẽ tự động mở trong cửa sổ desktop riêng biệt, không có thanh địa chỉ, mở tức thì và cực kỳ mượt mà!
- Để build lại file `.exe` sau khi chỉnh sửa code:
  ```bash
  npm run build:exe
  ```

#### Cách 2: Chạy qua máy chủ Web (Development)
1. **Cài đặt thư viện dependencies:**
   ```bash
   npm install
   ```

2. **Chạy dev server:**
   ```bash
   npm run dev
   ```
   *Trình duyệt sẽ tự động mở tại địa chỉ `http://localhost:5173`.*

3. **Đóng gói ứng dụng cho Production:**
   ```bash
   npm run build
   ```
   *Các file tĩnh tối ưu hóa sẽ được tạo tại thư mục `dist/`.*

---

## 📂 Cấu Trúc Dự Án

```text
excel-view-web/
├── index.html                  # Cấu hình Google Fonts (Be Vietnam Pro) & HTML Shell
├── package.json                # Danh sách dependencies & scripts
├── vite.config.js              # Cấu hình Vite & tối ưu tách chunk thư viện xlsx
├── tailwind.config.js          # Bảng màu Sepia, Dark và cấu hình Typography
├── src/
│   ├── main.js                 # Điểm khởi đầu ứng dụng Vue 3
│   ├── App.vue                 # Quản lý trạng thái trung tâm, phím tắt & chủ đề
│   ├── assets/
│   │   └── main.css            # Style tùy chỉnh thanh cuộn, theme đọc và in ấn
│   ├── components/
│   │   ├── HeaderNavbar.vue    # Thanh điều khiển cỡ chữ, khoảng cách dòng, theme, xuất file
│   │   ├── FileUploader.vue    # Kéo thả file Excel/CSV & nút nạp dữ liệu học tập mẫu
│   │   ├── SheetTabs.vue       # Thanh chuyển đổi giữa các sheet
│   │   ├── SummaryStats.vue    # Thẻ tóm tắt số liệu & thời gian đọc ước tính
│   │   ├── TableControls.vue   # Tìm kiếm, chọn số dòng/trang, ẩn/hiện cột
│   │   ├── DataTable.vue       # Bảng hiển thị thông minh, sticky header, highlight, badge
│   │   └── RowDetailModal.vue  # Modal xem chi tiết từng dòng dạng Flashcard học tập
│   └── utils/
│       ├── excelParser.js      # Xử lý đọc file bằng SheetJS & tự động tính độ rộng cột
│       └── sampleData.js       # Dữ liệu mẫu phong phú về từ vựng, lộ trình học và sách
└── README.md
```

---

## 💡 Hướng Dẫn Sử Dụng Nhanh

1. **Trải nghiệm ngay lập tức**: Trên màn hình chính, nhấp vào nút **"Xem dữ liệu học tập mẫu"** để mở ngay bộ từ vựng & kế hoạch khóa học mẫu với đầy đủ định dạng đẹp mắt.
2. **Mở file của bạn**: Kéo thả tệp `.xlsx`, `.xls` hoặc `.csv` từ máy tính vào vùng tải lên.
3. **Tùy chỉnh để học thoải mái nhất**:
   - Chọn biểu tượng con mắt 🍵 để bật **Chế độ Sepia êm dịu**.
   - Bấm `A+` hoặc `A++` trên thanh công cụ để phóng to chữ.
   - Nhấp vào một dòng bất kỳ để mở chế độ đọc chuyên sâu **Flashcard**.
4. **Xuất file**: Khi cần tải lại bảng dữ liệu đã tìm kiếm hoặc chỉnh sửa, nhấp vào nút **"Xuất Excel"** ở góc trên bên phải.

---

## 📜 Giấy Phép
Dự án phát hành theo giấy phép mã nguồn mở MIT.
