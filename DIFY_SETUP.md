# Hướng dẫn cấu hình Dify.ai

## 1. Tạo tài khoản và ứng dụng Dify.ai

1. Truy cập [https://dify.ai](https://dify.ai)
2. Đăng ký tài khoản mới hoặc đăng nhập
3. Tạo một ứng dụng mới (Chat App)

## 2. Lấy API Key

1. Vào dashboard của ứng dụng
2. Chọn **Settings** -> **API Keys**
3. Nhấn **Create API Key**
4. Sao chép API key

## 3. Cấu hình ứng dụng

1. Mở file `.env` trong thư mục gốc của project
2. Thay thế `your_api_key_here` bằng API key thật:

```env
VITE_DIFY_API_KEY=app-xxxxxxxxxxxxxxxxxxxxxxxx
```

## 4. Format API Request theo Dify.ai

Ứng dụng sử dụng định dạng API chính xác theo documentation của Dify.ai:

```bash
curl -X POST 'https://api.dify.ai/v1/chat-messages' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "inputs": {},
    "query": "What are the specs of the iPhone 13 Pro Max?",
    "response_mode": "blocking",
    "conversation_id": "",
    "user": "abc-123",
    "files": [
        {
            "type": "image",
            "transfer_method": "remote_url",
            "url": "https://cloud.dify.ai/logo/logo-site.png"
        }
    ]
}'
```

## 5. Xử lý lỗi

Ứng dụng sẽ hiển thị các lỗi cụ thể:

- **401**: API key không hợp lệ
- **404**: Không tìm thấy endpoint
- **Network Error**: Lỗi kết nối mạng
- **Các lỗi khác**: Hiển thị thông báo từ API

## 6. Testing

1. Chạy ứng dụng: `npm run dev`
2. Mở chatbot
3. Gửi tin nhắn thử nghiệm
4. Nếu có lỗi, kiểm tra:
   - API key đã đúng chưa
   - Kết nối internet
   - Console để xem log chi tiết

## 7. Troubleshooting

### Lỗi "API key chưa được cấu hình"
- Kiểm tra file `.env` có tồn tại không
- Đảm bảo biến `VITE_DIFY_API_KEY` được đặt đúng

### Lỗi "API key không hợp lệ"
- Kiểm tra lại API key từ Dify dashboard
- Đảm bảo không có space hoặc ký tự thừa

### Lỗi kết nối mạng
- Kiểm tra kết nối internet
- Thử truy cập https://api.dify.ai trực tiếp từ browser
