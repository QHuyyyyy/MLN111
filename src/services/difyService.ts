import axios from 'axios';

interface DifyRequest {
    inputs: Record<string, any>;
    query: string;
    response_mode: 'blocking' | 'streaming';
    conversation_id?: string;
    user: string;
    files?: Array<{
        type: string;
        transfer_method: string;
        url: string;
    }>;
}

interface DifyResponse {
    event?: string;
    conversation_id: string;
    message_id: string;
    answer: string;
    created_at: number;
}

class DifyService {
    private apiUrl: string;
    private apiKey: string;
    private conversationId?: string;

    constructor() {
        this.apiUrl = import.meta.env.VITE_DIFY_API_URL || 'https://api.dify.ai/v1';
        this.apiKey = import.meta.env.VITE_DIFY_API_KEY || '';

        if (!this.apiKey) {
            throw new Error('VITE_DIFY_API_KEY không được cấu hình trong file .env');
        }
    }

    async sendMessage(message: string, userId: string = 'user'): Promise<string> {
        if (!this.apiKey) {
            throw new Error('API key chưa được cấu hình. Vui lòng kiểm tra file .env');
        }

        try {
            const payload: DifyRequest = {
                inputs: {},
                query: message,
                response_mode: 'blocking',
                user: userId,
            };

            if (this.conversationId) {
                payload.conversation_id = this.conversationId;
            }

            const response = await axios.post<DifyResponse>(
                `${this.apiUrl}/chat-messages`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Lưu conversation_id để duy trì context
            if (response.data.conversation_id) {
                this.conversationId = response.data.conversation_id;
            }

            return response.data.answer;
        } catch (error: any) {
            console.error('Lỗi khi gọi Dify API:', error);

            if (error.response?.status === 401) {
                throw new Error('API key không hợp lệ. Vui lòng kiểm tra VITE_DIFY_API_KEY trong file .env');
            } else if (error.response?.status === 404) {
                throw new Error('Không tìm thấy endpoint API. Vui lòng kiểm tra VITE_DIFY_API_URL');
            } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
                throw new Error('Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet');
            } else {
                throw new Error(`Lỗi API Dify: ${error.response?.data?.message || error.message}`);
            }
        }
    }


    resetConversation(): void {
        this.conversationId = undefined;
    }

    isConfigured(): boolean {
        return !!this.apiKey;
    }
}

export const difyService = new DifyService();
export default DifyService;
