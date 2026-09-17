# 📊 ExcelView Web - Trình Đọc & Học Tập Từ File Excel Thông Minh

<p align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/book-open.svg" width="80" height="80" alt="ExcelView Logo" />
</p>

<p align="center">
  <strong>Biến bảng tính Excel thô cứng thành giao diện đọc tài liệu, sổ tay từ vựng và tài liệu nghiên cứu đẹp mắt, trực quan và êm dịu cho mắt.</strong>
</p>

<p align="center">
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3"></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://sheetjs.com/"><img src="https://img.shields.io/badge/SheetJS-0.18-green?style=for-the-badge" alt="SheetJS"></a>
  <a href="#-cách-1-chạy-ngay-bằng-file-excelviewexe-nhanh-nhất-"><img src="https://img.shields.io/badge/Windows-App_Mode_.EXE-blue?style=for-the-badge&logo=windows" alt="Windows EXE"></a>
</p>

---

## 🎯 Tại Sao Nên Dùng ExcelView Để Đọc & Học Tập?

Khi mở các file Excel chứa tài liệu học tập, từ vựng, bài giảng hoặc ghi chú dài, giao diện bảng tính mặc định của Microsoft Excel thường gây nhiều bất tiện:

| Tiêu chí | Mở trên Microsoft Excel truyền thống | Trải nghiệm trên **ExcelView Web** |
| :--- | :--- | :--- |
| **Độ rõ nét chữ** | Font mặc định thô, dấu tiếng Việt dễ lỗi khoảng cách | **Font Be Vietnam Pro** thiết kế riêng cho tiếng Việt |
| **Ghi chú / Đoạn văn dài** | Bị che cụt (tràn ô), phải kéo giãn thủ công từng cột | **Tự động co giãn theo độ dài** + **Chế độ tự ngắt dòng (Wrap Text)** |
| **Mỏi mắt khi học lâu** | Nền trắng chói hoặc viền xám xịt đơn điệu | **Chế độ Sepia (Trang sách ấm)** chống mỏi mắt + Dark Mode |
| **Học từ vựng & Chi tiết** | Phải nhấp đúp vào thanh fx nhỏ xíu để đọc | **Chế độ Thẻ học Flashcard** hiển thị to rõ từng trường thông tin |
| **Tìm kiếm tra cứu** | Hộp thoại Ctrl+F che khuất nội dung bảng | **Tìm kiếm toàn văn thông minh** + **Highlight từ khóa rực rỡ** |
| **Đa nền tảng & Tiện lợi** | Cần cài bộ Microsoft Office nặng nề | **Chạy ngay qua file `.exe`** hoặc trình duyệt, không cần cài Office |

---

## 🌟 Tính Năng Nổi Bật

### 1. 📖 Tối Ưu Hóa Typography & Chữ Viết Cho Việc Học
- **Font chữ Be Vietnam Pro**: Chuẩn xác từng dấu câu và ký tự tiếng Việt.
- **Kích thước chữ 4 cấp độ**: `A-` (13px), `A` (15px), `A+` (17px), `A++` (19px) thay đổi tức thì.
- **Khoảng cách dòng đọc sách**: `Gọn` (Compact), `Chuẩn` (Normal), `Thoáng` (Relaxed).
- **Ngắt dòng tự động (Text Wrap)**: Đọc trọn vẹn từng câu giải thích mà không bị ẩn chữ.

### 2. 🛡️ 3 Chủ Đề Đọc Chuyên Nghiệp (Eye-Care Theme)
- 🍵 **Sepia (Êm dịu)**: Tông màu ngà sách giấy cổ điển kết hợp màu mực nâu sẫm, loại bỏ ánh sáng xanh gây mỏi mắt.
- ☀️ **Light (Sáng tinh tế)**: Phong cách hiện đại với màu nhấn ngọc lục bảo (Emerald).
- 🌙 **Dark (Đêm dịu mắt)**: Nền than chì tối giản cho không gian thiếu sáng.

### 3. 📐 Co Giãn Cột Tự Động Thông Minh (Auto-Fit Columns)
- Thuật toán thông minh quét qua dữ liệu để tính toán kích thước lý tưởng cho từng cột:
  - Cột mã số, điểm, trạng thái: tự động co gọn gàng.
  - Cột định nghĩa, ví dụ, ghi chú: được ưu tiên không gian rộng rãi để đọc.
- **Sticky Header**: Cố định tiêu đề cột khi cuộn bảng.
- **Sticky Row Index**: Cố định cột số thứ tự `#` giúp bạn không bị lạc dòng khi xem bảng nhiều cột.

### 4. 📇 Chế Độ Thẻ Học Flashcard (Row Detail Reader)
- Nhấp vào bất kỳ dòng nào để mở cửa sổ chi tiết dạng thẻ học:
  - Hiển thị từng trường dữ liệu với cỡ chữ lớn và định dạng rõ ràng.
  - Phím tắt `[←]` (Trái) và `[→]` (Phải) để lướt qua từng thẻ như học flashcard từ vựng.
  - Phím tắt `[Esc]` để đóng thẻ.
  - Nút sao chép nội dung nhanh vào clipboard.

### 5. 🔍 Tìm Kiếm Thông Minh & Highlight Tức Thì
- Thanh tìm kiếm toàn văn tìm kiếm tức thì trên mọi cột dữ liệu.
- Từ khóa trùng khớp được gắn thẻ `<mark>` nổi bật, giúp bạn định vị nhanh thông tin cần học.

### 6. 🗂️ Đa Trang Tính (Multi-Sheet Tabs) & Nhận Diện Tag Tự Động
- Tự động nhận diện tất cả các Sheet trong file Excel và tạo tab chuyển đổi linh hoạt.
- Tự động phát hiện các trạng thái học tập (*Xuất sắc*, *Hoàn thành*, *Nâng cao*, *Đang học*...) để tạo **Pill Badges** màu sắc trực quan.
- Thống kê tự động: tổng số dòng, số cột và **thời gian đọc ước tính** của sheet.

### 7. 🔒 An Toàn & Bảo Mật Tuyệt Đối (100% Client-Side)
- Mọi thao tác xử lý file đều diễn ra trên trình duyệt máy bạn bằng SheetJS.
- Tuyệt đối **không gửi dữ liệu lên bất kỳ server nào**.

---

## 🚀 Hướng Dẫn Sử Dụng & Khởi Chạy

### ⚡ Cách 1: Chạy ngay bằng file `ExcelView.exe` (Nhanh nhất!)
Ứng dụng đã được biên dịch sẵn thành file thực thi native cho Windows:
- **Nhấp đúp vào file `ExcelView.exe`** trong thư mục dự án hoặc icon **`ExcelView Pro`** ngoài màn hình Desktop.
- Ứng dụng sẽ tự động mở trong cửa sổ Desktop riêng biệt (không có thanh URL hay tab trình duyệt thừa thãi).
- Khi bạn tắt cửa sổ, ứng dụng sẽ tự động đóng và giải phóng tài nguyên máy tính.

---

### 🌐 Cách 2: Chạy thông qua Node.js (Development)

#### Yêu cầu:
- Đã cài đặt [Node.js](https://nodejs.org/) (khuyến nghị phiên bản 18+ trở lên).

#### Các bước thực hiện:
1. **Cài đặt thư viện dependencies:**
   ```bash
   npm install
   ```

2. **Khởi chạy Development Server:**
   ```bash
   npm run dev
   ```
   *Trình duyệt sẽ tự động mở tại địa chỉ `http://localhost:5173`.*

3. **Build lại bản Production:**
   ```bash
   npm run build
   ```

4. **Build lại file `ExcelView.exe`:**
   ```bash
   npm run build:exe
   ```

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
EXCEL WEB LOOK/
├── ExcelView.exe               # File thực thi chạy ngay trên Windows (~8.7 KB)
├── launcher.cs                 # Mã nguồn C# của bộ khởi chạy Desktop App Mode
├── index.html                  # HTML Shell cấu hình Google Fonts (Be Vietnam Pro)
├── package.json                # Dependencies, build scripts & cấu hình dự án
├── vite.config.js              # Cấu hình Vite & tối ưu hóa chia nhỏ chunk SheetJS
├── tailwind.config.js          # Cấu hình bảng màu Sepia, Dark và hệ thống Typography
├── src/
│   ├── main.js                 # Điểm khởi đầu ứng dụng Vue 3
│   ├── App.vue                 # Quản lý trạng thái, phím tắt, theme & vòng đời ứng dụng
│   ├── assets/
│   │   └── main.css            # Tùy chỉnh thanh cuộn, theme Sepia, Dark và in ấn
│   ├── components/
│   │   ├── HeaderNavbar.vue    # Điều khiển cỡ chữ, khoảng cách dòng, theme, xuất file
│   │   ├── FileUploader.vue    # Kéo thả file Excel/CSV & nút nạp dữ liệu học tập mẫu
│   │   ├── SheetTabs.vue       # Thanh tab chuyển đổi giữa các trang tính
│   │   ├── SummaryStats.vue    # Thẻ tóm tắt số liệu & thời gian đọc ước tính
│   │   ├── TableControls.vue   # Tìm kiếm, chọn số dòng/trang, ẩn/hiện cột
│   │   ├── DataTable.vue       # Bảng hiển thị thông minh, sticky header, highlight từ khóa
│   │   └── RowDetailModal.vue  # Modal xem chi tiết từng dòng dạng Flashcard học tập
│   └── utils/
│       ├── excelParser.js      # Xử lý đọc file bằng SheetJS & tự động tính độ rộng cột
│       └── sampleData.js       # Dữ liệu mẫu phong phú về từ vựng, môn học và sách
└── README.md
```

---

## ⌨️ Bảng Phím Tắt Tiện Dụng

| Phím tắt | Thao tác |
| :--- | :--- |
| `[←]` (Mũi tên Trái) | Chuyển về thẻ dữ liệu / flashcard phía trước trong modal |
| `[→]` (Mũi tên Phải) | Chuyển sang thẻ dữ liệu / flashcard tiếp theo trong modal |
| `[Esc]` | Đóng modal xem chi tiết dòng |

---

## 💡 Hướng Dẫn Sử Dụng Nhanh

1. **Thử nghiệm ngay**: Bấm nút **"Xem dữ liệu học tập mẫu"** để mở ngay bộ từ vựng & kế hoạch khóa học có sẵn.
2. **Đọc file của bạn**: Kéo thả tệp `.xlsx`, `.xls` hoặc `.csv` vào khung tải lên.
3. **Chỉnh giao diện học tập**:
   - Chọn biểu tượng con mắt 🍵 để bật **Chế độ Sepia êm dịu**.
   - Bấm `A+` hoặc `A++` trên thanh công cụ để tăng kích thước chữ.
   - Nhấp vào một dòng bất kỳ để mở thẻ học **Flashcard**.
4. **Xuất file**: Bấm **"Xuất Excel"** ở góc trên để lưu lại bảng dữ liệu sau khi tìm kiếm hoặc lọc.

---

## 📜 Giấy Phép
Dự án được phát hành theo giấy phép mã nguồn mở MIT.
