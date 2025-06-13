  import React from "react";
  import { Link } from "react-router-dom";
  import { useProducts } from "../contextApi/ProductContext";

  // Danh mục tĩnh
  const categories = [
    { title: "Bánh ngọt", img: "/src/assets/img/banh4.png", desc: "Ngọt mềm, trứng, đường, kem." },
    { title: "Bánh quy", img: "/src/assets/img/banh7.png", desc: "Giòn, ngọt, bơ, trứng." },
    { title: "Bánh mì", img: "/src/assets/img/banh9.png", desc: "Mềm, thịt nguội, rau, bơ, trứng." },
    { title: "Sandwich", img: "/src/assets/img/banh3.png", desc: "Thịt nguội, rau, phô mai, nướng." },
  ];

  const HomePage = () => {
    const { products } = useProducts(); // Lấy danh sách sản phẩm từ context

    return (
        <div className="container mx-auto px-4 font-sans p-8 bg-white">

          {/* --- HERO SECTION --- */}
          <section className="flex flex-col md:flex-row items-center justify-between bg-[#fdf9f3] p-8 rounded-xl mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-red-500 font-semibold text-sm uppercase mb-2">Chào mừng đến với</h3>
              <h1 className="text-4xl font-bold text-[#233d4d] mb-4">Cupakery</h1>
              <p className="text-gray-700 mb-6">
                Nhà cái phân phối bánh hàng đầu Châu Á
              </p>
              <div className="flex gap-4">
                <button className="bg-[#cbd55c] hover:bg-[#b7c548] text-black px-6 py-2 rounded font-semibold transition">
                  MUA NGAY
                </button>
                <Link
                    to="/ve-chung-toi"
                    className="border border-[#233d4d] hover:bg-[#233d4d] hover:text-white px-6 py-2 rounded font-semibold transition inline-block text-center"
                >
                  VỀ CHÚNG TÔI
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                  src="/src/assets/img/hero.png"
                  alt="Cupcake"
                  className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          </section>

          {/* --- CATEGORY SECTION --- */}
          <section className="text-center mb-16 relative">
            <h2 className="text-[#c19d66] font-bold text-sm tracking-wider">MENU</h2>
            <h1 className="text-2xl font-bold mb-2">
              Mua Sắm <span className="text-[#c19d66]">Theo</span> Danh Mục
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600">
              Khám phá & mua sắm các loại bánh thơm ngon theo danh mục.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
              {categories.map((cat, i) => (
                  <div
                      className="rounded-xl p-4 hover:-translate-y-1 transition-transform"
                      key={i}
                  >
                    <img
                        src={cat.img}
                        alt={cat.title}
                        className="w-full h-52 object-cover rounded-md mb-3"
                    />
                  </div>
              ))}
            </div>
            {/* Wave separator */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
              <svg
                  className="w-full h-[100px]"
                  viewBox="0 0 1440 100"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
              >
                <path
                    d="M0,30
                  C 120,60 240,0 360,30
                  C 480,60 600,0 720,30
                  C 840,60 960,0 1080,30
                  C 1200,60 1320,0 1440,30
                  L1440,100 L0,100 Z"
                    fill="#ffffff"
                />
              </svg>
            </div>
          </section>

          {/* --- PRODUCT SECTION --- */}
          <section className="text-center">
            <h2 className="text-[#c19d66] font-bold text-sm tracking-wider">MENU</h2>
            <h1 className="text-2xl font-bold mb-2">Đặt Hàng & Chọn Những Gì Bạn Thích</h1>
            <p className="max-w-2xl mx-auto text-gray-600">
              Đặt hàng nhanh chóng và chọn những gì bạn thích từ nhiều danh mục.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 mb-4">
              {products.slice(0, 12).map((prod, i) => (
                  <Link to={`/product/${prod.id}`} key={i}>
                    <div className="bg-gray-100 rounded-xl p-4 shadow-md hover:-translate-y-1 transition-transform">
                      <img
                          src={prod.images?.[0]?.imageLink || "/default.png"}
                          alt={prod.name}
                          className="w-full h-40 object-cover rounded mb-3"
                      />
                      <h3 className="font-semibold text-lg">{prod.name}</h3>
                      <p className="text-[#e63946] font-bold">{prod.price}₫</p>
                      <div className="  text-yellow-400 text-sm flex items-center justify-center">
                        {Array.from({ length: 5 }, (_, i) => {
                          const rating = prod.rating;
                          if (i + 1 <= Math.floor(rating)) {
                            return <span key={i}>★</span>; // sao đầy
                          } else if (i < rating) {
                            return <span key={i}>☆</span>; // sao nửa (hoặc có thể dùng biểu tượng nửa sao khác)
                          } else {
                            return <span key={i} className="text-yellow-400">★</span>; // sao rỗng
                          }
                        })}
                      </div>

                    </div>
                  </Link>
              ))}
            </div>
          </section>

        {/* Chiếc Bánh "Vị Nhà" Section */}
        <section className="bg-gradient-to-r from-[#f8f8f8] to-[#dce2dd] py-16 px-4 md:px-12 flex flex-col md:flex-row items-center gap-10">
          {/* Video thumbnail */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-72 h-72 rounded-xl overflow-hidden shadow-lg">
              <img
                src="/src/assets/img/cake-video.png" // Thay bằng ảnh thật
                alt="Chiếc Bánh Vị Nhà"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/80 text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition">
                  ▶
                </button>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="w-full md:w-1/2">
            <h4 className="text-red-500 font-semibold uppercase mb-2">Về Chúng Tôi</h4>
            <h2 className="text-3xl font-bold text-[#233d4d] mb-4">Chiếc Bánh “Vị Nhà”</h2>
            <p className="text-gray-700 mb-4">
              Mỗi chiếc bánh của Cupakery đều mang trong mình hương vị thân thuộc của ngôi nhà thân yêu.
              Từ nguyên liệu tươi ngon đến công thức gia truyền, chúng tôi tạo nên những chiếc bánh không chỉ ngọt ngào
              mà còn ấm áp từng hồn.
            </p>
            <p className="text-gray-700 mb-6">
              Chiếc bánh "vị nhà" là lời thì thầm của ký ức tuổi thơ, là tiếng cười quanh bàn ăn gia đình. Hãy để Cupakery
              mang đến cho bạn không chỉ món tráng miệng, mà còn cảm giác bình yên như được trở về nhà sau mỗi miếng bánh.
            </p>
            <button className="bg-[#cbd55c] hover:bg-[#b7c548] text-black px-6 py-2 rounded font-semibold transition">
              ĐỌC THÊM
            </button>
          </div>
        </section>

        {/* Vị trí cửa hàng Section */}
        <section className="bg-white py-16 px-4 md:px-12">
          <div className="max-w-6xl mx-auto bg-[#fdfdfd] rounded-xl shadow-md p-8 grid md:grid-cols-2 gap-8 items-start">
            {/* Left */}
            <div>
              <h4 className="text-red-500 font-semibold uppercase mb-2">Vị trí cửa hàng</h4>
              <h2 className="text-2xl font-bold text-[#233d4d] mb-4">Mời Bạn Ghé Nha !</h2>
              <p className="text-[#e63946] font-semibold mb-2">
                📍 Số 1 KP6, Linh Trung, Thủ Đức, TPHCM
              </p>
              <p className="text-gray-700 mb-4">
                Ghé thăm chúng tôi trong tháng khai trương để nhận ưu đãi giảm 15% và tặng ly cà phê miễn phí khi mua từ 2 sản phẩm.
              </p>
              <ul className="text-gray-700">
                <li>📅 Ngày thường: 7:00 SA / 7:00 CH</li>
                <li>📅 Cuối tuần: 7:00 SA / 6:00 CH</li>
              </ul>
            </div>

            {/* Right - Map */}
            <div>
              <iframe
                title="Google Map Cupakery"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6978745781974!2d106.76715947481896!3d10.831379289325398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752745f7e940a7%3A0x2f79b6b8a5416b11!2zS2h1IHBo4buRIE5naOG7hyBN4bqhaSBU4burbmcgLSBMb2dvIGLhuqFuZw!5e0!3m2!1svi!2s!4v1715077352411!5m2!1svi!2s"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-md shadow"
              ></iframe>
            </div>
          </div>
        </section>

        <section className="bg-[#fdfbf7] py-20 px-4 md:px-12">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h4 className="text-red-500 font-semibold uppercase mb-2">Cam Kết</h4>
        <h2 className="text-3xl font-bold text-[#1c1c1c]">Đánh Giá Của Mọi Người</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Highlight review */}
        <div className="bg-gradient-to-r from-[#22343c] to-[#1e2e2e] text-white p-8 rounded-xl shadow-md relative">
          <h3 className="text-2xl font-semibold mb-4">Rất ngon!</h3>
          <p className="mb-6 leading-relaxed">
            "Trong lúc tìm kiếm cửa hàng bánh, tôi đã ghé qua trang web của Cupakery và thật sự ấn tượng! Những chiếc bánh ở đây không chỉ ngon mà còn được trang trí rất đẹp mắt, hoàn hảo để chụp ảnh và chia sẻ. Một điểm dừng chân ngọt ngào mà bất kỳ du khách nào cũng không nên bỏ lỡ!"
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded" />
            <div>
              <p className="font-semibold">Quang Linh</p>
              <p className="text-[#cbd55c] font-medium">TRAVELLER</p>
            </div>
          </div>

          {/* Decorative dots (optional) */}
          <div className="absolute bottom-4 left-4 w-6 h-6 border-dotted border-4 border-white opacity-20 rounded-full"></div>
        </div>

        {/* Other reviews */}
        <div className="flex flex-col gap-6">
          {/* Review 1 */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-100 relative">
            <p className="text-gray-700 mb-4">
              "Là một YouTuber, tôi luôn tìm kiếm những địa điểm đặc biệt để quay video, và Cupakery đã không làm tôi thất vọng! Bánh ở đây không chỉ ngon mà còn rất bắt mắt, giúp video của tôi thu hút hàng ngàn lượt xem. Tôi chắc chắn sẽ quay lại để thử thêm nhiều hương vị khác!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-300 rounded" />
              <div>
                <p className="font-semibold">ThanhTan</p>
                <p className="text-red-500 font-medium uppercase text-sm">YOUTUBER</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-100 relative">
            <p className="text-gray-700 mb-4">
              "Cupakery không chỉ là một tiệm bánh, mà còn là một thương hiệu rất biết cách tạo ấn tượng! Từ chất lượng bánh tuyệt hảo đến cách họ chăm sóc khách hàng, tôi thấy đây là một ví dụ tuyệt vời về sự kết hợp giữa sản phẩm tốt và dịch vụ chuyên nghiệp. Rất đáng để trải nghiệm!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-300 rounded" />
              <div>
                <p className="font-semibold">TanTài</p>
                <p className="text-red-500 font-medium uppercase text-sm">DIGITAL MARKETING</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-100 relative">
            <p className="text-gray-700 mb-4">
              "Tôi đã đặt bánh tại Cupakery cho một sự kiện công ty và thật sự hài lòng! Bánh không chỉ ngon mà còn được giao đúng giờ, giúp sự kiện của chúng tôi thành công rực rỡ. Dịch vụ chuyên nghiệp và tận tâm, tôi sẽ tiếp tục ủng hộ trong các dịp tới!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-300 rounded" />
              <div>
                <p className="font-semibold">NhuThanh</p>
                <p className="text-red-500 font-medium uppercase text-sm">BUSINESS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </section>


      </div>
    );
  };

  export default HomePage;
