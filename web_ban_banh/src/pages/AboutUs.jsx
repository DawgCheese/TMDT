import React from 'react';
import PageHeader from "../components/PageHeader";

const AboutUs = () => {
  return (
    <section className="bg-[#fdfbf7] pb-20">
      {/* Header Section */}
      <PageHeader
          subTitle="AboutUs"
          title="Về Chúng Tôi"
          breadcrumb="ve-chung-toi"
        />

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 mt-12 grid gap-12">
        {/* Intro */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h5 className="text-red-500 font-semibold mb-2 uppercase">Về chúng tôi</h5>
            <h2 className="text-3xl font-bold mb-4">Chào Mừng Bạn Với Cupakery</h2>
            <p className="text-gray-700">
              Nơi đây là một trang web thương mại điện tử đa dạng các loại bánh ngọt đến từ nhiều quốc gia. Tại Cupakery, chúng tôi tin rằng mỗi chiếc bánh là một món ăn mà còn là một tác phẩm nghệ thuật niềm vui đến cho mọi người.
            </p>
          </div>
          <img
            src="/src/assets/img/aboutus1.png"
            alt="Cupcakes"
            className="rounded-xl shadow-md w-full"
          />
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src="/src/assets/img/aboutus2.png"
            alt="Mission"
            className="rounded-xl shadow-md w-full order-2 md:order-1"
          />
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-bold mb-4">Sứ Mệnh Của Chúng Tôi</h2>
            <p className="text-gray-700">
              Cupakery ra đời mong muốn kết nối những người yêu thích bánh ngọt với các tiệm bánh chất lượng và uy tín. Chúng tôi tạo ra một nền tảng giúp bạn dễ dàng tìm kiếm, đặt hàng và thưởng thức những chiếc bánh thơm ngon mà không cần phải suy nghĩ nhiều...
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">Tại Sao Bạn Nên Chọn Cupakery?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Hàng trăm loại bánh ngon từ nhiều cửa hàng khác nhau.</li>
              <li>Giao hàng tận nơi, nhanh chóng.</li>
              <li>Nhiều khuyến mãi & chương trình khách hàng thân thiết cho người yêu thích bánh ngọt.</li>
              <li>Thiết kế web dễ duyệt và cực kỳ thân thiện.</li>
              <li>Dịch vụ chăm sóc khách hàng nhiệt tình, sẵn sàng hỗ trợ khách hàng.</li>
            </ul>
          </div>
          <img
            src="/src/assets/img/aboutus3.png"
            alt="Bakery Store"
            className="rounded-xl shadow-md w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
