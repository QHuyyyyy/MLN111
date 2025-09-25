import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, BookOpen, TrendingUp, ArrowRight, Menu, X, Loader2, RotateCcw, Maximize, Minimize } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { difyService } from './services/difyService'
import './App.css'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', content: 'Xin chào! Tôi có thể giúp bạn hiểu về chủ nghĩa duy vật biện chứng. Bạn có câu hỏi gì không?' }
  ])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  const resetChat = () => {
    setChatMessages([
      { type: 'bot', content: 'Xin chào! Tôi có thể giúp bạn về chủ nghĩa duy vật biện chứng và ứng dụng trong khởi nghiệp. Bạn có câu hỏi gì không?' }
    ])
    setCurrentMessage('')
  }

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const handleSendMessage = async () => {
    if (currentMessage.trim() && !isLoading) {
      const userMessage = currentMessage.trim()
      setCurrentMessage('')
      setIsLoading(true)


      setChatMessages(prev => [...prev, { type: 'user', content: userMessage }])

      try {
        // Gọi Dify.ai API
        const botResponse = await difyService.sendMessage(userMessage)
        setChatMessages(prev => [...prev, { type: 'bot', content: botResponse }])
      } catch (error: any) {
        console.error('Lỗi khi gửi tin nhắn:', error)
        const errorMessage = error.message || 'Đã xảy ra lỗi không xác định'
        setChatMessages(prev => [...prev,
        { type: 'bot', content: `❌ ${errorMessage}` }
        ])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const scrollToSection = (sectionId: any) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-800">MLN111</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button onClick={() => scrollToSection('intro')} className="text-slate-600 hover:text-blue-600 transition-colors">
                Giới thiệu
              </button>
              <button onClick={() => scrollToSection('dialectic-materialism')} className="text-slate-600 hover:text-blue-600 transition-colors">
                Chủ nghĩa duy vật biện chứng
              </button>
              <button onClick={() => scrollToSection('three-laws')} className="text-slate-600 hover:text-blue-600 transition-colors">
                Ba Quy luật
              </button>
              <button onClick={() => scrollToSection('startup-application')} className="text-slate-600 hover:text-blue-600 transition-colors">
                Ứng dụng Khởi nghiệp
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
              <div className="flex flex-col space-y-2">
                <button onClick={() => scrollToSection('intro')} className="text-left py-2 text-slate-600 hover:text-blue-600 transition-colors">
                  Giới thiệu
                </button>
                <button onClick={() => scrollToSection('dialectic-materialism')} className="text-left py-2 text-slate-600 hover:text-blue-600 transition-colors">
                  Chủ nghĩa duy vật biện chứng
                </button>
                <button onClick={() => scrollToSection('three-laws')} className="text-left py-2 text-slate-600 hover:text-blue-600 transition-colors">
                  Ba Quy luật
                </button>
                <button onClick={() => scrollToSection('startup-application')} className="text-left py-2 text-slate-600 hover:text-blue-600 transition-colors">
                  Ứng dụng Khởi nghiệp
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            Triết học
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Chủ nghĩa duy vật biện chứng:
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent block">
              Lăng kính phân tích Khởi nghiệp
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Khám phá cách ba quy luật cơ bản của phép biện chứng duy vật giải thích hành trình
            khởi nghiệp - thất bại - tái khởi nghiệp trong thế giới hiện đại.
          </p>
          <Button
            onClick={() => scrollToSection('intro')}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-8 py-3"
          >
            Khám phá ngay <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="intro" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Giới thiệu</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Chủ nghĩa duy vật biện chứng, với các nguyên lý và quy luật cơ bản, cung cấp một lăng kính mạnh mẽ
              để phân tích sự vận động và phát triển của mọi hiện tượng, bao gồm cả quá trình khởi nghiệp.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Câu chuyện về một startup trải qua các giai đoạn khởi nghiệp, thất bại và tái khởi nghiệp là một
              ví dụ điển hình cho sự vận động biện chứng trong thực tiễn xã hội. Bằng cách áp dụng ba quy luật
              cơ bản của phép biện chứng duy vật, chúng ta có thể hiểu sâu sắc hơn về bản chất, động lực và
              khuynh hướng phát triển của hành trình khởi nghiệp.
            </p>
          </div>
        </div>
      </section>

      {/* Dialectical Materialism Section */}
      <section id="dialectic-materialism" className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Chủ nghĩa duy vật biện chứng</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                  Khái niệm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Chủ nghĩa duy vật biện chứng là một bộ phận của học thuyết triết học do Karl Marx và
                  Friedrich Engels đề xướng, sau đó được V.I.Lênin phát triển. Đây là sự kết hợp giữa
                  chủ nghĩa duy vật và phép biện chứng.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowRight className="w-6 h-6 mr-2 text-orange-500" />
                  Phép biện chứng duy vật
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Nhấn mạnh đến phương pháp nhận thức và phương pháp luận nghiên cứu thế giới – tức là nghiên cứu các đối tượng trong trạng thái vận động, biến đổi không ngừng.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">

              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-600" />Nguyên lý về sự phát triển</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Mọi sự vật và hiện tượng đều luôn thay đổi và phát triển không ngừng. Sự phát triển này
                  diễn ra thông qua các mâu thuẫn nội tại và sự đấu tranh giữa các mặt đối lập.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>

                <CardTitle className="flex items-center">  <BookOpen className="w-6 h-6 mr-2 text-blue-600" />Nguyên lý về mối liên hệ phổ biến</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Mọi sự vật và hiện tượng đều có mối liên hệ với nhau. Không có sự vật hay hiện tượng nào
                  tồn tại độc lập mà không có sự tác động qua lại với các sự vật và hiện tượng khác.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Three Laws Section */}
      <section id="three-laws" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Ba Quy luật cơ bản</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto"></div>
          </div>

          <div className="space-y-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">
                  1. Quy luật chuyển hóa từ lượng sang chất
                </CardTitle>
                <CardDescription>
                  Chỉ ra cách thức chung nhất của sự vận động và phát triển
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Sự thay đổi về chất chỉ xảy ra khi sự vật, hiện tượng đã tích lũy những thay đổi về lượng
                  đạt đến ngưỡng nhất định.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Ví dụ:</strong> Nước được đun nóng, nhiệt độ (lượng) tăng dần, khi đạt đến 100°C,
                    nước sẽ biến thành hơi nước (chất).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-orange-500">
                  2. Quy luật thống nhất và đấu tranh giữa các mặt đối lập
                </CardTitle>
                <CardDescription>
                  Chỉ ra nguồn gốc, động lực bên trong của sự vận động, phát triển
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Trong mỗi sự vật, hiện tượng đều tồn tại các mặt đối lập, và chính sự thống nhất và
                  đấu tranh giữa chúng tạo ra động lực cho sự phát triển.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Ví dụ:</strong> Quá trình sinh trưởng của cây cối là sự đấu tranh giữa các yếu tố
                    như ánh sáng, nước, không khí và các yếu tố đối lập như sâu bệnh, thời tiết khắc nghiệt.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>

                <CardTitle className="text-xl text-green-600">
                  3. Quy luật phủ định của phủ định
                </CardTitle>
                <CardDescription>
                  Chỉ ra khuynh hướng, hình thức và kết quả của sự phát triển
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Quá trình phát triển không phải là tuyến tính mà là một chuỗi phủ định và khẳng định liên tiếp,
                  tạo ra sự vận động theo hình xoáy ốc.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Ví dụ:</strong> Sự tiến hóa của các loài sinh vật từ những loài cũ, hoặc quá trình
                    phát triển của cây lúa từ hạt lúa, qua cây lúa non, cây lúa trưởng thành rồi lại ra hạt lúa mới.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Startup Application Section */}
      <section id="startup-application" className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Ứng dụng vào Khởi nghiệp</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto"></div>
          </div>

          <div className="space-y-12">
            {/* Law 1 Application */}
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-6">
                Khởi nghiệp dưới lăng kính Quy luật lượng - chất
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Giai đoạn Khởi nghiệp</CardTitle>
                    <CardDescription>Tích lũy lượng</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">
                      Startup bắt đầu với việc tích lũy các yếu tố về lượng: ý tưởng, vốn, nhân sự,
                      sản phẩm MVP, khách hàng ban đầu, dữ liệu thị trường.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Giai đoạn Thất bại</CardTitle>
                    <CardDescription>Điểm nút và bước nhảy biến đổi về chất</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">
                      Tích lũy các yếu tố lượng: thiếu vốn, sản phẩm không phù hợp, mâu thuẫn nội bộ,
                      cạnh tranh gay gắt dẫn đến thất bại (sự chuyển hóa về chất) .
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Giai đoạn Tái khởi nghiệp</CardTitle>
                    <CardDescription>Tích lũy lượng mới</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">
                      Rút ra bài học, điều chỉnh chiến lược, tích lũy kiến thức và kinh nghiệm mới
                      để chuẩn bị cho sự chuyển hóa về chất.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Law 2 Application */}
            <div>
              <h3 className="text-2xl font-bold text-orange-500 mb-6">
                Khởi nghiệp dưới lăng kính Quy luật mâu thuẫn
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">

                      Mâu thuẫn ý tưởng vs thực tiễn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">
                      Ý tưởng lý tưởng hóa vs thực tiễn phức tạp. Sự đấu tranh này buộc startup
                      phải liên tục điều chỉnh, thích nghi và đổi mới.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">

                      Mâu thuẫn tăng trưởng vs bền vững
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">
                      Tăng trưởng nhanh vs phát triển bền vững. Startup phải tìm kiếm sự cân bằng
                      giữa hai mặt này để phát triển lâu dài.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Law 3 Application */}
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-6">
                Khởi nghiệp dưới lăng kính Quy luật phủ định của phủ định
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Khẳng định ban đầu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">
                      Startup hình thành với ý tưởng, mô hình kinh doanh, sản phẩm ban đầu.
                      Đây là sự khẳng định đầu tiên về sự tồn tại.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Phủ định</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">
                      Thất bại hoặc điều chỉnh lớn. Startup phải phủ định chính mình nhưng
                      vẫn kế thừa những bài học và kinh nghiệm tích cực.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Phủ định của phủ định</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">
                      Tái khởi nghiệp với mô hình mới, cao hơn và hoàn thiện hơn trên cơ sở
                      kế thừa những yếu tố tích cực từ giai đoạn trước.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Kết luận</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto mb-8"></div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-slate-600 leading-relaxed">
              Chủ nghĩa duy vật biện chứng cung cấp một khung lý luận toàn diện để phân tích sâu sắc
              hành trình khởi nghiệp - thất bại - tái khởi nghiệp. Các quy luật lượng - chất, mâu thuẫn,
              và phủ định của phủ định không chỉ giúp chúng ta hiểu được bản chất của sự vận động và
              phát triển trong kinh doanh mà còn cung cấp những định hướng phương pháp luận quan trọng.
              Để thành công, các startup cần nhận thức được vai trò của việc tích lũy lượng, giải quyết
              các mâu thuẫn nội tại và ngoại tại, và không ngừng phủ định cái cũ để tiến lên cái mới,
              tạo ra những giá trị bền vững và cao hơn.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p>&copy; Group 2 - MLN111 </p>
        </div>
      </footer>

      {/* AI Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>

        {isChatOpen && (
          <div
            className={`absolute bottom-6 bg-white rounded-lg shadow-xl border border-slate-200 flex flex-col transition-all duration-300 ${isMaximized
              ? 'fixed inset-x-2 inset-y-2 md:absolute md:right-0 md:bottom-16 md:w-[600px] md:h-[700px] lg:w-[700px] lg:h-[750px] md:inset-auto'
              : 'right-0 w-80 h-96 sm:w-96 sm:h-[400px]'
              }`}
          >
            {/* Header with controls */}
            <div className="p-3 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-t-lg flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm truncate">AI Trợ lý Biện chứng</h3>
                <p className="text-xs opacity-90 truncate">Hỏi tôi về triết học và khởi nghiệp</p>
              </div>
              <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                <Button
                  onClick={resetChat}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-white/20 text-white"
                  title="Reset chat"
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
                <Button
                  onClick={toggleMaximize}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-white/20 text-white"
                  title={isMaximized ? "Thu nhỏ" : "Phóng to"}
                >
                  {isMaximized ? <Minimize className="w-3 h-3" /> : <Maximize className="w-3 h-3" />}
                </Button>
                <Button
                  onClick={() => setIsChatOpen(false)}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-white/20 text-white"
                  title="Đóng"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-3">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] md:max-w-[75%] p-3 rounded-lg text-sm ${message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-800'
                    }`}>
                    {message.type === 'bot' ? (
                      <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-headings:text-slate-800 prose-p:text-slate-800 prose-strong:text-slate-900 prose-ul:text-slate-800 prose-ol:text-slate-800 prose-li:text-slate-800">
                        <ReactMarkdown>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] md:max-w-[75%] p-3 rounded-lg text-sm bg-slate-100 text-slate-800 flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang suy nghĩ...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="p-3 md:p-4 border-t border-slate-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Nhập câu hỏi..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

